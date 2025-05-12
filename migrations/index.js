const fs = require("fs");
const path = require("path");
const db = require("./../db");


const migrate = async () => {

    const connection = await db.getConnection();


    const createUserTableSql = fs.readFileSync(
        path.resolve(__dirname, './user-ddl.sql'),
        'utf-8' 
    );
    console.log(path.resolve(__dirname, './user-ddl.sql'))

    const createTagTableSql = fs.readFileSync(
        path.resolve(__dirname, './tag-ddl.sql'),
        'utf-8' 
    );

    const createArticleTableSql = fs.readFileSync(
        path.resolve(__dirname, './article-ddl.sql'),
        'utf-8' 
    );

    const createArticleTagsTableSql = fs.readFileSync(
        path.resolve(__dirname, './article-tag-ddl.sql'),
        'utf-8' 
    );
    
    await connection.beginTransaction();

    try {
        await connection.query(createUserTableSql);
        await connection.query(createTagTableSql);
        await connection.query(createArticleTableSql);
        await connection.query(createArticleTagsTableSql);
        await connection.commit();
    } catch (err) {
        await connection.rollback();
    }
    
    
};

migrate()
    .then (() => {
        console.log('migrations ran successfully');
    
    })
    .catch (() => db.end());