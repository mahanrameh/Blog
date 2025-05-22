const db = require("./../db");


const create = async (title) => {
    try {
        const query = "INSERT INTO tags (title) VALUES (?) RETURNING *";

        const [tag] = await db.execute(insertQuery, [
        title
    ]);

    // const selectMaintag = "SELECT * FROM tags WHERE id = ?";
    // const tag = await db.execute(selectMaintag, [insertedtag.insertId]);


        return tag[0][0];
    } catch (err) {
        throw err;
    }
};

const findByTitle = async (title) => {
    try {
        const query = "SELECT * FROM tags WHERE title = ?";

        const [tag] = await db.execute(query, [ title ]);


        return tag[0];
    } catch (err) {
        throw err;
    }
};

const findAll = async () => {
    try {
        const query = "SELECT * FROM tags ORDER BY id DESC";
        const [tags] = db.execute(query);
        
        return tags;
    } catch (err) {
        throw err;
    }
};

const update = async (id, title) => {
    try {
        const query = "UPDATE tags SET title = ? WHERE id = ?";
        await db.execute(query, [title, id]);

        return true;
    } catch (err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const query = "DELETE FROM tags WHERE id = ? RETURNING *";
        await db.execute(query, [id]);
        
        return true;
    } catch (err) {
        throw err;
    }
};



module.exports = {
    create,
    findByTitle,
    findAll,
    update,
    remove
};