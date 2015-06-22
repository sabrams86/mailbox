var express = require('express');
var router = express.Router();
var db = require('./../connection');
var mail = db.get('inboxCollection');

//***********
//** index **
//***********
router.get('/inbox', function(req, res, next){
  mail.find({}, {}, function( err, docs){
    res.render('./emails/index', {emails: docs});
  });
});

//***********
//**  new  **
//***********
router.get('/inbox/new', function(req, res, next){
  res.render('./emails/new');
});

//***********
//** show  **
//***********
router.get('/inbox/:id', function(req, res, next){
  res.render('./emails/show');
});

//***********
//** edit  **
//***********
router.get('/inbox/:id/edit', function(req, res, next){
  res.render('./emails/edit');
});

//***********
//**create **
//***********
router.post('/inbox', function(req, res, next){
  res.redirect('./emails/index');
});

//***********
//**update **
//***********
router.post('/inbox/:id', function(req, res, next){
  var starred = req.body.starred;
  var read = req.body.read;
  console.log(read);
  if (starred != undefined){
    mail.update({ _id: req.params.id }, {$set: {starred: starred}});
  } else if (read != undefined){
    mail.update({ _id: req.params.id }, {$set: {read: read}});
  }
  res.send('ok');
});

//***********
//**destroy**
//***********
router.post('/inbox/:id/delete', function(req, res, next){
  mail.remove({ _id: req.params.id });
  res.send('ok');
});

module.exports = router;
