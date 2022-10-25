const jwt = require('jsonwebtoken');
const User = require('../models/user');

// middleware - runs when user wants to access protected route
const cookieJwtAuth = async (req, res, next) => {
  // get the token from cookies in the user's request
  try {
    const token = req.headers.authorization.split(' ')[1];
    // verifying the user's token and giving back user (packed up initially) if success
    let user = jwt.verify(token, process.env.JWT_KEY);
    console.log('token validation successful');
    // requerying the database to make sure we have the most up to date user to account for any changes which may have been made
    user = await User.findOne({ _id: user.user._id });
    // adding user from the jwt verify to the request object so can be used in the route (this function is middleware)
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    // validation failed, send a 403 response back to front-end can then handle this (redirect to login page)
    console.log('not validated, redirecting');
    return res.status(403).json('unable to validate JWT token');
  }
};

module.exports = cookieJwtAuth;
