var express = require('express');
const { json } = require('express');
var router = express.Router();

router.get('/', (req,res) => {
  const loggedInUser = req.session.loggedInUser
  if(loggedInUser) {
    res.json({loggedInUser})
  } else {
    res.json({loggedInUser : null})
  }
})


module.exports = router

