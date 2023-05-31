const silderModels = require('../../module/admin/sliderModels');
const path = require('path');
const fs = require('fs');
const imagespath = path.join('uploadesImage')

const slidercreat = async (req, res) => {
    console.log(req.body);
    try {
        const { title1, title2 } = req.body
        console.log(req.body);
        const add = await silderModels.create({ title1, title2, images: imagespath + "/" + req.file.filename });
        console.log(add);
        if (add) {
            console.log("Prodect Add Successfully");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const deleteData = async (req,res)=>{
    try {
        const { params: { id } } = req
        console.log(id);
        const dele = await silderModels.findByIdAndDelete(id);
        fs.unlinkSync(dele.images)
        res.redirect('back')
      } catch (error) {
        console.log(error);
      }
}

const EditData = async(req,res)=>{
    try {
        let id = req.params.id;

        const data = await silderModels.findById(id);

        console.log(data);

        return res.render("admin/sliderUpdate", { data });

    } catch (error) {
        console.log(error.message);
    }
}

const updateslider = async(req,res)=>{
    try {
        const { params: { _id } } = req;
        let user = req.body
        if (req.file) {
          let images = `${imagespath}/${req.file.filename}`
          const data = await silderModels.findByIdAndUpdate(_id, Object.assign({ images }, req.body))
          fs.unlinkSync(data.images)
          console.log(data);
          return res.redirect('/sliderform')
        }
        else {
          const data = await silderModels.findByIdAndUpdate(_id, user)
          return res.redirect('/sliderform')
        }
      } catch (error) {
        console.log(error);
      }
}

const active = async(req,res)=>{
    try {
        let { _id } = req.params
        let val = '0';
        const status = await silderModels.findByIdAndUpdate(_id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

const deactive = async(req,res)=>{
    try {
        let { _id } = req.params
        let val = '1';
        const status = await silderModels.findByIdAndUpdate(_id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}

module.exports = {
    slidercreat,deleteData,EditData,updateslider,active,deactive
}