import { Strategy as LocalStategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import User from './../models/users/user';
import configAuth from './auth'

module.exports = (passport) => {

    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=> {
        User.findById(id,(err, user) =>{
            done(err, user);
        });
    });
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ['emails','displayName']
        //passReqToCallback: true
    },

    (token, refreshToken, profile, done) =>{  
        process.nextTick(() =>{ // console.log(profile);

            User.findOne({ 'facebook.id' : profile.id },(err, user) =>{

                if (err)
                    return done(err);

                if (user) { console.log('facbook loged in',user);
                    return done(null, user); 
                } else {
                    var newUser            = new User();
                    newUser.facebook.id    = profile.id;                 
                    newUser.facebook.token = token;
                    newUser.facebook.name  = profile.displayName;
                    newUser.facebook.email = profile.emails[0].value; 

                    // save 
                    console.log('new fac user',newUser);
                    newUser.save((err) =>{
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // GOOGLe================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    (token,refreshToken,profile,done) =>{
		process.nextTick(function(){
			User.findOne({'google.id':profile.id},function(err,user){
				if(err)
					return done(err);
				if(user){
					return done(null,user);
				}else{
					var newUser = new User();

					newUser.google.id = profile.id;
					newUser.google.token = token;
					newUser.google.email = profile.emails[0].value;
					newUser.google.name = profile.displayName;

					newUser.save(function(err){
						if(err)
							throw done(err);
						return done(null,newUser);
					});
				}
			});
		});
	}));
};