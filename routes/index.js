const { Router } = require("express");
const passport = require("passport");
const postRouter = require("./posts");
const { getIndex } = require("../controllers");
const { createUser } = require("../controllers/users");

const router = Router();

router.use("/posts", postRouter);
router.get("/", (req, res) => { getIndex(req, res) });

// authentication routes

router.post("/user", async (req, res, next) => { postUser(req, res, next) });

router.post("/user", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/sign-up" }));

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;