const { Router } = require("express");
const { postPost, putPost, deletePost } = require("../controllers/posts");
const { postComment, putComment, deleteComment } = require("../controllers/comments");



const postRouter = Router();
// posts

postRouter.post('/', async (req, res, next) => { postPost(req, res, next) });
postRouter.put('/:postid', async (req, res, next) => { putPost(req, res, next) });
postRouter.delete('/:postid', async (req, res, next) => { deletePost(req, res, next) });

// comments

postRouter.post('/:postid/comments', async (req, res, next) => { postComment(req, res, next) });
postRouter.put('/:postid/comments/:commentid', async (req, res, next) => { putComment(req, res, next) });
postRouter.delete('/:postid/comments/:commentid', async (req, res, next) => { deleteComment(req, res, next) });

module.exports = postRouter;