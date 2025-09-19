const { Router } = require("express");
const passport = require("passport");
const postRouter = require("./posts");
const authRouter = require('./auth');
const viewRouter = require("./view");
const { getIndex } = require("../controllers");
const { postUser } = require("../controllers/users");
const { verifyToken } = require("../config/jwt");
const userViewRouter = require("./userView");


const router = Router();
router.use('/users', userViewRouter);
router.use('/posts', viewRouter);
router.use('/posts', passport.authenticate('jwt', { session: false }), verifyToken, postRouter);
router.use('/auth', authRouter);
router.post("/user", async (req, res, next) => { postUser(req, res, next) });
router.get("/", (req, res) => { getIndex(req, res) });

module.exports = router;