var express = require('express');
var router = express.Router();
var connection=require('../config/connection');

router.get('/adduser', function(req, res) {   
  res.render('adduser');
});

router.post('/add',function(req,res) {
  const userdata=({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    profession:req.body.profession
});
  connection.query('INSERT INTO users SET ?', userdata,function (err,result) {
      // if (err) throw err;
      res.redirect('/');
  });
});

router.get('/userlist', function(req, res) {   
  res.render('userlist');
});

router.get('/userlist',function(req,res,next) {
  connection.query('SELECT * FROM users',function(err,rows){
      if(err) throw err; 
      res.render('userlist', { users:rows});
    });
});

router.get('/deleteUser/:id',function (req,res) {
  const userid=req.params.id;
   connection.query('DELETE FROM users WHERE id=?',[userid],function (err,rows){
      if(err) throw err;
      res.redirect('/');
   });
});

router.get('/edit/:id',function (req,res) {
  const userid=req.params.id;
   connection.query('SELECT * FROM users WHERE id = ?',[userid],function (err,rows){
       if(err) throw err;
      res.render('edit',{userdata:rows});
   });
});

router.post('/updateUser/:id',function (req,res) {
const  firstname=req.body.firstname;
const  lastname=req.body.lastname;
const  email=req.body.email;
const  profession=req.body.profession;

const  updateId=req.params.id;

connection.query('UPDATE users SET  firstname=?, lastname=?,email=?,profession=? WHERE id=?',[firstname,lastname,email,profession,updateId],function(err,respond) {
  if (err) throw err;
  res.redirect('../../')
});
});

module.exports = router;
