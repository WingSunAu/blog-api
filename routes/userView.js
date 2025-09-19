const { Router } = require("express");
const { getPostsByUser } = require("../controllers/posts");
const { getCommentsByUser } = require("../controllers/comments");

const userViewRouter = Router();

userViewRouter.get('/:userid/posts', (req, res, next) => { getPostsByUser(req, res) });
userViewRouter.get('/:userid/comments', (req, res, next) => { getCommentsByUser(req, res) });

module.exports = userViewRouter;