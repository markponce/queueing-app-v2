var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')


router.post('/login', async function(req, res, next) {

  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if(user) {
      
      const isPasswordMatch = bcrypt.compare(password, user.password);
      if(isPasswordMatch) {
        const {email, isAdmin, firstName, lastName} = user;
        req.session.loggedInUser = {
          email, 
          isAdmin, 
          firstName, 
          lastName, 
          fullName : user.getFullName()
        };

        res.status(200).send({
          user: req.session.loggedInUser,
          message: 'Successfully Logged In.'
        })

      } else {
        res.status(401).send({
          message : 'Invalid Username or Password.'
        })
      }

    } else {
      res.status(401).send({
        message : 'Invalid Username or Password.'
      })
    }

  } catch ({message}) {
    res.status(401).json({message});
  }

});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    user = new User({
      email: 'mark@gmail.com',
      password: '123456',
      firstName: 'mark',
      lastName: 'mark',
      isAdmin: false
    })

    data = await user.save()

    res.status(201).json({data})
    
  } catch ({message}) {
    res.status(400).json({message}).statusCode(400)
  }
});

/* GET users listing. */
router.get('/logout', async function(req, res, next) {
  await req.session.destroy();
  res.json({
    loggedInUser : null
  })
});

module.exports = router;
