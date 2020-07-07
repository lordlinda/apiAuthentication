const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy  = require('passport-local').Strategy
var GooglePlusTokenStrategy = require('passport-google-plus-token');


const {ExtractJwt} = require('passport-jwt')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const {JWT_SECRET,CLIENT_ID,CLIENT_SECRET} = require('../config/index.js')
const User = require('../models/User.js')
//JSON WEB TOKEN STRATEGY

//this is  for verifying the token  when the client wants to access
//a protected resource
//new JwtStrategy(options, verify)
//this is the format of the JwtStrategy  options
//options  is the   object defining how  it  the token is extracted
//from  jwtFromRequest and  secretOrKey
//verify(payload,done)
//verify  is a function  that   verifies the token and returns  a decoded payload
passport.use(new JwtStrategy({
	jwtFromRequest : ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
},(payload,done)=>{
	//the sub of the payload is where we kept the id
	//this is how we identify our client who wants to access the protected 
	//resource
     User.findById(payload.sub,(err,user)=>{
      //1.if we had an error we  send an error back to the client
	//and cant access the protected resource
	        if (err) {
	        	return done(err,false)
	        }

	//2.if we return a user we  return the client
	//and they can access the protected resource
	        if (user) {
	        	return done(null,user)
	        }else{
	 //3.Otherwise we send a message back to the client
	        //and they can not access the resource
              return done(null,false)

	        }
     })
}))

//PASSPORT LOCAL STRATEGY
//this is for signup refreshing token

passport.use(new LocalStrategy(
	//this object is important because the default value taken in by passport
	//are username and password
	{usernameField:'email'},
  (email, password, done)=> {
    //if we are using findOne to access a nested property we put it in astring
    User.findOne({'local.email':email },  (err, user)=> {
    	//if there is an error we handle it
      if (err) { return done(err,false); }
      // if there is no user we send an error message back to the client
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      //however if we do get a user
      //then we have to compare the password given with that in the database
      //the function has the passport  input by the user and the one matching the user in the database
    
      bcrypt.compare(password,user.local.password,(err,isMatch)=>{
      	//1.if there is an error we handle it
      	if(err){
      		return done(err,false)
      	}
      	//2.if the password is a match we return the user
        if(isMatch){
          return done(null, user);

        }else{
        	//3.if the password is not a match we send an error back to the client
       return done(null, false, { message: 'Incorrect password.' });


        }
      })
    });
  }
));

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID: CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
 // 0.Server receives access token from Client
  //1.check if the current client exists in our database
  User.findOne({'google.id':profile.id})
    //2.If we have this user in our database we return the user
   .then(user=>{
    if(user){
     //this user can now be accesses as req.user
    return done(null,user)
  }
  //3.If not we create this user and add them to our database
     //we create  new user
     const newUser =new User({
      methods:'google',
      google:{
        id:profile.id,
        //this is the email part from the profile
      //emails: [ { value: 'marialindananono@gmail.com', type: 'ACCOUNT' } ],
        email:profile.emails[0].value
      }
     })
     //save the user
     //this time there will not be using bcrypt as the method is not local
     newUser.save()
     //1.if the user is saved to the database we return  the user
     .then(user=>{
      //this user can now be accesses as req.user

      return done(null,user)
     })
     //2.if not we send the erro back to the client
     .catch(err=>{
      done(err,false,err.message)
     })
  }).catch(err=>{
    console.error(err)
    //done(err,false,err.message)
  })

}));