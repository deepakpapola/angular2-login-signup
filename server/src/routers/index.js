import express from 'express';
import auth from './../middleware/auth';
import passport from 'passport';

let router = express.Router();

// verify token
import authCtrl from './../controllers/authCtrl';

router.get('/users',userCtrl.getUsers);
router.get('/check-state', auth.verifyToken,(req, res) => {
    console.log("herer12")
    let content = {
        success: true,
        message: 'Successfully logged in'
    };
    res.send(content);
    
});

router.post('/api/authenticate',authCtrl.login);

import userCtrl from './../controllers/usersCtrl';
router.put('/users/edit',userCtrl.editUser);
router.post('/users/add',userCtrl.addUser);
router.delete('/users/delete/:id',userCtrl.delete); 

 // FACEBOOK =====================
 router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/login'
    }));

//GOOGLE LOGIN
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:'/',
    failureRedirect:'/login'
}));

module.exports = router;