import {GET_DATA} from '../actions/types.js'
const initialState={
	secret:''
}

export default (state=initialState,action)=>{
	switch(action.type){
		case GET_DATA:
		return {
			...state,
			secret:action.payload
		}
		default:
		return state
	}
}