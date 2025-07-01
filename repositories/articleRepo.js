const db = require("./../db");
const {calculateTimeGap} = require("./../utils/funcs");

const create = async (title, content, slug, author_id, cover) => {
    const insertQuery = "INSERT INTO articles (id, title, content, slug, author_id, cover) VALUES (NULL, ?, ?, ?, ?, ?) RETURNING *";

    const [article] = await db.execute(insertQuery, [
        title, 
        content, 
        slug, 
        author_id,
        cover
    ]);

    // const selectMainArticle = "SELECT * FROM articles WHERE id = ?";
    // const article = await db.execute(selectMainArticle, [insertedArticle.insertId]);


    return article[0];
};

const addTag = async (articleId, tagId) => {
    try {
        const query = "INSERT INTO articles_tags VALUES (NULL, ?, ?)";

        await db.execute(query, [articleId, tagId]);
        return true;
    } catch (err) {
        return false;
    }
};

const findTagArticle = async (tagId) => {
    const query = `SELECT 
     articles.title,
     CONCAT(SUBSTRING(articles.content, 1, 200), '...') AS content, 
     articles.slug, 
     articles.cover, 
     articles.created_at, 
     users.name AS author, 
     tags.title AS tag 
     FROM articles_tags 
     JOIN articles ON 
     articles_tags.article_id = articles.id 
     JOIN users ON 
     users.id = articles.author_id 
     JOIN tags ON 
     articles_tags.tag_id = tags.id 
     WHERE tag_id = ?
     RETURNING *;`;



     const [articles] = await db.execute(query, [tagId]);

     return articles;

};

const searchInArticle = async (searchValue) => {
    const query = `SELECT
    articles.id,
    articles.title,
    articles.content,
    articles.slug,
    articles.cover,
    users.name AS author,
    tags.title AS tag
    FROM articles
    JOIN articles_tags ON
    articles_tags.article_id = articles.id
    JOIN tags ON
    articles_tags.tag_id = tags.id
    JOIN users ON
    users.id = articles.author_id
    WHERE articles.title LIKE ? OR content LIKE ? OR tag.title LIKE ?
    GROUP BY articles.id`;
    
    const {articles} = await db.execute(query, [
        '% ${searchValue}%',
        '% ${searchValue}%',
        '% ${searchValue}%'
    ]);
    
    return articles;
};

const findAll = async () => {
    const query = `SELECT
    a.id,
    a.title,
    CONCAT(SUBSTRING(a.content, 1, 200), '...') AS content,
    a.slug,
    a.created_at,
    a.updated_at,
    a.cover,
    u.id AS user_id,
    u.name AS user_name,
    u.avatar AS profile
    FROM articles a
    JOIN users u ON
    u.id = a.author_id
    ORDER BY a.id DESC`;
    const [articles] = await db.execute(query);


    const formatedArticles = [];
    
    for (const article of articles) {
        const [tags] = await db.execute(`SELECT 
            t.* FROM articles_tags ta
            JOIN tags t ON
            t.id = ta.tag_id
            WHERE ta.article_id = ?`,
            [article.id]
            );


            formatedArticles.push({
                id: article.id,
                title: article.title,
                content: article.content,
                slug: article.slug,
                cover: article.cover,
                author: {
                    id: article.user_id,
                    name: article.user_name,
                    profile: article.profile
                },
                createdAt: calculateTimeGap(article.created_at),
                updatedAt: article.updated_at,
                tags: tags.map((tag) => tag.title)
            });
    }



    return formatedArticles;
};

const deleteOne = async (id) => {
    try {
        const query = "DELETE FROM articles WHERE id = ?";
        await db.execute(query, [id]);

        return true;
    } catch (err) {
        return false;
    }
};




module.exports = {
    create,
    addTag,
    findTagArticle,
    searchInArticle,
    findAll,
    deleteOne
};