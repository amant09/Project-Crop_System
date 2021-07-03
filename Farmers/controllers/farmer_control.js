const User = require("../models/user");
const {Farmer , CropDetail ,FarmerDetail} = require('../models/db');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
      }
    
      // incorrect password
      if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
      }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'aman', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.send('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.farmer_post = async (req, res )=>{
    const { name, username, email, password } = req.body;

  try {
    const farmer = await Farmer.create({ name, username, email, password });
    res.status(201).json(farmer);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}


module.exports.farmerDetail_post = async (req, res )=>{
  const { Name, ContactNumber , Address , BankDetails } = req.body;

try {
  const farmerprofile = await FarmerDetail.create({Name , ContactNumber , Address , BankDetails });
  res.status(201).json(farmerprofile); 
}
catch(err) {
  const errors = handleErrors(err);
  res.status(400).json({ errors });
}

module.exports.updateFarmerprofile = (req,res,next)=>{
  FarmerDetail.findByIdAndUpdate({_id: req.params.name}, req.body).then(()=>{
      FarmerDetail.findOne({_id: req.params.id}).then((farmer)=>{
          res.json(farmer);
  });
});
}
}



 module.exports.viewCrop = (req, res)=>{
     CropDetail.find().then((crop)=>{
         res.json(crop);
     }).catch((err)=>{
          if(err){
             throw err;
         }
     })
}



