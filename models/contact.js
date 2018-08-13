const  mongoose = require('mongoose');
// format for the data to be collected into my database
const contactSchema = mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   name:{type:String} ,
   email:{type:String} ,
   message:{type: String}
});

module.exports = mongoose.model('Contact',contactSchema);

module.exports.createContact=function (newContact,callback) {
	newContact.save(callback);
};