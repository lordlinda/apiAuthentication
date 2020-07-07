//controllers for routes
//third party modules
const bcrypt =require('bcryptjs')
const  jwt  =  require('jsonwebtoken')
const { validationResult } = require('express-validator');


//import User model
const User = require('../models/User.js')
const { JWT_SECRET } = require('../config/index.js')

//creating  a signed token using jsonwebtoken
//to be sent back to the client to access protected resources
signToken = user =>{
	return jwt.sign({
		sub:user._id,
	   },JWT_SECRET)
}



module.exports  ={
	//@route        users/signUp
	//@description      signup new user
	signUp:(req,res)=>{
		// Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
	//before we create a user  we need to ensure  that  the user doesnt
	//exist in our database  by checking for  the  email in the database
     User.findOne({'local.email':req.body.email})
     .then(user=>{
     	//if  we  have a user already in the database ,we cannot  save this user again
     	//in the database
     	if(user){
     		return  res.status(422).json('user already exists')
     	}
     	//if the user doesnt  exist  in the database  we can save them to the database
     	//1.we   create  a new User object to store credentials
		//from the server using the User model
		let newUser = new User({
			methods:'local',
			local:{
            email:req.body.email,
			password:req.body.password
			}
		})
       //here the password is  hashed
	     newUser.save()
	      //4.if the credentials are valid we send a create a signed token
	   //and send it back to the client
	   .then(user=>{
		const token =signToken(user)
		res.status(200).json(token)
	   })//5.if credentials not valid we do not send a signed token and instaed send
	  //an error ,sg ot the client.
	   .catch(err=>{
		res.status(500).json({error:err})
	  })
     })

	},
	//@route        users/signIn
	//@description      signin already user
    signIn:(req,res)=>{
    	//1.generate a token
    //whwn we login using passport we can now access the user object from req.user
    const user = req.user
    const token  = signToken(user)
    res.status(200).json({token})
	},
	//@route        users/secret
	//@description      user access protected resource
	secret:(req,res)=>{
		console.log('secret')
	},
	//@route          users/auth/google
    //@description      logging in using google
    //this post route only takes in the access_token from the client
	googleOAuth:(req,res)=>{
	//1.generate a token
    //whwn we login using passport we can now access the user object from req.user
    const user = req.user
    const token  = signToken(user)
    res.status(200).json({token})
	}
}