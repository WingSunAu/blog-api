const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getComments(req, res) {
    comments = await prisma.comment.findMany();
    res.json(req.comments);
}

async function getComment(req, res) {
    comment = await prisma.comment.findUnique({ where: { id: req.user.id } });
    res.json(comment);
}

// create comment and connect to post and user
async function postComment(req, res) {
    try {
        const commentCreate = await prisma.comment.create({
            data: {
                post: req.body.post,
                author: req.user,
                un: req.user.un,
                date: req.body.date,
                text: req.body.text,
            },
        });
        res.json(commentCreate);
    } catch (err) {
        return next(err);
    }
}

async function putComment(req, res) {
    try {
        const commentUpdate = await prisma.comment.update({
            where: { id: req.body.id },
            data: {
                un: req.user.un,
                date: req.body.date,
                text: req.body.text,
            },
        })
        res.json(commentUpdate);
    } catch (err) {
        return next(err);
    }
}

async function deleteComment(req, res) {
    try {
        const commentDelete = await prisma.comment.delete({
            where: { id: req.body.id },
        })
        res.json(commentDelete);
    } catch (err) {
        return next(err);
    }
}

module.exports = { getComments, getComment, postComment, putComment, deleteComment };