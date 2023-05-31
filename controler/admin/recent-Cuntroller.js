const recentModel = require('../../module/admin/recentModel');
const path = require('path');
const fs = require('fs');
const imagespath = path.join('uploadesImage')
const resentcreat = async(req,res)=>{
    try {
        const { body: { title1, title2 } } = req
        let images = `${imagespath}/${req.file.filename}`;
        const user = await recentModel.create({ title1, title2, images });
        res.redirect('back')
    } catch (error) {
        console.log(error);
    }
}

const deletrecrent = async(req,res)=>{
    try {
        const { params: { id } } = req
        console.log(id);
        const delet = await recentModel.findByIdAndDelete(id);
        fs.unlinkSync(delet.images)
        res.redirect('back')
    } catch (error) {
        console.log(error);
    }
}

const aactive = async(req,res)=>{
    try {
        let { _id } = req.params
        let val = '0';
        const status = await recentModel.findByIdAndUpdate(_id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

const ddeactive = async(req,res)=>{
    try {
        let { _id } = req.params
        let val = '1';
        const status = await recentModel.findByIdAndUpdate(_id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

const editrecrnt = async(req,res)=>{
    try {
        const { params: { _id } } = req;
        const data = await recentModel.findById(_id);
        res.render('admin/Recent-Update', {
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const recentupdate  = async(req,res)=>{
    try {
        const { params: { _id } } = req;
        if (req.file) {
            let images = `${imagespath}/${req.file.filename}`
            const data = await recentModel.findByIdAndUpdate(_id, Object.assign({ images }, req.body))
            fs.unlinkSync(data.images)
            return res.redirect('/resetcourse')
        }
        else {
            const { body: { title1, title2 } } = req;
            const data = await recentModel.findByIdAndUpdate(_id, { title1, title2 });
            if (data) {
                return res.redirect('/resetcourse')
            }
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {resentcreat,deletrecrent,aactive,ddeactive,editrecrnt,recentupdate}