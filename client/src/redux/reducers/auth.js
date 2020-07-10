import {SIGN_UP,AUTH_ERROR,SIGN_OUT,SIGN_IN} from '../actions/types.js'
//this function takes state and action and figures out what to do based on that
//it takes an initial state
const DEFAULT_STATE ={
	// a boolean to know if the user is authenticated
	// a place to put our token
	// a place to stoe an error from the backend
	isAuthenticated:false,
	token:'',
	errorMessage:''

}
export default (state=DEFAULT_STATE,action)=>{
	switch(action.type){
		case SIGN_UP:
			console.log('Auth reducer  action')

		//do something
		return {
			...state,
			isAuthenticated:true,
			token:action.payload,
			//this one helps get rid of stale errors
			errorMessage:''
		}
		case SIGN_IN:
			console.log('Auth reducer  action')

		//do something
		return {
			...state,
			isAuthenticated:true,
			token:action.payload,
			//this one helps get rid of stale errors
			errorMessage:''
		}
		case AUTH_ERROR:
					console.log('error reducer  action')

		return {
			...state,
			errorMessage:action.payload
		}
		case SIGN_OUT:
		return {
           ...state,
           errorMessage:'',
           token:action.payload,
           isAuthenticated:false
		}
         default:
         return state
	}

}