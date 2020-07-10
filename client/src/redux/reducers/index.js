import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import dataReducer from './data.js'
import authReducer from './auth.js'
export default combineReducers({
	form:formReducer,
	auth:authReducer,
	data:dataReducer
})