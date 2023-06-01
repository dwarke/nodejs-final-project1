const registerModels = require('../../module/admin/registerModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const imagespath = path.join('uploadesImage');

const registerData = async (req, res) => {
    try {
        let user = await registerModels.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        console.log('record is insert');
        return res.redirect('/')
      } catch (err) {
        console.log(err);
      }
};

const loginData = (req, res) => {
    return res.redirect('/deshbord')
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return
        }
        return res.redirect('/');
    })
}

const emailData = async (req, res) => {
    try {
        let otp = Math.floor(Math.random() * 1000000);
        let email = req.body.email;
        let obj = { email, otp }
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'dwarkeshap@gmail.com',
                pass: 'svxvzoqcntadinwc'
            }
        });
        const mailOptions = {
            from: 'dwarkeshap@gmail.com',
            to: email,
            subject: 'prima Inforom',
            html: `<p>otp:-${otp}</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                res.cookie('obj', obj)
                console.log('Email sent:', info.response);
                return res.redirect('/otp')
            }
        });
    } catch (error) {
        console.log(error);
        return
    }
}

const otpData = async (req, res) => {
    try {
        if (req.cookies.obj.otp == req.body.otp) {
            res.cookie('otpData', req.body.otp)
            return res.redirect('/newpassword')
        }
        return res.redirect('/otp')
    } catch (error) {
        console.log(error);
        return false
    }
}

const forgetpasswordData = async(req, res) => {
    let email = req.cookies.obj.email;
    try {

        let user = await registerModels.findOneAndUpdate({ email }, {  password: req.body.password });
        if (user) {
            res.clearCookie('obj')
            res.clearCookie('otpData')
            return res.redirect('/')
        } else {
            console.log("Record is not fach");
            return
        }

    } catch (error) {
        console.log(error);
        return
    }
}

const profileData = async(req,res)=>{
    try {
        let id = res.locals.userlogin.id;
        if (req.file) {
            let images = `${imagespath}/${req.file.filename}`;
            const uplodes = await registerModels.findByIdAndUpdate(id, Object.assign({ images }, req.body))
            if (uplodes) {
                if (uplodes.images !== '/uploadesImage/Profile-defeult-Images.png') {
                    fs.unlinkSync(uplodes.images)
                }
            }
            return res.redirect('/deshbord')
        } else {
            const oldImages = res.locals.userlogin.images;
            const uplodes = await registerModels.findByIdAndUpdate(id, Object.assign({ oldImages }, req.body))
            if (uplodes) {
                return res.redirect('/deshbord');
            }
        }
    } catch (error) {
        console.log(error);
        return
    }
}



module.exports = { 
    registerData, loginData, logout, emailData, otpData, forgetpasswordData ,profileData
}