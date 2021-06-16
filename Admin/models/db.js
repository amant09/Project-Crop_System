const mongoose = require("mongoose");
const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/Project?retryWrites=true&w=majority";

try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }