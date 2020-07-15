import axios from 'axios'
//Actions  creators  ==>create Actions ==>dispatched ==>middlewares ==>reducers
//every action will have a type
///redux thunk allows us to  return functions with dispatch
/////async await is very important
import {SIGN_UP,AUTH_ERROR,SIGN_OUT,SIGN_IN,GET_DATA} from './types.js'
export const signUp=(data)=>{
	return async dispatch=>{
		console.log('Action creator signup called')
		//step 1)Use data and make http requests to backend and send it along
		//step 2)Take the backend response(jwtoken is here now)
		//step 3) Dispatch user just signed up (with jwtoken)
		//step 4)save the jwtoken into our localStorage
		await axios.post('http://localhost:5000/users/signup',data)
		.then(res=>{
			console.log(res)
	console.log('Action creator dispatch action')

			dispatch({
				type:SIGN_UP,
				payload:res.data.token
			})
			//we need to save token to localStorage
			localStorage.setItem('JWToken',res.data.token)
					axios.defaults.headers.common['Authorization'] =res.data.token

		}).catch(err=>{
			//console.log(err)
			dispatch({
				type:AUTH_ERROR,
				payload:'Invalid credentials'

			})
		})
	}

}

export const signIn=(data)=>{
	return async dispatch=>{
		console.log('Action creator signup called')
		//step 1)Use data and make http requests to backend and send it along
		//step 2)Take the backend response(jwtoken is here now)
		//step 3) Dispatch user just signed up (with jwtoken)
		//step 4)save the jwtoken into our localStorage
		await axios.post('http://localhost:5000/users/signin',data)
		.then(res=>{
			console.log(res)
	console.log('Action creator dispatch action')

			dispatch({
				type:SIGN_IN,
				payload:res.data.token
			})
			//we need to save token to localStorage
			localStorage.setItem('JWToken',res.data.token)
					axios.defaults.headers.common['Authorization'] =res.data.token

		}).catch(err=>{
			//console.log(err)
			dispatch({
				type:AUTH_ERROR,
				payload:'user not found'

			})
		})
	}

}

export const oauthGoogle =(data)=>{
	return async dispatch=>{
		//console.log(data)
		await axios.post('http://localhost:5000/users/auth/google',{
			access_token:data
		}).then(res=>{
			console.log(res)
			dispatch({
				type:SIGN_UP,
				payload:res.data.token
			})
		//we need to save token to localStorage
		localStorage.setItem('JWToken',res.data.token)
	axios.defaults.headers.common['Authorization'] =res.data.token

		}).catch(err=>{
         console.log(err)
		})
	}
}

export const oauthFacebook =(data)=>{
	return async dispatch=>{
		//console.log(data)
		await axios.post('http://localhost:5000/users/auth/facebook',{
			access_token:data
		}).then(res=>{
			console.log(res)
			dispatch({
				type:SIGN_UP,
				payload:res.data.token
			})
		//we need to save token to localStorage
		localStorage.setItem('JWToken',res.data.token)
		axios.defaults.headers.common['Authorization'] =res.data.token

		}).catch(err=>{
         console.log(err)
		})
	}
}

export const getSecret=()=>{
	return async dispatch=>{
		//console.log('action')
		await axios.get('http://localhost:5000/users/secret')
		.then(res=>{
			console.log(res)
			dispatch({
				type:GET_DATA,
				payload:res.data.secret
			})
			console.log(res.data.secret)
		}).catch(err=>{
			console.error(err)
		})
	}
}
export const signout=()=>{
	return dispatch=>{
		localStorage.removeItem('JWToken')
		//we sipatch an action to inform the user that the 
		//user has signed out
		axios.defaults.headers.common['Authorization'] =''

		dispatch({
			type:SIGN_OUT,
			payload:''

		})
	}
}