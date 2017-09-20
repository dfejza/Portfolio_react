import React from "react";
import { Button } from "react-bootstrap"
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

export default class Dashboard extends React.Component{
	constructor(props) {
		super(props);
		console.log(firebaseAuth());
	}
	logOut =() =>{
		logout();
	}
	render(){
		return(
			<div> 
				<h2>Welcome to your own personal space {firebaseAuth().currentUser.email}</h2> 
				<h2>Features charoming soon...</h2> 
				<p></p>
				<Button onClick={this.logOut}>Log Out</Button>
			</div>
		);
	}
}