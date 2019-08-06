var express = require('express');
var router = express.Router();


var listItems = [];
var formobj = {}



/*data base connection*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


//model created

const fatherModel = mongoose.model('father', {
    father_name: String,
    father_nric: Number,
    father_phone: Number,
});








/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/new', function (req, res, next) {
    res.render('newPage', { title: 'newPage' });
});

/* text area  */

router.post('/new', function (req, res, next) {
    console.log(req.body.mytext);
    listItems.push(req.body.mytext);
    console.log(listItems);
    res.send('text saved');
})


router.get('/about', function (req, res, next) {
    res.render('page1', { text: listItems });
});


/* index page to form inputs */

router.post('/form', function (req, res, next) {

    formobj = req.body

    // data entry

    const fatherObj = new fatherModel
        ({
            father_name: req.body.father_name,
            father_nric: req.body.father_nric,
            father_phone: req.body.father_phone,
        });

    //added to data base

    fatherObj.save().then(() => console.log('data stored'));
    res.send('success')

});

router.get('/page2', function (req, res, next) {

    // fathers.find({},function(err,data){
    //   if(err) {

    //   } else {

    //   }
    // })
    fatherModel.findById("5d25966d747bd11e35c49a5a").then(function (data) {
        console.log(data)
        res.render('display', { form_data: data })
    }).catch(function (err) {
        console.log('error', err)
    });


});

router.get('/design',function(req,res,next){
    res.render('design');
});

router.get('/login',function(req,res,next){
    res.render('login');
});

router.get('/products',function(req,res,next){
    res.render('products');
});

router.get('/order',function(req,res,next){
    res.render('order');
});

router.get('/partial',function(req,res,next){
    res.render('partial');
});

router.get('/newnav',function(req,res,next){
    res.render('newnav');
});

module.exports = router;
