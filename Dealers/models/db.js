const mongoose = require("mongoose");
const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectDealer?retryWrites=true&w=majority";



try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }




    var Schema = mongoose.Schema;

const DealerSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type : String,
        require : true,
        unique: true
    },
    email: {
        type: String,
        require : true
    },

    password: {
        type: String,
        require: true
    }

});


const Dealer = mongoose.model('dealer', DealerSchema);
   
module.exports = Dealer;