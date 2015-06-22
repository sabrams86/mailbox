var express = require('express');
var router = express.Router();
var db = require('./../connection');
var labelCollection = db.get('labelCollection');

//***********
//** Index **
//***********
router.get('/index', function(req,res,next){
  res.send('ok');
});

//***********
//** Create**
//***********
router.post('/index', function(req,res,next){
  res.send('ok');
});

//***********
//** Delete**
//***********
router.post('/:id/delete', function(req,res,next){
  labelCollection.remove({ _id : req.params.id });
  res.send('ok');
});

module.exports = router;
