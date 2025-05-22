const db = require("./../db");

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
    deleteOne
};