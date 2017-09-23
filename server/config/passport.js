import { Strategy as LocalStategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
    //////////////////////////////////////////////not in use /////////////////////////////////////
import User from './../models/users/user';
import configAuth from './auth'

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done)=> {
        User.findById(id,(err, user) =>{
            done(err, user);
        });
    });
    // FACEBOOK ================================================================
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'facebook.id' : profile.id },(err, user) =>{

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user); 
                } else {
                    var newUser            = new User();

                    newUser.facebook.id    = profile.id;                 
                    newUser.facebook.token = token;
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value; 

                    // save
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};