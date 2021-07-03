const jwt = require('jsonwebtoken');
const User = require('../models/user');

const dealerAuth = (req, res, next) => {
  const token = req.cookies.dealer;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Dealer', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send({message: 'Please Login'});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send({message: `Access Denied! Not a Authorised User.
    Login As Dealer to Access!`});
  }
};

module.exports = {dealerAuth};