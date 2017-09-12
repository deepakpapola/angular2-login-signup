import { Strategy as FacebookStrategy } from 'passport-facebook';

import jwt from 'jsonwebtoken';

import User from './../models/users/user'
import config from './../config/config'

import configAuth from './../config/auth'



// function a(a,b,done){
//     console.log(a,b);
//     a.findFromDb((res,error)=>{
//         if(error){
//             done({success:false,error:error},null)
//         }else{
//             done(null,{success:true,data:data})
//         }
        
        
//     })
    
// }

// a('aki value', 'b ki value', function(error,data){
//     console.log(error); console.log(data);
// })












module.exports = {
        
    login : (req,res) =>{
        var reqUser = req.body;

        User.findOne({'email' : reqUser.email}, (err, user) => { console.log('user pre>>>>>>>>>>>>>>>>',user)
            console.log('login api user found',user);
            if( err ) return done(err);

            if( !user ) res.json({success: false,message: 'User does not exists' })

            console.log('coming passwrd==========',user.validPassword(reqUser.password,user.password));
            if( !user.validPassword(reqUser.password,user.password) ){ console.log('login api no paswrd match');
                let content = {
                    success: false,
                    message: 'Incorrect password'
                };
                res.send(content);
                return;
            }

           let token = jwt.sign({user:user}, config.secret, {expiresIn : 60*60*24});
           //console.log('login api evrything is fine');
            let resUser = {
                name:user.name,
                email:user.email,
                id:user._id
            };

            let content = {
                user: resUser,
                success: true,
                message: 'You logged in',
                token: token
            };
            res.send(content);

        })
    },
    // ==========================================facebook login ====================

    facebook: (passport) =>{
        
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
            callbackURL     : configAuth.facebookAuth.callbackURL,
            passReqToCallback : true

        },

        (token, refreshToken, profile, done) =>{

            process.nextTick(() =>{

                User.findOne({ 'facebook.id' : profile.id },(err, user) =>{

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user); 
                    } else {
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;                 
                        newUser.facebook.token = token; console.log(profile);
                        newUser.facebook.name  = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value; 

                        // save
                        newUser.save((err) =>{
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }))
    }
}