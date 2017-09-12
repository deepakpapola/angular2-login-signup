import jwt from 'jsonwebtoken';

import User from './../models/users/user'

module.exports = {
    //get all users

    getUsers: (req,res) => {
        User.find({},'name email ._id date',(err,users) => {
            if(err)
                return done(err)
            res.send(users);
            return;
        })
    },
    //add user
    addUser : (req,res) => {
        let {email,name,password,date} = req.body;
 

        process.nextTick(() => {
            User.findOne({'email':email},(err,user) =>{
                if(err)
                    return done(err);
                if(user){
                    let content = {
                        success:false,
                        message:'user already exist' 
                    }; console.log('user already exist');
                    res.send(content);
                    return;
                } else {
                    var newUser = new User();
                    newUser.name = name; 
                    newUser.email = email;
                    newUser.date = date;
                    newUser.password = newUser.generateHash(password);
                    newUser.save((err) => {
                        if(err)
                            throw err;
                        
                        let content = {
                            success:true,
                            message:'New user created'
                        };console.log('added');
                        res.send(content);
                        return;
                    })
                }
            })
        }) 
    },

    //edit user
    editUser: (req,res) =>  {
        let id = req.params.id; console.log('edit=========',req.body);
        User.findByIdAndUpdate({id},{$set:req.body},(err, result) => {
            if(err)
                throw(err);
            let content = {
                success:true,
                message:'user updated'
            };console.log('update');
            res.send(content);
            return;
        });
    },

    //delete user
    delete:(req,res) => {
        let id=req.params.id; console.log(id);
        User.findByIdAndRemove(id, (err) => {
            if(err)
                return done(err);
            let content = {
                success:true,
                message:'user deleted'
            };console.log('deleted');
            res.send(content);
            return;
        })
    }
}
