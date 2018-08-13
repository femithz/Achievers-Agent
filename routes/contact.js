var express = require('express');
var router = express.Router();

var Contact=require('../models/contact');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact');
});


router.post('/submit', function(req, res) {

      var name=req.body.name;
      var email=req.body.email;
      var message=req.body.message;
      
       req.checkBody('name','Name is required').notEmpty();
       req.checkBody('email','Email is required').notEmpty();
       req.checkBody('email','Email is not valid').isEmail();
       req.checkBody('message','message is required').notEmpty();
  
       var errors=req.validationErrors();
  
        if (errors) {
           res.render('contact',{
           	errors:errors
           });
       } else {
       	var newContact=new Contact({
              _id:new mongoose.Types.ObjectId(),
       		   	name:name,
        		  email:email,
       		   	message:message
         });

         Contact.createContact(newContact,function (err,contact) {
         	if (err) throw err;
         	console.log(contact); 
         }); 

       req.flash('success_msg','you have successfully sent us a message');
        
         res.redirect('/contact/contact');

    }
});
module.exports = router;
