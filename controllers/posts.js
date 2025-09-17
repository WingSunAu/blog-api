const { PrismaClient } = require('../generated/prisma');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function getPosts(req, res) {
    const posts = await prisma.post.findMany();
    res.json(posts);
}

async function getPost(req, res) {
    const post = await prisma.post.findUnique({ where: { id: req.user.id } });
    res.json(post);
}
async function postPost(req, res, next) {
    try {
        const token = jwt.verify(req.token, "cats", (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                return authData;
            }
        });
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
async function putPost(req, res) {
    try {
        const token = jwt.verify(req.token, "cats", (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                return authData;
            }
        });
        const postUpdate = await prisma.post.update({
            where: { id: req.body.id },
            data: {
                un: token.un,
                date: req.body.date,
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

async function deletePost(req, res) {
    try {
        const postDelete = await prisma.post.delete({
            where: { id: req.body.id },
        })
        res.json(postDelete);
    } catch (err) {
        return next(err);
    }
}
module.exports = { getPosts, getPost, postPost, putPost, deletePost };