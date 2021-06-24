const User = require("../models/user");
const {Farmer , CropDetail} = require('../models/db');

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
  return jwt.sign({ id }, 'net ninja secret', {
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
    res.status(201).json(user);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
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

module.exports.viewCrop = (req, res)=>{
    CropDetail.find().then((crop)=>{
        res.json(crop)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
}
   
