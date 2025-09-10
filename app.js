const jwt = require("jsonwebtoken")
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaClient } = require('./generated/prisma');
const path = require("node:path");

const indexRouter = require("./routes/index");
require('./config/passport');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
});
