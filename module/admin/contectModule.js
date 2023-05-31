const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});
const contact = mongoose.model('contact', schema);
module.exports = contact