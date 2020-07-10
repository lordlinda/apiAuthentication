import React,{Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../redux/actions/index.js'
class DashBoard extends Component{
	async componentDidMount(){
			await this.props.getSecret()
		}
	render(){

		return(
			<div>
			This is DashBoard
			<br />
			<h3>{this.props.data}</h3>
			</div>
			)
	}
}
function mapStateToProps(state){
return {
	data:state.data.secret
}
}
export default connect(mapStateToProps,actions)(DashBoard)