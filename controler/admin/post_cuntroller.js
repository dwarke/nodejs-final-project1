const postModel = require('../../module/admin/postModel')
const path = require('path');
const fs = require('fs');
const imagespath = path.join('uploadesImage')

const postcreate = async(req,res)=>{
    try {
        let images = `${imagespath}/${req.file.filename}`;
        const { body: { titel, auther, date, category, discription } } = req
        const user = await postModel.create({ titel, auther, date, category, discription, images });
        res.redirect('back')
    } catch (error) {
        console.log(error);
    }
}

const postdelete = async(req,res)=>{
    try {
        const { params: { id } } = req
        const deletes = await postModel.findByIdAndDelete(id);
        fs.unlinkSync(deletes.images)
        res.redirect('back')
    } catch (error) {
        console.log(error);
    }
}

const actives = async(req,res)=>{
    try {
        let { id } = req.params;
        let val = '0';
        const status = await postModel.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

const deactives = async(req,res)=>{
    try {
        let { id } = req.params;
        let val = '1';
        const status = await postModel.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

const postedit = async(req,res)=>{
    try {
        const { params: { id } } = req;
        console.log(id);
        const data = await postModel.findById(id);
        res.render('admin/postupdate', {
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const updatedpost = async(req,res)=>{
    try {
        const { params: { id } } = req;
        if (req.file) {
            let images = `${imagespath}/${req.file.filename}`
            const data = await postModel.findByIdAndUpdate(id, Object.assign({ images }, req.body))
            fs.unlinkSync(data.images)
            return res.redirect('/postpages')
        }
        else {
            const { body: { titel, auther, date, category, discription } } = req
            const post = await postModel.findByIdAndUpdate(id, { titel, auther, date, category, discription });
            if (post) {
                return res.redirect('/postpages')
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {postcreate,postdelete,actives,deactives,postedit,updatedpost}