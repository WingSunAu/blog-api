const { parseToken } = require('../config/jwt');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getPosts(req, res) {
    const posts = await prisma.post.findMany();
    res.json(posts);
}

async function getPostsByUser(req, res) {
    const { authorId } = req.params;
    const posts = await prisma.post.findMany({ where: { authorId: authorId } });
    res.json(posts);
}


async function getPost(req, res) {
    const { postid } = req.params;
    const post = await prisma.post.findUnique({ where: { id: parseInt(postid) } });
    res.json(post);
}

async function postPost(req, res, next) {
    try {
        const token = parseToken(req);
        const userPostsUpdate = await prisma.user.update({
            where: { id: token.id },
            data: {
                posts: {
                    create: {
                        un: token.un,
                        date: new Date().toISOString(),
                        title: req.body.title,
                        text: req.body.text,
                        visibility: req.body.visibility,
                    },
                },
            },
            include: {
                posts: true,
            }
        });
        res.json(userPostsUpdate);
    } catch (err) {
        return next(err);
    }
}
// verify jwt, check jwt id against post id
async function putPost(req, res, next) {
    try {
        const { postid } = req.params;
        const token = parseToken(req);
        const postUpdate = await prisma.post.update({
            where: {
                id: parseInt(postid),
                AND: [
                    { authorId: token.id }
                ],
            },
            data: {
                un: token.un,
                title: req.body.title,
                text: req.body.text,
                visibility: req.body.visibility,
            },
        })
        res.json(postUpdate);
    } catch (err) {
        return next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const { postid } = req.params;
        const token = parseToken(req);
        const postDelete = await prisma.post.delete({
            where: {
                id: parseInt(postid),
                AND: [
                    { authorId: token.id }
                ],
            },
        })
        res.json(postDelete);
    } catch (err) {
        return next(err);
    }
}
module.exports = { getPosts, getPostsByUser, getPost, postPost, putPost, deletePost };