const { Router } = require("express");
const passport = require("passport");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = Router();

router.get("/", (req, res) => indexGet(req, res));

router.get("/sign-up", (req, res) => createUserGet(req, res));
router.post("/sign-up", async (req, res, next) => createUserPost(req, res, next));

router.get("/log-in", (req, res) => readUserGet(req, res));
router.post("/log-in", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/sign-up" }));

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
module.exports = router;