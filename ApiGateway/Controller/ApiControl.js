const router = require('../apis');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

const User = require("../models/user");
//const {Farmer , CropDetail} = require('../models/db');

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



module.exports.searchCrop = (req , res )=> { 
      MongoClient.connect(
        'mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
        //   assert.equal(null, connectErr);
          const coll = client.db('ProjectFarmer').collection('crops');
          const name = req.params.name
          const query = {cropName : name}
          coll.find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
          client.close();
        });
    })
}


module.exports.getFarmerData = (req, res)=>{
    axios.get('http://localhost:3000/farmers').then((response)=>{
        res.send(response.data);
    })
}

module.exports.getDealerData = (req, res)=>{
    axios.get('http://localhost:5000/dealers').then((response)=>{
        res.send(response.data);
    })
}

module.exports.getAdminData = (req, res)=>{
    axios.get('http://localhost:4000/admins').then((response)=>{
        res.send(response.data);
    })
}

// module.exports.searchcrop = (req, res)=>{
//     const name = req.params.name
//     axios.get('http://localhost:5000/dealerprofile/searchcrop'+ name).then((response)=>{
//         res.send(response.data);
//     })
// }