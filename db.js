const mySql = require("mysql2/promise");
const configs = require("./configs");

const connection = mySql.createPool({
    uri: configs.db.uri,
    connectionLimit: configs.db.poolSize,
    waitForConnections: true
});




// connection.connect((err) => {
//     if (err) throw err;

//     console.log('Database Connected'); 
// });


module.exports = connection;