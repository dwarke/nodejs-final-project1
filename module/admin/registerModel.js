const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    images : {
        type : String,
        required : true,
        default : "/uploadesImage/Profile-defeult-Images.png",
    }
})

const register = mongoose.model('admin-register',schema);
module.exports = register

