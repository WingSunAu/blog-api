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

const jwtOps = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'cats'
}

const jwtVerifyCallback = async (jwtPayload, done) => {
    try {
        const rows = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
        const user = rows;
        if (!user) {
            return done(null, false, { message: "Invalid JWT" });
        }
        if (jwtPayload.pw == user.pw) {
            return done(null, user);
        } else {
            console.log("incorrect password in JWT");
            return done(null, false, { message: "JWT password does not match user password" })
        }
    } catch (err) {
        return done(err);
    };
}
const jwtStrategy = new JWTStrategy(jwtOps, jwtVerifyCallback);

passport.use(jwtStrategy);