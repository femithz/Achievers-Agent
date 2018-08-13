const  mongoose = require('mongoose');
// format for the data to be collected into my database
const choiceSchema = mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String, required:true} ,
    lastname:{type:String, required:true} ,
    email:{type:String, required:true} ,
    phonenumber:{type:String, required:true} ,
    area:{type:String, required:true} ,
    apartmenttype:{type:String, required:true} ,
    description:{type:String, required:true} 
});

module.exports = mongoose.model('Choice',choiceSchema);


module.exports.createChoice=function (newChoice,callback) {
	newContact.save(callback);
};