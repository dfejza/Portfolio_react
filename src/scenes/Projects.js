import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 64,
        paddingBottom: 32,
        marginTop: theme.spacing.unit * 3
    }),
    card: {
        maxWidth: 400,
        minHeight: 300,
        marginTop: 32,
        marginRight: 16
    },
    media: {
        height: 150,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
});

class Projects extends React.Component {

    render() {
        const classes = this.props.classes;
        return (
            <div>
              <Grid
                container
                className={classes.root}
                justify="center"
                align="stretch"
              >
                <Grid item xs={12} sm={11} md={9} lg={8}>
                  <Grid container align="stretch">
                    <Grid item sm={12} md={6}>
                      <ProjectCardVickiMoravWrapped />
                    </Grid> 
                    <Grid item sm={12} md={6}>
                      <ProjectCardWebsiteWrapped />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <ProjectCardChallongerWrapped />
                    </Grid> 
                  </Grid>
                </Grid>
              </Grid>
            </div>
        );
    }
}

class ProjectCardVickiMorav extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const classes = this.props.classes;
        return (
            <Tooltip
              title="Expand"
              placement="top"
            >
              <Card className={classes.card} onClick={this.handleExpandClick}>
                <Collapse in={!this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardMedia
                    className={classes.media}
                    image={require("./../assets/vickimoravprojectcard.png")}
                    title="Contemplative Reptile"
                  />
                </Collapse>
                <CardContent>
                  <Typography type="headline" component="h2">
                    VickiMorav
                  </Typography>
                  <Typography component="p">
                    eCommerce mobile app for Android/IOS. Written in Angular, deployed on both Google Play Store and IOS store.
                  </Typography>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardContent>
                    <ul>
                      <li>Written in Angular</li>
                      <li>Shoppify backend</li>
                      <li>Ionic Framework</li>
                      <li>GraphQL, Redux</li>
                      <li>Developed & designed the entire application</li>
                    </ul>
                  </CardContent>
                </Collapse>
              </Card>
            </Tooltip>
        );
    }
}

class ProjectCardWebsite extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const classes = this.props.classes;
        return (
            <Tooltip
              title="Expand"
              placement="top"
            >
              <Card className={classes.card} onClick={this.handleExpandClick}>
                <Collapse in={!this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardMedia
                    className={classes.media}
                    image={require("./../assets/websiteprojectcard.png")}
                    title="Contemplative Reptile"
                  />
                </Collapse>
                <CardContent>
                  <Typography type="headline" component="h2">
                    Website Portfolio
                  </Typography>
                  <Typography component="p">
                    Presentation of myself & accomplishments, as well as an interface to learn web technologies.
                  </Typography>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardContent>
                    <ul>
                      <li>Frontend: React, Redux, Materials</li>
                      <li>Backend: Firebase, Nodejs (Express)</li>
                      <li>Platform for sideprojects (login to see them)</li>
                    </ul>
                  </CardContent>
                </Collapse>
              </Card>
            </Tooltip>
        );
    }
}

class ProjectCardChallonger extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const classes = this.props.classes;
        return (
            <Tooltip
              title="Expand"
              placement="top"
            >
              <Card className={classes.card} onClick={this.handleExpandClick}>
                <Collapse in={!this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardMedia
                    className={classes.media}
                    image={require("./../assets/challonger.png")}
                    title="Contemplative Reptile"
                  />
                </Collapse>
                <CardContent>
                  <Typography type="headline" component="h2">
                    Challonger
                  </Typography>
                  <Typography component="p">
                    A Tournament bracket simulator, providing a descriptive and easy to use interface for each match. Written in C++ with QT
                  </Typography>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <CardContent>
                    <ul>
                      <li>C++ with QT GUI</li>
                      <li>Backend: challonge.com, a tournament management website.</li>
                      <li>Uses API calls via CURL to interface with the backend.</li>
                      <li>Work In Progress</li>
                    </ul>
                  </CardContent>
                </Collapse>
              </Card>
            </Tooltip>
        );
    }
}


Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ProjectCardVickiMoravWrapped = withStyles(styles)(ProjectCardVickiMorav);
const ProjectCardWebsiteWrapped = withStyles(styles)(ProjectCardWebsite);
const ProjectCardChallongerWrapped = withStyles(styles)(ProjectCardChallonger);
export default withStyles(styles)(Projects);