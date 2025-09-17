const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getIndex(req, res) {
    users = await prisma.user.findMany();
    posts = await prisma.post.findMany();
    comments = await prisma.comment.findMany();
    console.log(" Users:   ", users, "\n Posts:   ", posts, "\n Comments:", comments);
    res.send(`home  ${req.user} `);
}

module.exports = { getIndex };