const mongoose = require('mongoose');
const schema = mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    images:{
        type: String,
        required: true,
    }, 
    status:{
        type:String,
        default:1
    }
});
const silder = mongoose.model('post', schema);
module.exports = silder