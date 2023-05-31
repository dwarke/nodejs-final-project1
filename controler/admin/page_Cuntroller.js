const registerModel = require('../../module/admin/registerModel')
const silderModels = require('../../module/admin/sliderModels')
const recentmodels = require('../../module/admin/recentModel')
const postModels = require('../../module/admin/postModel')
const bcrypt = require('bcrypt')

const index = (req, res) => {
    if (res.locals.userlogin) {
        return res.redirect('/deshbord')
    }
    return res.render('admin/index')
}

const register = (req, res) => {
    return res.render('admin/register')
}

const deshbord = (req, res) => {
    return res.render('admin/deshbord')
}

const email = (req, res) => {
    return res.render('admin/email')
}
const otp = (req, res) => {
    if (req.cookies.obj) {
        return res.render('admin/otp')
    }
    return res.redirect('/email')
}

const newpassword = (req, res) => {
    return res.render('admin/newpassword')
}

const profile = (req, res) => {
    return res.render('admin/profile')
}

const sliderform = async (req, res) => {
    try {
        const data = await silderModels.find({});
        return res.render('admin/sliderform', { data })
    } catch (error) {
        console.log(error);
    }
}

const resetcourse = async (req, res) => {
    try {
        const renecnt = await recentmodels.find({});
        res.render('admin/Recent-course', { renecnt })
    } catch (error) {
        console.log(error);
    }

}

const postpages = async (req, res) => {
    try {
        const data = await postModels.find({});
        res.render('admin/post-page', { data })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    index, register, deshbord, email, profile, sliderform, resetcourse, postpages, otp, newpassword
}           