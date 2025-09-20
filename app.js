const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");

require('./config/passport');

const app = express();
const corsOptions = {
    origin: [
        'https://endearing-cocada-ac8733.netlify.app/',
        'https://famous-moxie-b58c35.netlify.app/'
    ],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
});




