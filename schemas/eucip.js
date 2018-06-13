const mongoose = require('mongoose');

const eucipSchema = mongoose.Schema({
    question: {
        type: String,
        index:true
    },
    answers:{
        type: Array
    },
    topic:{
        type: String
    },
    id:{
        type: String
    }
});

let Eucip = module.exports = mongoose.model('Eucip', eucipSchema);