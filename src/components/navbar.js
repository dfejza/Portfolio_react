// import { FormControl, option } from "react-bootstrap"
// import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
// import { IndexLinkContainer } from 'react-router-bootstrap'
import React from "react";
// Material components
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import Button from "material-ui/Button";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/ListSubheader";
import HomeIcon from "material-ui-icons/Home";
import ViewHeadlineIcon from "material-ui-icons/ViewHeadline";
import PermMediaIcon from "material-ui-icons/PermMedia";
import ContactMailIcon from "material-ui-icons/ContactMail";
import AccountBoxIcon from "material-ui-icons/AccountBox";
import LoginDialogueButton from "./../components/login";
import Dialog, { DialogTitle } from "material-ui/Dialog";

const styles = {
  list: {
    width: 250,
    flex: "initial"
  },
  listFull: {
    width: "auto",
    flex: "initial"
  },
  small: {
    width: 72,
    height: 72,
    padding: 8
  }
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "eng",
      open: true,
      openLang: false,
      right: false
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClickOpenLang = () => {
    this.setState({
      openLang: true
    });
  };

  handleRequestCloseLang = value => {
    this.setState({ value: value, openLang: false });
    if (value === "eng") {
      this.props.changeEng();
    } else {
      this.props.changeJap();
    }
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const sideList = (
      <div>
        <List subheader={<ListSubheader>dfejza</ListSubheader>}>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={this.props.local.home[this.props.lang]} />
            </ListItem>
          </Link>

          <Link to="/projects">
            <ListItem button>
              <ListItemIcon>
                <PermMediaIcon />
              </ListItemIcon>
              <ListItemText
                primary={this.props.local.projects[this.props.lang]}
              />
            </ListItem>
          </Link>

          <Link to="/contact">
            <ListItem button>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText
                primary={this.props.local.contact[this.props.lang]}
              />
            </ListItem>
          </Link>
        </List>
      </div>
    );
    const bottomList = (
      <div>
        <List>
          {!this.props.authed && (
            <LoginDialogueButton
              onClose={this.toggleDrawer("right", false)}
              lang={this.props.lang}
              authed={this.props.authed}
              contact={this.props.loginLocal}
              text={this.props.local.login[this.props.lang]}
            />
          )}
          {this.props.authed && (
            <div>
              <Link to="/chat">
                <ListItem button>
                  <ListItemText
                    primary={this.props.local.chat[this.props.lang]}
                  />
                </ListItem>
              </Link>
              <Link to="/dashboard">
                <ListItem button>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={this.props.local.myaccount[this.props.lang]}
                  />
                </ListItem>
              </Link>
            </div>
          )}
        </List>
        <Button onClick={this.handleClickOpenLang}>
          {this.props.local.selectorText[this.props.lang]} :{" "}
          {this.props.local.language[this.props.lang]}
        </Button>
        <LanguageDialogueWrapped
          lang={this.props.lang}
          local={this.props.local}
          selectedValue={this.state.value}
          open={this.state.openLang}
          onClose={this.handleRequestCloseLang}
        />
      </div>
    );

    return (
      <div>
        <Button
          style={{ position: "fixed", top: 0, right: 0 }}
          onClick={this.toggleDrawer("right", true)}
        >
          <ViewHeadlineIcon className="App-logo" style={styles.small} />
        </Button>
        <Drawer
          anchor="right"
          open={this.state.right}
          width={300}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
          >
            {sideList}
          </div>
          <div
            style={{ position: "fixed", bottom: 0, backgroundColor: "white" }}
          >
            {bottomList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

class LanguageDialogue extends React.Component {
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onRequestClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>
          {this.props.local.selectlanguageheader[this.props.lang]}
        </DialogTitle>
        <div>
          <List>
            <ListItem
              button
              onClick={() => this.handleListItemClick("eng")}
              key="eng"
            >
              <ListItemText primary="English" />
            </ListItem>
            <ListItem
              button
              onClick={() => this.handleListItemClick("jap")}
              key="jap"
            >
              <ListItemText primary="日本語" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

LanguageDialogue.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const LanguageDialogueWrapped = withStyles(styles)(LanguageDialogue);

export default withStyles(styles)(NavigationBar);
