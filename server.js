const app = require("./app");
const db = require("./db");
const confings = require("./configs");


async function startServer () {
    try {
        await db.getConnection();

        app.listen(confings.port, () => {
            console.log(`Server running on port ${confings.port}`);
            
        })
        
    } catch (err) {
        console.log(err);
        db.end();
    }
}


startServer();