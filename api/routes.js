//import  express
const express = require('express')
const router = express.Router();
const passport = require('passport')
const { check, validationResult } = require('express-validator');

//import controllers
const UserControllers = require('./userControllers.js')
const passportConf = require('../config/passport.js')

// routes
//@route        users/signup
//@description      signup user
router.post('/signup',[
  // ...some  validations...
  check('email').isLength({min:1}).withMessage('Input email')
                .isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
],UserControllers.signUp)

//@route        users/signIn
//@description      signin already user
router.post('/signin',passport.authenticate('local',{session:false}),UserControllers.signIn)

//@route        users/secret
//@description      user access protected resource
router.get('/secret',passport.authenticate('jwt',{session:false}),UserControllers.secret)


//@route          users/auth/google
//@description      logging in using google
//this post route only takes in the access_token from the client
router.post('/auth/google',passport.authenticate('google-token',{session:false}),UserControllers.googleOAuth)

//@route          users/auth/facebook
//@description      logging in using facebook
//this post route only takes in the access_token from the client
router.post('/auth/facebook',passport.authenticate('facebookToken',{session:false}),UserControllers.facebookOAuth)








//export routes
module.exports = router