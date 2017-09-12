import express from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';

import passport from 'passport';
import config from './config/config';
import routes from './routers/index';
import authCtrl from './controllers/authCtrl';

authCtrl.facebook(passport);

let app = express();

var port     = process.env.PORT || 3000;
// connect mongoose to database
mongoose.connect(config.database);
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

app.use(express.static(path.join(__dirname,'../../frontend/dist')));

app.use('/',routes);

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
})
// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
//app.use(jwt({}))
// catch 404 forwrd to error handler
// app.use((req,res,next) => {
//     let err = new Error('Page Not  found page add kr');
//     err.status =404;
//     next(err);
// })

app.listen(port,() => console.log('working'));