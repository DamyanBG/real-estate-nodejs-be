const express = require("express");
const expressConfig = require("./config/express");
const databaseConfig = require("./config/db");

start();

async function start(){
    const app = express();
    await databaseConfig(app);
    expressConfig(app);

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, ()=> console.log(`Server listen on port 3030`));
}
