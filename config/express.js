const express = require("express");
const cors = require("cors");

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    // TODO auth middleware later
    app.use(express.urlencoded({extended: true}));
}