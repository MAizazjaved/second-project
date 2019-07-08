var express = require('express');
var router = express.Router();


var listItems=[];




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new', function(req, res, next) {
  res.render('newPage', { title: 'newPage' });
});

router.post('/new' , function(req, res, next)
{
  console.log(req.body.mytext);
  listItems.push(req.body.mytext); 
  console.log(listItems);
  res.send('text saved');
})

router.get('/about', function(req, res, next) {
  res.render('page1' , { text : listItems});
});
module.exports = router;
