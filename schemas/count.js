const mongoose = require('mongoose');

const countSchema =  mongoose.Schema({
   count:{
       type: Number
   },
    last_question_checked:{
       type:Date
    }
});

let Count = module.exports = mongoose.model('Count', countSchema);


