import React from 'react';
import { Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
              <Grid id="AboutMeGrid">
			    <Row >
			    	<Col xsHidden md={1}></Col>
			      <Col xs={12} md={10}>
				      <Col xs={12} md={7}>
				      	<div className="AboutMeGridLeftSide">
							<ProfileCard />
							<AboutMe />
						</div>
					  </Col>
					  <Col xs={12} md={5}>
						<WhatIDo />
					  </Col>
					  <Col xs={12} md={12}>
						<LatestWork />
					  </Col>
					  <Col xs={12} md={12}>
						<Contact />
					  </Col>
				  </Col>

				</Row>
			  </Grid>
            </div>
        );
    }
}

class ProfileCard extends React.Component {
    render() {
        return (
            <div className="profileCard">
			      <Image id="img" src={require("./../assets/me_wide.png")} circle/>
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
            <div className="WhatIDo">
                <p>
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
		      <Col xs={12} md={12}>
		        <Image src={require("./../assets/VickiMorav.png")} responsive />
		      </Col>
			</div>
		);
	}
}

class Contact extends React.Component {
	render() {
		return(
			<div className="Contact">
					<Col xs={6} md={3}>
						<a  href="mailto:dardan.fejza@gmail.com" ><h4><Glyphicon glyph="envelope"/> <b> Email</b></h4></a>
					</Col>
					<Col xs={6} md={3}>
						<a  href="https://github.com/dfejza" ><h4><Glyphicon glyph="envelope"/> <b> Github</b></h4></a>
					</Col>
					<Col xs={6} md={3}>
						<a  href="todo" ><h4><Glyphicon glyph="envelope"/> <b> LinkedIn</b></h4></a>
					</Col>
					<Col xs={6} md={3}>
						<a  href="skype:openbracket" ><h4><Glyphicon glyph="envelope"/> <b> Skype</b></h4></a>
					</Col>
			</div>
		);
	}
}