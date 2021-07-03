const jwt = require('jsonwebtoken');
const {Admin, Farmer , Dealer} = require('../models/user');



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

// create json web token for farmer
const maxAge = 3 * 24 * 60 * 60;
const farmerToken = (id) => {
  return jwt.sign({ id }, 'Farmer', {
    expiresIn: maxAge
  });
};

// create json web token for dealer
const dealerToken = (id) => {
  return jwt.sign({ id }, 'Dealer', {
    expiresIn: maxAge
  });
};

// create json web token for admin

const adminToken = (id) => {
  return jwt.sign({ id }, 'Admin', {
    expiresIn: maxAge
  });
};

// controller actions

// Farmer Signup And Login Controller
module.exports.farmer_signup_post = async (req, res) => {
  const {name , email, password } = req.body;

  try {
    const farmer = await Farmer.create({name, email, password });
    const token = farmerToken(farmer._id);
    res.cookie('farmer', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).send( `Signup Success for  ${farmer.name}` );
  }
  catch(err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
}

module.exports.farmer_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const farmer = await Farmer.login(email, password);
    const token = farmerToken(farmer._id);
    res.cookie('farmer', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user: `Welcome ${farmer.name}`})
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.farmer_logout_get = (req, res) => {
  res.cookie('farmer', '', { maxAge: 1 });
  res.send({message: "Logout Successful!"});
}



// Dealer Signup And Login Controller
module.exports.dealer_signup_post = async (req, res) => {
  const {name , email, password } = req.body;

  try {
    const dealer = await Dealer.create({name, email, password });
    const token = dealerToken(dealer._id);
    res.cookie('dealer', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).send( `Signup Success for ${dealer.name}` );
  }
  catch(err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
}

module.exports.dealer_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dealer = await Dealer.login(email, password);
    const token = dealerToken(dealer._id);
    res.cookie('dealer', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: "Welcome "+ dealer.name});
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.dealer_logout_get = (req, res) => {
  res.cookie('dealer', '', { maxAge: 1 });
  res.send({message: "Logout Successful!"});
}


// Admin Signup And Login Controller
module.exports.admin_signup_post = async (req, res) => {
  const {name , email, password } = req.body;

  try {
    const admin = await Admin.create({name, email, password });
    const token = adminToken(admin._id);
    res.cookie('admin', token, { httpOnly: true, maxAge: 1 });
    res.status(201).send( `Signup Success ${admin.name}` );
  }
  catch(err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
}

module.exports.admin_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = adminToken(admin._id);
    res.cookie('admin', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user:"Welcome "+ admin.name });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.admin_logout_get = (req, res) => {
  res.cookie('admin', '', { maxAge: 1 });
  res.send({message: "Logout Successful!"});
}

