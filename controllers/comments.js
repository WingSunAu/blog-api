const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getComments(req, res) {
    comments = await prisma.comment.findMany();
    res.json(req.comments);
}

async function getComment(req, res) {
    comment = await prisma.comment.findUnique();
}

async function postComment(req, res) {

}

async function putComment(req, res) {

}

async function deleteComment(req, res) {

}

module.exports = { getComments, getComment, postComment, putComment, deleteComment };