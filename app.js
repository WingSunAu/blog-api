const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");

require('./config/passport');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
});




