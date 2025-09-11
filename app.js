const express = require("express");

const indexRouter = require("./routes/index");
require('./config/passport');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
});
