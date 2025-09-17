const { Router } = require("express");
const { postPost, putPost, deletePost } = require("../controllers/posts");
const { postComment, putComment, deleteComment } = require("../controllers/comments");



const postRouter = Router();
// posts

postRouter.post('/', async (req, res, next) => { postPost(req, res, next) });
postRouter.put('/:postid', async (req, res, next) => { putPost(req, res) });
postRouter.delete('/:postid', (req, res) => { deletePost });

// comments

postRouter.post('/:postid/comments', async (req, res, next) => { postComment });
postRouter.put('/:postid/comments/commentid', async (req, res, next) => { putComment });
postRouter.delete('/:postid/comments/commentid', (req, res) => { deleteComment });

module.exports = postRouter;