const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1/final-project-nodejs',{
}).then(() => {
    console.log('Connected to MongoDB!');
  }).catch((error) => {  
    console.error('Error connecting to MongoDB:', error);
  });

  module.exports=db;