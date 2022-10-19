const jwt = require('jsonwebtoken');

// middleware - runs when user wants to access protected route
const cookieJwtAuth = (req, res, next) => {
  console.log(req.headers.authorization);
  console.log(req.headers.authorization.split(' ')[1]);
  // get the token from cookies in the user's request
  const token = req.headers.authorization.split(' ')[1];
  try {
    // verifying the user's token and giving back user (packed up initially) if success
    const user = jwt.verify(token, process.env.JWT_KEY);
    console.log('token validation successful');
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
