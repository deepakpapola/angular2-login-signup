import { Strategy as FacebookStrategy } from 'passport-facebook';


import jwt from 'jsonwebtoken';

import User from './../models/users/user'
import config from './../config/config'

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
    }
}