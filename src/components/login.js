import React from "react";
import { Form, FormGroup, FormControl, Col, Button, OverlayTrigger, Popover, NavItem } from 'react-bootstrap';
import { login, resetPassword, auth } from '../helpers/auth'

function setErrorMsgLogin(error) {
  return {
    loginMessage: error
  }
}
function setErrorMsgRegister(error) {
  return {
    registerError: error.message
  }
}

export default class LoginComponent extends React.Component{
	state = { loginMessage: null, registerError: null}

	handleSubmitLogin = (e) => {
		e.preventDefault()
		console.log(this.email.value)
		console.log(this.pw.value)
		login(this.email.value, this.pw.value)
		  .catch((error) => {
		      this.setState(setErrorMsgLogin('Invalid username/password.'))
		    })
	}
	handleSubmitRegister = (e) => {
		e.preventDefault()
		auth(this.email.value, this.pw.value)
		  .catch(e => this.setState(setErrorMsgRegister(e)))
	}

	resetPassword = () => {
		resetPassword(this.email.value)
		  .then(() => this.setState(setErrorMsgLogin(`Password reset email sent to ${this.email.value}.`)))
		  .catch((error) => this.setState(setErrorMsgLogin(`Email address not found.`)))
	}


	render(){
		var popoverClickRootClose = (
		  <Popover id="popover-trigger-click-root-close">
		      <Form horizontal className="loginMenu">
		        <FormGroup controlId="formHorizontalEmail">
		          <Col md={12} sm={10}>
		            <FormControl type="email" inputRef={(email) => this.email = email} placeholder={this.props.data.page2.contact.email[this.props.lang]} />
		          </Col>
		        </FormGroup>

		        <FormGroup controlId="formHorizontalPassword">
		          <Col md={12} sm={10}>
		            <FormControl type="password" inputRef={(pw) => this.pw = pw} placeholder={this.props.data.page2.contact.password[this.props.lang]} />
		          </Col>
		        </FormGroup>

		        <FormGroup>
		          <Col md={6} sm={6}>
		            <Button id="regSignin" type="submit" value="signup" onClick={this.handleSubmitRegister}>
		              {this.props.data.page2.contact.signUp[this.props.lang]}
		            </Button>
		          </Col>
		          <Col md={6} sm={6}>
		            <Button id="regSignin" type="submit" value="signin" onClick={this.handleSubmitLogin}>
		              {this.props.data.page2.contact.signIn[this.props.lang]}
		            </Button>
		          </Col>
		          <hr /><hr />
		          <Col md={12} sm={12}>
		            <Button id="googleSignin" type="submit">
		              {this.props.data.page2.contact.google[this.props.lang]}
		            </Button>
		          </Col>
		          <Col md={12} sm={12}>
		            <Button id="facebookSignin" type="submit">
		              {this.props.data.page2.contact.facebook[this.props.lang]}
		            </Button>
		          </Col>
		        </FormGroup>
				{
				this.state.loginMessage &&
				<div className="alert alert-danger" role="alert">
				  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span className="sr-only">Error:</span>
				  &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
				</div>
				}
				{
				this.state.registerError &&
				<div className="alert alert-danger" role="alert">
				  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span className="sr-only">Error:</span>
				  &nbsp;{this.state.registerError}
				</div>
				}
		      </Form>
		  </Popover>
		);
		return(
            <OverlayTrigger className="loginMenu" trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
              <NavItem>{this.props.data.navigation.login[this.props.lang]}</NavItem>
            </OverlayTrigger>
		);
	}
}