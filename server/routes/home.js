const express = require('express');
const router = express.Router();

router.use((req, res) => {
  console.log(req.context);
  res.send('home route');
});

module.exports = router;
