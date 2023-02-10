const express = require("express");
const expressConfig = require("./config/express");
const usersRoute = require("./routes/users");
const userRoute = require("./routes/user");
const homesRoute = require("./routes/homes");
const homeRoute = require("./routes/home");
const homePhotosRoute = require("./routes/homePhotos");
const worksRoute = require("./routes/works")
const landRoute = require("./routes/land")
const messageRoute = require("./routes/message")
const emailRoute = require("./routes/send-mail")
const newsRoute = require("./routes/news")
const authRoutes = require("./routes/auth")


const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
expressConfig(app);

app.use("/users", usersRoute);
app.use("/user", userRoute);
app.use("/homes", homesRoute);
app.use("/home", homeRoute);
app.use("/home-photos", homePhotosRoute);
app.use("/works", worksRoute)
app.use("/land", landRoute)
app.use("/message", messageRoute)
app.use("/email", emailRoute)
app.use("/news", newsRoute)
app.use('/auth', authRoutes)

module.exports = app;