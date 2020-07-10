import React,{Component} from 'react'
import {Link } from 'react-router-dom'

import {connect} from 'react-redux'

import * as actions from '../redux/actions/index.js' 

 class Header extends Component{
 	constructor(props){
 		super(props)
 			this.signOut=this.signOut.bind(this)
 		
 	}
 	signOut(){
       console.log('signout got called')
       this.props.signout()
 	}
	render(){
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom:'30px'}}>
			<Link to ='/'className="navbar-brand">Pnote</Link>
		   {/* the collapse ensures that the list items do not show on a small screen*/}

			<div className="collapse navbar-collapse">
		 {/*on the left of the navbar*/}

			<ul className="navbar-nav mr-auto">
			<li className="nav-item">
			<Link to='/dashboard' className="nav-link">Dashboard</Link>
			</li>
			</ul>

		 {/*on the right of the navbar*/}
		 <ul className="nav navbar-nav ml-auto">
		 {!this.props.isAuth ? 
		 	[<li className="nav-item" key='signup'>
		    <Link to='/signup' className="nav-link">SignUp</Link>
		  </li>,
		   <li className="nav-item" key='signin'>
		    <Link to='/signin' className="nav-link">SignIn</Link>
		  </li>]
		  :null
		 }
		 {this.props.isAuth ?
		 <li className="nav-item">
		    <Link to='/' className="nav-link"onClick={this.signOut}>SignOut</Link>
		  </li>
		  :null}


		 </ul>

			</div>
			</nav>
			)
	}
}

function mapStateToProps(state){
return {
	isAuth:state.auth.isAuthenticated
}
}

export default connect(mapStateToProps,actions)(Header)