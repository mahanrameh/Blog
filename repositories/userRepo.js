const db = require("./../db");



const create = async (name, password, username, email) => {
    const insertQuery = "INSERT INTO users (name, password, username, email) VALUES (?, ?, ?, ?) RETURNING *";

    const [User] = await db.execute(insertQuery, [
        name,
        password, 
        username, 
        email
    ]);

    // const selectMainUser = "SELECT * FROM users WHERE id = ?";
    // const user = await db.execute(selectMainUser, [insertedUser.insertId]);


    return user[0][0];
};

const findByUsername = async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";

    const [user] = await db.execute(query, [ username ]);


    return user[0];
};

const findById = async (id) => {
    const query = "SELECT * FROM users WHERE id = ?";

    const [user] = await db.execute(query, [ id ]);


    return user[0];
};





module.exports = {
    create,
    findByUsername,
    findById
};