import express from 'express';
import auth from './../middleware/auth';
import passport from 'passport';

let router = express.Router();

// router.get('/',(req,res) => {
//     res.send('routs sldfjsljdflk');
// });
// verify token
import authCtrl from './../controllers/authCtrl';

router.get('/users',userCtrl.getUsers);
router.get('/check-state', auth.verifyToken,(req, res) => {
    
    let content = {
        success: true,
        message: 'Successfully logged in'
    }
    res.send(content);
    
});

router.post('/api/authenticate',authCtrl.login);

import userCtrl from './../controllers/usersCtrl';
router.put('/users/edit/:id',userCtrl.editUser);
router.post('/users/add',userCtrl.addUser);
router.delete('/users/delete/:id',userCtrl.delete);

 // FACEBOOK =====================
 //authCtrl.facebook(passport);
 router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/dashboard',
        failureRedirect : '/'
    }));

module.exports = router;