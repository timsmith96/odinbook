const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  console.log('hello');
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.redirect('/home');
  }
};

module.exports = cookieJwtAuth;
