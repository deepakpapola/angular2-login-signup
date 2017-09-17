import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var userSchema = mongoose.Schema({

    name:String,
    email:{
        type : String,
        unique:true
    },
    date: {type : Date},
    password: {type :String},

    facebook:{
        id: {type :String},
        token:{type :String},
        name: {type :String},
        email:{type :String}

    },
    google:{
        id: {type :String},
        token:{type :String},
        name: {type :String},
        email:{type :String}
    }
    
});

userSchema.methods.generateHash =(password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = (password,pass) => {
    return bcrypt.compareSync(password,pass);
};

module.exports = mongoose.model('User',userSchema);