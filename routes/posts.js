const { Router } = require("express");
const { getPosts, putPost, deletePost } = require("../controllers/posts");
const { getComment, postComment, getComments, putComment, deleteComment } = require("../controllers/comments");

const postRouter = Router();
// posts
postRouter.get('/posts', (req, res, next) => { getPosts });
postRouter.post('/posts', async (req, res, next) => { postPost });
postRouter.get('/posts/:postid', (req, res) => { getPost });
postRouter.put('/posts/:postid', async (req, res, next) => { putPost });
postRouter.delete('/posts/:postid', (req, res) => { deletePost });
// comments
postRouter.get('/posts/:postid/comments', (req, res, next) => { getComments });
postRouter.post('/posts/:postid/comments', async (req, res, next) => { postComment });
postRouter.get('/posts/:postid/comments', (req, res) => { getComment });
postRouter.put('/posts/:postid/comments/commentid', async (req, res, next) => { putComment });
postRouter.delete('/posts/:postid/comments/commentid', (req, res) => { deleteComment });

module.exports = postRouter;