import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class HomePage extends React.Component {
    render() {
    	const classes = this.props.classes;
        return (
			<div className={classes.root}>
			      <Grid container className={classes.root} justify='center'
			            align='stretch'>
			        <Grid item xs={12} sm={11} md={10} lg={7} xl={7}>
			          <Grid
			            container
			            justify='center'
			            align='stretch'
			          >
							<Grid item xs={12} sm={7} >
					      		<Paper className={classes.root} elevation={4}>
									<ProfileCard />
								</Paper>
								<Paper className={classes.root} elevation={4}>
									<AboutMe />
								</Paper>
							</Grid>
							<Grid item xs={12} sm={5}>
								<Paper style={{height: "95%"}} className={classes.root} elevation={4}><WhatIDo /></Paper>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Paper className={classes.root} elevation={4}><LatestWork /></Paper>
								<Paper className={classes.root} elevation={4}><Contact /></Paper>
							</Grid>
			          </Grid>
			        </Grid>
		        </Grid>
            </div>
        );
    }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);


class ProfileCard extends React.Component {
    render() {
        return (
            <div className="profileCard">
			      <img id="img" className="img-circle" alt="" src={require("./../assets/me_wide.png")}/>
			      <div id="info">
            		<h2> <strong>Dardan Fejza</strong> </h2>
            		<h3> Software & Web Dev </h3>
            		<h4> Tokyo, Japan </h4>
			      </div>
			</div>
        );
    }
}
class AboutMe extends React.Component {
    render() {
        return (
            <div className="AboutMe">
			 	<p> <b>About Me </b> <br />I've always had a passion residing in all things electronics, be it software or hardware. A desire has driven me to learn, create, and improve in anything seen fit (from programming languages to actual language learning). Even after a full time job as a Software Engineer, I still find myself immersed in programming in my free time. That's the beauty of something you love.	
			 	</p>
			</div>
        );
    }
}
class WhatIDo extends React.Component {
    render() {
        return (
            <div className="WhatIDo" >
                <p><br /><br />
                <b>What I Do</b><br />
				<u>Front-end</u> : 
				Javascript, ES6, React, AngluarJS, Angluar, VueJS, JQuery<br />
				<u>Back-end</u> : 
				NodeJS, APIs, Routing, NoSQL, Python<br />
				<u>Programming languages</u> : 
				C++, C, Java<br />
				<u>Other</u> : 
				Unix, VHDL, MIPS<br />
				<u>Apps</u> : 
				Ionic<br />
				<u>Cloud</u> : 
				Google, Firebase<br />
				<u>E-Commerce</u> : 
				Shopify
			 	</p>

			</div>
        );
    }
}
class LatestWork extends React.Component {
    render() {
        return (
            <div className="LatestWork">
                <p><b>Latest Project</b>
			 	</p>
                	<VickiMorav/>
			</div>
        );
    }
}

class VickiMorav extends React.Component {
	render() {
		return(
			<div>
		        <img width="100%" alt="" src={require("./../assets/VickiMorav.png")} />
			</div>
		);
	}
}

class Contact extends React.Component {
	render() {
		return(
		    <Grid container>
		    	<Grid item xs={6} sm={3}>
					<a  href="mailto:dardan.fejza@gmail.com" ><h4><img width={24} alt="" src={require("./../assets/email.svg")}/><b> Email</b></h4></a>
				</Grid>
				<Grid item xs={6} sm={3}>
					<a  href="https://github.com/dfejza" ><h4><img width={24} alt="" src={require("./../assets/github.svg")}/><b> Github</b></h4></a>
				</Grid>
				<Grid item xs={6} sm={3}>
					<a  href="todo" ><h4><img width={24} alt="" src={require("./../assets/linkedin.svg")}/><b> LinkedIn</b></h4></a>
				</Grid>
				<Grid item xs={6} sm={3}>
					<a  href="skype:openbracket" ><h4><img width={24} alt="" src={require("./../assets/skype.svg")}/><b> Skype</b></h4></a>
				</Grid>
			</Grid>
		);
	}
}