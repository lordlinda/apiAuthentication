import React,{Component} from 'react'

export default class CustomInput extends Component{
	render(){
		const {input:{value,onChange}} = this.props
		return (
<div className="form-group">
{/*this custon component receives values from Field as props*/}
<label>{this.props.label}</label>
<input
className="form-control"
name={this.props.name}
placeholder={this.props.placeholder}
type={this.props.type}
value={value}
onChange={onChange}
 />
</div>
			)
	}
}
