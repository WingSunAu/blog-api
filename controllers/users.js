const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// async function getUsers(req, res) {
//     users = await prisma.user.findMany();
//     res.json(req.users);
// }

// async function getUser(req, res) {
//     user = await prisma.user.findUnique();
// }

async function postUser(req, res, next) {

}

// async function updateUser(req, res) {

// }

// async function deleteUser(req, res) {

// }

module.exports = { getUser, postUser };