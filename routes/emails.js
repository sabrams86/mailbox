var express = require('express');
var router = express.Router();
var db = require('./../connection');
var mail = db.get('inboxCollection');
var labelCollection = db.get('labelConnection');


//***********
//** index **
//***********
router.get('/inbox', function(req, res, next){
  labelCollection.find({}, {}, function(labelErr, labelDocs){
    console.log(labelDocs);
    mail.find({}, {}, function( err, docs){
      var unreadCount = 0;
      docs.forEach(function(e){
        if(e.read === false){
          unreadCount += 1;
        }
      });
      var is_ajax_request = req.xhr;
      if (is_ajax_request) {
        res.json(docs);
      } else {
        res.render('./emails/index', {emails: docs, unreadCount: unreadCount, labels: labelDocs});
      }
    });
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
  var label = req.body.label;
  var is_ajax_request = req.xhr;
  if (starred != undefined){
    mail.update({ _id: req.params.id }, {$set: {starred: starred}});
  } else if (read != undefined){
    mail.update({ _id: req.params.id }, {$set: {read: read}});
  } else if (label != undefined){
    mail.findOne({_id: req.params.id}, function(err, doc){
      var matches = doc.labels.filter(function(e){ return label.toLowerCase() === e.toLowerCase() }).length;
      if (matches === 0) {
        mail.update({ _id: req.params.id }, {$push: {labels: label}});
      }
    });
  }
  res.send('ok');
});

//*****************
//**remove label **
//*****************
router.post('/inbox/:id/removelabel', function(req, res, next){
  var label = req.body.label;
  var is_ajax_request = req.xhr;
  if (label != undefined){
    console.log(label);
    mail.update({ _id: req.params.id }, {$pull: {labels: label}});
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
