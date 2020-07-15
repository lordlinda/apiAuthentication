import React,{Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import  CustomInput from './Custominput.js'
//this means import all action
import * as actions from '../redux/actions/index.js'

class Signin extends Component{
constructor(props){
	super(props)
	this.onSubmit=this.onSubmit.bind(this)
	this.responseGoogle=this.responseGoogle.bind(this)
	this.responseFacebook=this.responseFacebook.bind(this)
}

	async onSubmit(formData){
		console.log('onsubmit got called')
		console.log(formData)
		//we need to call some actioncreator
		await this.props.signIn(formData)
		// console.log(this.props.errorMessage)
       //if we successfully signup or sign in
        //we are redirected to the dashboard
		if(!this.props.errorMessage){
        // console.log(this.props.errorMessage)
	     this.props.history.push('/dashboard')
		}

	}

	async responseGoogle(res){
     console.log(res)
     await this.props.oauthGoogle(res.accessToken)

     //if we successfully signup or sign in
//we are redirected to the dashboard
		if(!this.props.errorMessage){
			this.props.history.push('/dashboard')
		}
	}
	async responseFacebook(res){
      console.log(res)
      await this.props.oauthFacebook(res.accessToken)


      //if we successfully signup or sign in
//we are redirected to the dashboard
		if(!this.props.errorMessage){
			this.props.history.push('/dashboard')
		}
	}
	render(){
		//we use handlesubmit from redux-form
		const {handleSubmit} =this.props
		return(
			<div className="row">
	{/* left column*/}

			<div className="col">
		{/*we dont call it over here we just pass it*/}
			<form onSubmit={handleSubmit(this.onSubmit)}>
			<fieldset>
			<Field
			name="email"
			type="text"
			id="email"
			label="Enter your email"
			placeholder="example@example.com"
			component={CustomInput}
			/>
			</fieldset>
			<fieldset>
			<Field
			name="password"
			type="password"
			id="password"
			component={CustomInput}
			label="Enter your password"
			placeholder="yoursuperpassword"
			/>
			</fieldset>
			{
				this.props.errorMessage ? 
				<div className="alert alert-danger">
				{this.props.errorMessage}
				</div>

				:null
			}
            <button type="submit" className="btn btn-primary">Signin</button>
			</form>
			</div>
				{/*end of left column*/}

	           {/* right column*/}


				<div className="col">
				<div className="text-center">
				<div className="alert alert-primary">
				Or signin using third party services
				</div>
				{/*facebook login component*/}
				<FacebookLogin
				appId="2636632776598777"
				textButton="facebook"
				fields="name,email,picture"
				callback={this.responseFacebook}
				cssClass="btn btn-outline-primary"
				/>
			   {/*google login component*/}
			   <GoogleLogin
			   clientId="388882204865-apne36v947drgn6937k63ueme0e7eim6.apps.googleusercontent.com"
			   buttonText="Google"
			   onSuccess={this.responseGoogle}
			   onFailure={this.responseGoogle}
			   className="btn btn-outline-danger"
			   />

				</div>
				</div>
	         {/* end of right column*/}

			</div>
			)
	}
}
function mapStateToProps(state){
	return {
		errorMessage:state.auth.errorMessage
	}
}


export default compose(
	reduxForm({form:'signin'}),
	connect(mapStateToProps,actions)
	)(Signin)