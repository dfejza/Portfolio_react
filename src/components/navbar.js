// import { FormControl, option } from "react-bootstrap"
// import { LinkContainer } from 'react-router-bootstrap'
import { Link} from 'react-router-dom';
// import { IndexLinkContainer } from 'react-router-bootstrap'
import LoginComponent from './login'
import React from 'react';
// Material components
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import HomeIcon from 'material-ui-icons/Home';
import ViewHeadlineIcon from 'material-ui-icons/ViewHeadline';
import PermMediaIcon from 'material-ui-icons/PermMedia';
import ContactMailIcon from 'material-ui-icons/ContactMail';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Divider from 'material-ui/Divider';


import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

const styles = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
  small: {
    width: 72,
    height: 72,
    padding: 8,
  },
};


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.  state = {
      value: 'eng',
      open: true,
      openLang: false,
      right: false,
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClickOpenLang = () => {
    this.setState({
      openLang: true,
    });
  };

  handleRequestCloseLang = value => {
    this.setState({ value: value, openLang: false });
    if(value === "eng"){
        this.props.store.changeEng();
    }
    else
    {
        this.props.store.changeJap();
    }
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

    render() {
      const classes = this.props.classes;
      const sideList = (
        <div>
          <List subheader={<ListSubheader>dfejza</ListSubheader>}>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.store.data.navigation.home[this.props.store.lang]} />
              </ListItem>
            </Link>

            <Link to="/projects">
              <ListItem button>
                <ListItemIcon>
                  <PermMediaIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.store.data.navigation.projects[this.props.store.lang]} />
              </ListItem>
            </Link>

            <Link to="/contact">
              <ListItem button>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.store.data.navigation.contact[this.props.store.lang]} />
              </ListItem>
            </Link>

          </List>
        </div>
      );
      const bottomList = (
        <div>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={this.props.store.data.navigation.login[this.props.store.lang]} />
            </ListItem>
          </List>
          <Button onClick={this.handleClickOpenLang}>{this.props.store.data.selectorText[this.props.store.lang]} : {this.props.store.data.language[this.props.store.lang]}</Button>
          <LanguageDialogueWrapped
            selectedValue={this.state.value}
            open={this.state.openLang}
            onRequestClose={this.handleRequestCloseLang}
          />
        </div>
      );

        return (
            <div>
                <Button style={{position: 'fixed' ,top: 0,right: 0}} onClick={this.toggleDrawer('right', true)}>
                  <ViewHeadlineIcon style={styles.small}/>
                </Button>
                <Drawer
                  anchor="right"
                  open={this.state.right}
                  width={300}
                  onRequestClose={this.toggleDrawer('right', false)}
                >
                  <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}>
                    {sideList}
                  </div>
                  <div style={{position: 'fixed' ,bottom: 0, backgroundColor: 'white'}}>
                    {bottomList}
                  </div>
                </Drawer>
            </div>
        );
    }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


class LanguageDialogue extends React.Component {
  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const { classes, onRequestClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Select a language</DialogTitle>
        <div>
          <List>
              <ListItem button onClick={() => this.handleListItemClick("eng")} key="eng">
                <ListItemText primary="English" />
              </ListItem>
              <ListItem button onClick={() => this.handleListItemClick("jap")} key="jap">
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
  selectedValue: PropTypes.string,
};

const LanguageDialogueWrapped = withStyles(styles)(LanguageDialogue);


export default withStyles(styles)(NavigationBar);


                // <Menu right>
                //   <Link to="/"><h3>{this.props.store.data.navigation.home[this.props.store.lang]}</h3></Link>
                //   <div className="Other">
                //       <Link to="/chat"><h3>{this.props.store.data.navigation.chat[this.props.store.lang]}</h3></Link>
                //       <Link to="/mangareader"><h3>{this.props.store.data.navigation.mangareader[this.props.store.lang]}</h3></Link>
                //       {
                //       !this.props.authed &&
                //       <LoginComponent lang={this.props.store.lang} data={this.props.store.data} authed={this.props.authed}/>
                //       }
                //       {
                //       this.props.authed &&
                //       <Link to="/dashboard"><h3>{this.props.store.data.navigation.myaccount[this.props.lang]}</h3></Link>
                //       }
                //       <FormControl componentClass="select" value={this.state.value} onChange={this.handleChange} placeholder="eng">
                //         <option value="eng">ENG</option>
                //         <option value="jap">日本語</option>
                //       </FormControl>
                //   </div>
                // </Menu>

