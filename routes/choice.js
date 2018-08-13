var express = require('express');
var router = express.Router();
var Choice=require('../models/choice');
/* GET home page. */
router.get('/',function(req,res,next) {
        res.render('choice');
});
  

// section to add new choice
router.post('/add', function(req, res) {
     
            var firstname=req.body.firstname;
            var lastname=req.body.lastname;
            var email=req.body.email;
            var phonenumber=req.body.phonenumber;
            var area=req.body.area;
            var apartmenttype=req.body.apartmenttype;
            var description=req.body.description;
      
             req.checkBody('firstname','Name is required').notEmpty();
             req.checkBody('lastname','lastname is required').notEmpty();
             req.checkBody('email','Email is required').notEmpty();
             req.checkBody('email','Email is not valid').isEmail();
             req.checkBody('phonenumber','phonenumber is required').notEmpty();
             req.checkBody('area','area is required').notEmpty();
             req.checkBody('apartmenttype','apartmenttype is required').notEmpty();
             req.checkBody('description','description is required').notEmpty();
        
       var errors=req.validationErrors();
  
        if (errors) {
           res.render('choice',{
            errors:errors
           });
       } else {
        var newChoice=new Choice({
              _id:mongoose.Schema.Types.ObjectId,
              firtsname:firstname,
              lastname:lastname,
              email:email,
              phonenumber:phonenumber,
              area:area,
              apartmenttype:apartmenttype,
              description:description
         });

         User.createChoice(newChoice,function (err,choice) {
          if (err) throw err;
          console.log(choice); 
         }); 

       req.flash('success_msg','You have Successfully sent your choice of hostel');
        
         res.redirect('/');

    }
});







// section to add new choice
// router.post('/add', (req,res,next) => {
//      const choice=new Choice({
//             _id:new mongoose.Types.ObjectId(),
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             email:req.body.email,
//             phonenumber:req.body.phonenumber,
//             area:req.body.area,
//             apartmenttype:req.body.apartmenttype,
//             description:req.body.description
//   });
//   choice
//   .save(function(err,doc){
//             if(err){
//                 res.status(500);
//             }else{
//                 res.redirect("/");
//             }
//         })
//   .then(result=>{
//     res.status(201).json({
//       message:'choice upload Successfully'
//     });
//   })
//    .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     });
//    });
//  });
module.exports = router;
