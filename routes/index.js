const express = require('express');
const router = express.Router();
const Eucip = require('../schemas/eucip');
const Count = require('../schemas/count');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
/*
*
* GET
* */
router.get('/', (req, res) => {
    Eucip.count({}).exec((err, count) => {
        if (err) throw err;

        //get random entry
        const random = Math.floor(Math.random() * count);

        Eucip.findOne().skip(random).exec((err, result) => {

            res.render('challenge', {
                data: result,
                element_count: count
            });
        });
    });
});

router.get('/development', (req, res) => {

    Eucip.find({topic: "Arendus"}, (err, eucip_development) => {
        if (err) throw err;
        let count = eucip_development.length;
        //get random entry
        const random = Math.floor(Math.random() * count);

        Eucip.findOne({topic: "Arendus"}).skip(random).exec((err, result) => {
            res.render('challenge', {
                data: result,
                element_count: count
            });
        });
    });
});


router.get('/management', (req, res) => {
    Eucip.find({topic: "Haldus"}, (err, eucip_management) => {
        if (err) throw err;
        let count = eucip_management.length;
        //get random entry
        const random = Math.floor(Math.random() * count);

        Eucip.findOne({topic: "Haldus"}).skip(random).exec((err, result) => {
            res.render('challenge', {
                data: result,
                element_count: count
            });
        });
    });
});

router.get('/leadership', (req, res) => {
    Eucip.find({topic: "Juhtimine"}, (err, eucip_leadership) => {
        if (err) throw err;
        let count = eucip_leadership.length;
        //get random entry
        const random = Math.floor(Math.random() * count);

        Eucip.findOne({topic: "Juhtimine"}).skip(random).exec((err, result) => {
            res.render('challenge', {
                data: result,
                element_count: count
            });
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


router.get('/add', (req, res) => {
    Eucip.find({category: 'Juhtimine'}, (err, eucip) => {
        if (err) {
            throw err
        } else {
        }
        res.render('add', {
            data: eucip
        });
    });
});

/*
*
* POST
* */
router.post('/add/eucip', (req, res) => {
    Eucip.find({}, (err, database_dump) => {
        const awnser_count = req.body.awnser_amount;
        let awnsers = [];
        for (let i = 0; i < awnser_count; i++) {
            awnsers.push({
                awnser: req.body[`awnsers[${i}][awnser]`],
                check: req.body[`awnsers[${i}][check]`]
            });
        }
        let eucip = new Eucip();
        eucip.id = database_dump.length;
        eucip.topic = req.body.topic;
        eucip.question = req.body.question;
        eucip.answers = awnsers;
        eucip.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                res.redirect('/questions');
            }
        });
    });
});

router.post('/add/count', (req, res) => {
   Count.findOne({}, (err, count_element) => {
       count_element.count++;
       Count.findOneAndUpdate({}, {$set: {count: count_element.count}}, {new: true},(err, doc) => {
           if (err) {
               console.log("Something wrong when updating data!");
           }
           console.log(doc);
       });
   });
});

module.exports = router;
