const mongoose = require('mongoose');

const countSchema =  mongoose.Schema({
   count:{
       type: Number
   }
});

let Count = module.exports = mongoose.model('Count', countSchema);


