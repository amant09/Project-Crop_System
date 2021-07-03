const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req, res, next) => {
  const token = req.cookies.admin;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Admin', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send({message: 'Please Login'});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send({message: 'Access Denied! Login as Admin to Access!'});
  }
};

module.exports = {adminAuth};