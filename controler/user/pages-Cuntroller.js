const sildermodels = require('../../module/admin/sliderModels')
const recentmodels = require('../../module/admin/recentModel')
const postmodels = require('../../module/admin/postModel')
const contactModels = require('../../module/admin/contectModule')
const home = async (req, res) => {
    try {
        const data = await sildermodels.find({});
        const user = (await recentmodels.find({}).sort({ _id: -1 }))
        const postdata = (await postmodels.find({}).sort({ _id: -1 }).limit(3));
        res.render('user/home', { data, user, postdata })
    } catch (error) {
        console.log(error);
    }
}
const contact = async (req, res) => {
    res.render('user/contact')
}
const blogsingle = async (req, res) => {
    console.log(req.params);
    try {
        let id = req.params.id
        const data = await postmodels.findById(id)
        return res.render('user/blogsingle', { data })
    } catch (error) {
        console.log(error);
    }

}
const contactdata = async (req, res) => {
    try {
        const { body: { name, email, subject, message } } = req
        const data = await contactModels.create({ name, email, subject, message });
        return res.redirect('back')
    } catch (error) {
        console.log(error);
    }
}

const services = (req, res) => {
    return res.render('user/services')
}

const clinte = (req, res) => {
    return res.render('user/clinte')
}

const blog = async (req, res) => {

    try {
        const postdata = await postmodels.find({}).sort({ _id: -1 });
        res.render('user/blog', { postdata })
    } catch (err) {
        console.log(err);
        return false
    }
}


const about = (req, res) => {
    return res.render('user/about')
}

const resent_course = async (req, res) => {
    try {
        const user = (await recentmodels.find({}).sort({ _id: -1 }))
        return res.render('user/resent_course', { user })
    } catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    home, contact, contactdata, blogsingle, services, clinte, blog, about, resent_course
}