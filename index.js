const express = require("express");
const expressConfig = require("./config/express");
const databaseConfig = require("./config/db");
const usersRoute = require("./routes/users");
const userRoute = require("./routes/user")

start();

async function start(){
    const app = express();
    await databaseConfig(app);
    expressConfig(app);

    app.use("/users", usersRoute);
    app.use("/user", userRoute)

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, ()=> console.log(`Server listen on port 3030`));
}
