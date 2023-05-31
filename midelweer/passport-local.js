const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const RegisterModel = require('../module/admin/registerModel');
const bcrypt = require('bcrypt');

passport.use(new passportLocal({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        let userLogin = await RegisterModel.findOne({ email: email });
        console.log(email);
        if (!userLogin || password !== userLogin.password) {
            return done(null, false)
        }
        return done(null, userLogin);
       
    } catch (err) {
        return done(null, false);
    }
}))

passport.serializeUser((userLogin, done) => {
    return done(null, userLogin.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        let userLogin = await RegisterModel.findById(id);
        return done(null, userLogin);
    } catch (err) {
        return done(err, false);
    }
})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.userlogin = req.user;
    }
    return next();
}

module.exports = passport;