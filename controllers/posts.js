const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getPosts(req, res) {
    posts = await prisma.post.findMany();
    res.json(req.posts);
}

async function getPost(req, res) {
    post = await prisma.post.findUnique();
}

async function postPost(req, res) {

}

async function putPost(req, res) {

}

async function deletePost(req, res) {

}
module.exports = { getPosts, getPost, postPost, putPost, deletePost };