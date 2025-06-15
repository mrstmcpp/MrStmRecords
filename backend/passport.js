const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const userModel = require("./models/userModel");

const PassPortModule = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'mysecretkeystring'
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await userModel.findOne({ _id: jwt_payload.id });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }));
}

module.exports = PassPortModule;
