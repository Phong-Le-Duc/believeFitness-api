require("dotenv").config();
var express = require("express");
var app = express();
var router = require("./router");
var { testConnection } = require("./config/database");
var formidable = require("express-formidable");
var cors = require("cors");

testConnection();

function getCorsOrigins() {
    if (!process.env.CORS_ORIGIN) {
        return true;
    }

    return process.env.CORS_ORIGIN.split(",")
        .map(origin => origin.trim())
        .filter(Boolean);
}

app.use(cors({
    origin: getCorsOrigins()
}));
app.use(formidable());
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
app.use(router);

module.exports = app;
