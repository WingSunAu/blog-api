const { parseToken } = require('../config/jwt');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getComments(req, res) {
    const comments = await prisma.comment.findMany();
    res.json(comments);
}

async function getCommentsByUser(req, res) {
    const { authorId } = req.params;
    const comments = await prisma.comment.findMany({ where: { authorId: authorId } });
    res.json(comments);
}

async function getComment(req, res) {
    const { commentid } = req.params;
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(commentid) } });
    res.json(comment);
}

async function postComment(req, res, next) {
    try {
        const token = parseToken(req);
        const user = await prisma.user.findUnique({ where: { id: token.id } });
        const { postid } = req.params;
        const postUpdate = await prisma.post.update({
            where: {
                id: parseInt(postid)
            },
            data: {
                comments: {
                    create: {
                        author: { connect: user },
                        un: token.un,
                        date: new Date().toISOString(),
                        text: req.body.text,
                    },
                },
            },
            include: {
                comments: true,
            },
        })
        res.json(postUpdate);
    } catch (err) {
        return next(err);
    }
}

async function putComment(req, res, next) {
    try {
        const { commentid } = req.params;
        const token = parseToken(req);
        const commentUpdate = await prisma.comment.update({
            where: {
                id: parseInt(commentid),
                AND: [
                    { authorId: token.id }
                ],
            },
            data: {
                un: token.un,
                text: req.body.text,
            },
        })
        res.json(commentUpdate);
    } catch (err) {
        return next(err);
    }
}

async function deleteComment(req, res, next) {
    try {
        const { commentid } = req.params;
        const token = parseToken(req);
        const commentDelete = await prisma.comment.delete({
            where: {
                id: parseInt(commentid),
                AND: [
                    { authorId: token.id }
                ],
            },
        })
        res.json(commentDelete);
    } catch (err) {
        return next(err);
    }
}

module.exports = { getComments, getCommentsByUser, getComment, postComment, putComment, deleteComment };