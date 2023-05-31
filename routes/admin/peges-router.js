const express = require('express');
const routes = express.Router();
const passport = require('passport');

const{index,register,deshbord,email,profile,sliderform,resetcourse,postpages,otp,newpassword} = require('../../controler/admin/page_Cuntroller');

routes.get('/',index);
routes.get('/register',register);
routes.get('/deshbord', passport.checkAuthentication,deshbord);
routes.get('/email',email)
routes.get('/otp',otp)
routes.get('/newpassword',newpassword)
routes.get('/profile', passport.checkAuthentication,profile)
routes.get('/sliderform', passport.checkAuthentication,sliderform)
routes.get('/resetcourse', passport.checkAuthentication,resetcourse)
routes.get('/postpages', passport.checkAuthentication,postpages)

routes.use('/user',require('../admin/user-router'))


module.exports = routes;