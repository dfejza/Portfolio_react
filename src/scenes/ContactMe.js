import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import MapIcon from 'material-ui-icons/Map';
import LocalPhoneIcon from 'material-ui-icons/LocalPhone';
import EmailIcon from 'material-ui-icons/Email';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import postRequests from '../components/post'
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  }),
});


class ContactMe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", message: "",open: false,direction: "down"};
        
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
    }

    sendMessage(){
        postRequests.sendContact(this.state);
        this.setState({ open: true });
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangeMessage(e) {
        this.setState({ message: e.target.value });
    }

	handleRequestClose = () => {
		this.setState({ open: false });
		this.setState({ name: "" });
		this.setState({ email: "" });
		this.setState({ message: "" });
	};

	render(){
		const classes = this.props.classes;
		return(
			<div className={classes.root}>
			      <Grid container justify='center' align='stretch'>
			        <Grid item xs={12} sm={12} md={7}>
				       <Paper id="contactMe" className={classes.root} elevation={4}>
			              <h3 > {this.props.store.data.page2.contact.question[this.props.store.lang]}</h3><br />
				          <Grid container justify='center' align='stretch'>
				              <Grid item xs={12} sm={4}>
			                        <br />
			                        <p><MapIcon />  Kanagawa, Japan</p>
			                        <p><LocalPhoneIcon />  +1-631-813-6041</p>
			                        <p><EmailIcon />  dardan.fejza@gmail.com</p> 
			                        <br />
				              </Grid>
				              <Grid item xs={12} sm={7}>
								<form className={classes.container} noValidate autoComplete="off">
						          <Grid container align='stretch'>
						              <Grid item xs={4}>
								        <TextField
								          id="name"
								          label={this.props.store.data.page2.contact.name[this.props.store.lang]}
								          className={classes.textField}
								          value={this.state.name}
								          onChange={this.handleChangeName}
								          margin="normal"
								        />
								      </Grid>
								      <Grid item xs={8}>
								        <TextField
								          id="name"
								          label={this.props.store.data.page2.contact.email[this.props.store.lang]}
								          className={classes.textField}
								          value={this.state.email}
								          onChange={this.handleChangeEmail}
								          fullWidth
								          margin="normal"
								        />
								      </Grid>
								      <Grid item xs={12}>
								        <TextField
								          id="name"
								          label={this.props.store.data.page2.contact.comment[this.props.store.lang]}
								          className={classes.textField}
								          value={this.state.message}
								          onChange={this.handleChangeMessage}
								          multiline
								          rowsMax="4"
								          fullWidth
								          margin="normal"
								        />
								      </Grid>
								      </Grid>
		                            <Button id="submitComment" onClick={this.sendMessage}>
		                                Submit
		                            </Button>
								</form>
				              </Grid>
				          </Grid>
				        </Paper> 
		          </Grid>
		        </Grid>
		        <Snackbar
		          open={this.state.open}
		          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
		          onRequestClose={this.handleRequestClose}
		          transition={<Slide direction="down" />}
		          autoHideDuration={3000}
		          SnackbarContentProps={{
		            'aria-describedby': 'message-id'
		          }}
		          message={
		          	<div style={{ background: "white", color: "black", height:"100%"}}>
			          	<img style={{width: "50%"}} src={require("./../assets/shake.gif")} alt="242x200"/>
			          	<span id="message-id">Message has been sent. Thanks.</span>
			        </div>
		          }
		        />
			</div>
		);
	}
}

ContactMe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactMe);