const mongoose = require("mongoose");
const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectAdmin?retryWrites=true&w=majority";

try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
    
    
    mongoose.Promise = global.Promise;




    
//const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type : String,
        required : true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

});


const Admin = mongoose.model('admin', AdminSchema);
   
module.exports = Admin;


    