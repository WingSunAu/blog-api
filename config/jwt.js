const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

function parseToken(req) {
    return jwt.verify(req.token, "cats", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return authData;
        }
    });
}

module.exports = { verifyToken, parseToken }