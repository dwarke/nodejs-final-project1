const routes = require('express').Router();
const passport = require('passport');
const ImagesUplodes = require('../../midelweer/multer');

const { registerData, loginData, logout, emailData, otpData, forgetpasswordData, profileData } = require('../../controler/admin/register_cuntroller')

routes.post('/registerData', registerData);
routes.post('/loginData', passport.authenticate('local', ({ failureRedirect: '/' })), loginData);
routes.get('/logout', logout)
routes.post('/emailData', emailData)
routes.post('/otpData', otpData)
routes.post('/forgetpasswordData', forgetpasswordData)
routes.post('/profileData', ImagesUplodes, profileData)

const { slidercreat,deleteData,EditData,updateslider,active,deactive } = require('../../controler/admin/slider-Cuntroller');

routes.post('/slidercreat', ImagesUplodes, slidercreat);
routes.get("/deleteData/:id",deleteData);
routes.get("/EditData/:id",EditData);
routes.post("/updateslider/:_id",ImagesUplodes,updateslider);
routes.get('/active/:_id', active)
routes.get('/deactive/:_id', deactive)

routes.use('/',require('../admin/resent-router'))

module.exports = routes