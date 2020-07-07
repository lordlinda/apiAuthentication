const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//create a user Schema
const  userSchema = mongoose.Schema({
    methods: {
    type: String,
    enum:['local','google','facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }

})
//for this case using an arrow function gives an error
//terming this as undefined
userSchema.pre('save',function(next){
	//1.to be able to hash our password,the method has to be local to
	if(this.methods !== 'local'){
		return next();
	}
	 //2. we generate a salt  and hash the password
	 //we use this.local.password because the password is now nested
	 //in the local object
	   bcrypt.hash(this.local.password, 10, (err, hash)=> {
	   	if(err){
	   		return console.error(err)
	   	}
		//we set the password to the hash
		this.local.password = hash
		//the next function is inside the bcrypt function
		      next();

	   //3. we save the new User to the database
      })//end of bcrypt function

})

//create and export mongoose module
module.exports = mongoose.model('user',userSchema)