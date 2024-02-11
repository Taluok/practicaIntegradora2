// passport-config.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../persistence/daos/mongodb/users/user.model');
const { ExtractJwt } = require('passport-jwt');

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRET_KEY_JWT'
}, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
    });
}));

module.exports = passport;
