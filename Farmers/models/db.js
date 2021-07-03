const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority";


try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));

    }catch (error) { 
    console.log("could not connect");    
    }

    
var Schema = mongoose.Schema;

const FarmerSchema = new Schema({
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
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
      }

});

const CropSchema = new Schema({

    cropType:{
        type: String,
        required: true
    },
    cropName: {
        type: String

    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number

    }

});

const FarmerDetails = new Schema({
    Name: {
        type: String,
        required: true
    },
    ContactNumber:{
        type: Number,
        required: true,
        minlength: [10 , 'Enter a valid number']
    },
    Address:{
        Street:{
            type:String,
            required : true
        },
        City:{
            type:String,
            required : true
        },
        State: {
            type:String,
            required : true
        },
        ZipCode:{
            type:String,
            required : true
        }
    },
    BankDetails: {
        accNum: {
            type:Number,
            required : true
        },
        ifscCode:{
            type:String,
            required : true
        }
    }
});


FarmerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

const CropDetail = mongoose.model('crop', CropSchema);

const Farmer = mongoose.model('farmer', FarmerSchema);

const FarmerDetail = mongoose.model('farmerdetail', FarmerDetails);
   
module.exports = {Farmer, CropDetail , FarmerDetail};
