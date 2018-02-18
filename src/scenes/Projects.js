import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Collapse from "material-ui/transitions/Collapse";
import Tooltip from "material-ui/Tooltip";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 64,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3
  }),
  card: {
    maxWidth: 500,
    minHeight: 500,
    maxHeight: 600,
    marginTop: 16,
    marginRight: 16
  },
  cardText:{
    fontSize: "1.3em"
  },
  media: {
    height: 250,
    // borderBottom: ".5px solid rgba(0, 0, 0, .5)"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  flexGrow: {
    flex: "1 1 auto"
  }
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
          <Grid item xs={12} sm={11} md={9} lg={9}>
            <Grid container align="stretch" justify="center">
              {this.props.local.map((project, index) => (
                <Grid key={index} item sm={6} md={4}>
                  <ProjectCardWrapped lang={this.props.lang} local={project} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class ProjectCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const classes = this.props.classes;
    return (
      <Tooltip title="Expand" placement="top">
        <Card className={classes.card} onClick={this.handleExpandClick}>
          <Collapse
            in={!this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardMedia
              className={classes.media}
              image={require("./../assets/" + this.props.local.image)}
              title="Contemplative Reptile"
            />
          </Collapse>
          <CardContent>
            <h2>
              {this.props.local.title[this.props.lang]}
            </h2>
            <hr/>
            <p className={classes.cardText}>
              {this.props.local.subtitle[this.props.lang]}
            </p>
          </CardContent>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>
              <ul>
                {this.props.local.detailedlist.map((project, index) => (
                  <li key={index}>{project[this.props.lang]}</li>
                ))}
              </ul>
              <a href={this.props.local.link}>
                <img
                  className="projectGithub"
                  width={28}
                  alt=""
                  src={require("./../assets/github.svg")}
                />
              </a>
            </CardContent>
          </Collapse>
        </Card>
      </Tooltip>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

const ProjectCardWrapped = withStyles(styles)(ProjectCard);
export default withStyles(styles)(Projects);
