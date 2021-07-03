const jwt = require('jsonwebtoken');
const User = require('../models/user');

const farmerAuth = (req, res, next) => {
  const token = req.cookies.farmer;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Farmer', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send({message: 'Please Login'});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send({message: `Access Denied! Not a Farmer.
    Login as Farmer To Access`});
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'Farmer', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { farmerAuth, checkUser };