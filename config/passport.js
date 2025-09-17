const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('../generated/prisma');
const LocalStrategy = require('passport-local').Strategy;

const prisma = new PrismaClient();

const customFields = {
    usernameField: 'un',
    passwordField: 'pw'
};

const verifyCallback = async (un, pw, done) => {
    try {
        const rows = await prisma.user.findUnique({ where: { un: un } });
        const user = rows;
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(pw, user.pw);
        if (!match) {
            console.log("incorrect");
            return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'cats'
},
    async function (jwtPayload, done) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return await prisma.user.findUnique({ where: { id: jwtPayload.id } })
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));

// express session stuff below

// // put userid into session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // grab userid from session and find in database to take out of session
// passport.deserializeUser(async (id, done) => {
//     try {
//         const rows = await prisma.user.findUnique({ where: { id: id } });
//         const user = rows;

//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });