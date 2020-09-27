var express = require('express');
const { json } = require('express');
var router = express.Router();
let io = require('socket.io-client');


router.get('/', (req, res) => {
  const loggedInUser = req.session.loggedInUser
  if (loggedInUser) {
    res.json({ loggedInUser })
  } else {
    res.json({ loggedInUser: null })
  }
})

router.post('/selectedCounter', (req, res, next) => {
  const { selectedCounter } = req.body
  console.log(selectedCounter);
  req.session.selectedCounter = selectedCounter
  // socket = io(`${req.secure ? 'https' : 'http'}://localhost:${process.env.PORT}`, { secure: true, reconnect: true, rejectUnauthorized: false });
  // socket.emit('message', 'Queue callled.');
  res.json({selectedCounter});
})

router.get('/selectedCounter', (req, res, next) => {
  res.json({ selectedCounter: req.session.selectedCounter });
})



module.exports = router

