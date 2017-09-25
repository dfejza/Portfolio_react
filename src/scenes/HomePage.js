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
              <Grid item xs={12} sm={11} md={10} lg={7}>
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
                <Paper style={{height: "76%"}} className={classes.root} elevation={4}><WhatIDo /></Paper>
                <Paper className={classes.root} elevation={4}><Contact /></Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.root} elevation={4}><LatestWork /></Paper>
                
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
            		<h2> <b>Dardan Fejza</b> </h2>
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
			 	<h3><b>About Me </b></h3><p><br />I've always had a passion residing in all things electronics, be it software or hardware. A desire has driven me to learn, create, and improve in anything seen fit (from programming languages to actual language learning). Even after a full time job as a Software Engineer, I still find myself immersed in programming in my free time. That's the beauty of something you love.	
			 	</p>
			</div>
        );
    }
}
class WhatIDo extends React.Component {
    render() {
        return (
            <div className="WhatIDo" >
                <h3><b>What I Do</b></h3><p>
                <br />
				<b>Front-end</b>: 
				Javascript, ES6, React, AngluarJS, Angluar, VueJS, JQuery<br />
				<b>Back-end</b>: 
				NodeJS, APIs, Routing, NoSQL, Python<br />
				<b>Programming languages</b>: 
				C++, C, Java<br />
				<b>Other</b>: 
				Unix, VHDL, MIPS<br />
				<b>Apps</b>: 
				Ionic<br />
				<b>Cloud</b>: 
				Google, Firebase<br />
				<b>E-Commerce</b>: 
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
                <h3><b>Latest Project</b></h3>
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
	      <Grid container justify='center'
	            align='stretch'>
	        <Grid item xs={12}>
	          <Grid
	            container
	            justify='center'
	            align='stretch'
	          >
		    	<Grid item xs={6} sm={2}>
					<a  href="mailto:dardan.fejza@gmail.com" ><img width={28} alt="" src={require("./../assets/email.svg")}/></a>
				</Grid>
				<Grid item xs={6} sm={2}>
					<a  href="https://github.com/dfejza" ><img width={28} alt="" src={require("./../assets/github.svg")}/></a>
				</Grid>
				<Grid item xs={6} sm={2}>
					<a  href="todo" ><img width={28} alt="" src={require("./../assets/linkedin.svg")}/></a>
				</Grid>
				<Grid item xs={6} sm={2}>
					<a  href="skype:openbracket" ><img width={28} alt="" src={require("./../assets/skype.svg")}/></a>
				</Grid>
			</Grid>
			</Grid>
			</Grid>
		);
	}
}