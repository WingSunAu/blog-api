const { Router } = require("express");
const passport = require("passport");
const postRouter = require("./posts");
const authRouter = require('./auth');
const viewRouter = require("./view");
const { getIndex } = require("../controllers");
const { postUser } = require("../controllers/users");
const { verifyToken } = require("../config/jwt");


const router = Router();

router.use('/posts', passport.authenticate('jwt', { session: false }), verifyToken, postRouter);
router.use('/posts', viewRouter);
router.use('/auth', authRouter);
router.get("/", (req, res) => { getIndex(req, res) });
router.post("/user", async (req, res, next) => { postUser(req, res, next) });
module.exports = router;