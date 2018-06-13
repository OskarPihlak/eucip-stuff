const express = require('express');
const router = express.Router();
const Eucip = require('../schemas/eucip');
const bodyParser =           require('body-parser');
const urlEncodedParser =     bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
    Eucip.find({}, (err, eucip) => {
        if (err) {
            throw err
        } else {
            console.log(eucip);
        }
        res.render('questions', {
            data: eucip
        });
    });
});

router.get('/questions', (req, res) => {
    Eucip.find({}, (err, eucip) => {
        if (err) {
            throw err
        } else {
        }
        res.render('questions', {
            data: eucip
        });
    });
});

router.get('/development', (req, res) => {
    Eucip.find({category:'Arendus'}, (err, eucip) => {
        if (err) {
            throw err
        } else {
            console.log(eucip);
        }
        res.render('questions', {
            data: eucip
        });
    });
});

router.get('/management', (req, res) => {
    Eucip.find({category:'Haldus'}, (err, eucip) => {
        if (err) {
            throw err
        } else {
            console.log(eucip);
        }
        res.render('questions', {
            data: eucip
        });
    });
});

router.get('/leadership', (req, res) => {
    Eucip.find({category:'Juhtimine'}, (err, eucip) => {
        if (err) {
            throw err
        } else {
            console.log(eucip);
        }
        res.render('questions', {
            data: eucip
        });
    });
});

router.get('/add', (req, res) => {
    Eucip.find({category:'Juhtimine'}, (err, eucip) => {
        if (err) {
            throw err
        } else {
        }
        res.render('add', {
            data: eucip
        });
    });
});
router.post('/add/eucip', (req, res) => {
    const awnser_count = req.body.awnser_amount;
    let awnsers = [];
    for(let i = 0; i < awnser_count; i++){
        awnsers.push({
            awnser:req.body[`awnsers[${i}][awnser]`],
            check: req.body[`awnsers[${i}][check]`]
        });
    }
    let eucip = new Eucip();
    eucip.topic = req.body.topic;
    eucip.question = req.body.question;
    eucip.answers = awnsers;
    eucip.save((err)=>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/questions');
        }
    })
});

module.exports = router;
