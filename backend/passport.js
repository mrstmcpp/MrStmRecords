require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const userModel = require('./models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const generator = require('generate-password');
const bcrypt = require('bcrypt');

const PassPortModule = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'mysecretkeystring'
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await userModel.findById(jwt_payload.id);
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }));

    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5500/api/v1/user/auth/google/callback"
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                const user = await userModel.findOne({ googleId: profile.id }); // assuming you store Google ID in `googleId`
                if (!user) {
                    // If user doesn't exist, create a new one
                    console.log(profile);
                    const randomPassword = generator.generate({
                        length: 8,
                        numbers: true,
                        symbols: true,
                        uppercase: false,
                        excludeSimilarCharacters: true,
                        strict: true,

                    });
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);

                    const newUser = new userModel({
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        profilePicture: profile.photos[0].value,
                        password: hashedPassword
                    });
                    
                    await newUser.save();
                    return cb(null, newUser);
                }
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        }
    ));

    passport.use(new SpotifyStrategy(
        {
            clientID: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:5500/api/v1/user/auth/spotify/callback'
        },
        async (accessToken, refreshToken, expires_in, profile, done) => {
            try {
                let user = await userModel.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await userModel.create({
                        firstName: profile.displayName || 'Spotify',
                        lastName: 'User',
                        email: profile.emails?.[0]?.value || `spotify_${profile.id}@spotify.com`,
                        password: "SPOTIFY_AUTH",
                        profilePicture: profile.photos?.[0]?.url || "/ava3.jpg",
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    ));
};

module.exports = PassPortModule;
