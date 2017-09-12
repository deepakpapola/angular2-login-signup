import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var userSchema = mongoose.Schema({

    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    date: Date,
    password:String,

    facebook:{
        id: String,
        name: String,
        name: String,
        email:String

    },
    google:{
        id: String,
        name: String,
        name: String,
        email:String
    }
    
});

userSchema.methods.generateHash =(password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = (password,pass) => {
    return bcrypt.compareSync(password,pass);
};

module.exports = mongoose.model('User',userSchema);