const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const authRouter = Router();
/*
authentication routes
post: login 
*/
authRouter.use(passport.initialize());
authRouter.post("/user", (req, res, next) => {
    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) { res.json(err); };
            if (!user) {
                return res.status(400).json({ message: 'user error', user: user })
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.json(err);
                }
                const token = jwt.sign(user, 'cats');
                return res.json({ user, token });
            });
        })(req, res, next);
}
);

module.exports = authRouter;