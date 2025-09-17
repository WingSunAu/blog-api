const { PrismaClient } = require('../generated/prisma');
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// async function getUsers(req, res) {
//     users = await prisma.user.findMany();
//     res.json(req.users);
// }

// async function getUser(req, res) {
//     user = await prisma.user.findUnique();
// }

async function postUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pw, 10);
        const user = await prisma.user.create({
            data: {
                un: req.body.un,
                pw: hashedPassword,
            }
        });
        res.json(user);
    } catch (err) {
        return next(err);
    }
}

// async function updateUser(req, res) {

// }

// async function deleteUser(req, res) {

// }

module.exports = { postUser };