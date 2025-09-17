const { Router } = require("express");
const { getPosts, getPost } = require("../controllers/posts");
const { getComment, getComments } = require("../controllers/comments");

const viewRouter = Router();

viewRouter.get('/', (req, res, next) => { getPosts(req, res) });
viewRouter.get('/:postid', (req, res) => { getPost(req, res) });
viewRouter.get('/:postid/comments', (req, res, next) => { getComments });
viewRouter.get('/:postid/comments', (req, res) => { getComment });

module.exports = viewRouter;