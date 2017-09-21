import { FormControl, option } from "react-bootstrap"
// import { LinkContainer } from 'react-router-bootstrap'
import { Link} from 'react-router-dom';
// import { IndexLinkContainer } from 'react-router-bootstrap'
import LoginComponent from './login'
import React from 'react';
import { slide as Menu } from 'react-burger-menu'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'eng'};

    this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
    this.setState({value: event.target.value});
    if(event === "eng"){
        this.props.store.changeEng();
    }
    else
    {
        this.props.store.changeJap();
    }
  }
    render() {
        return (
            <div>
                <Menu right>
                  <Link to="/"><h3>{this.props.store.data.navigation.home[this.props.store.lang]}</h3></Link>
                  <div className="Other">
                      <Link to="/chat"><h3>{this.props.store.data.navigation.chat[this.props.store.lang]}</h3></Link>
                      <Link to="/mangareader"><h3>{this.props.store.data.navigation.mangareader[this.props.store.lang]}</h3></Link>
                      {
                      !this.props.authed &&
                      <LoginComponent lang={this.props.store.lang} data={this.props.store.data} authed={this.props.authed}/>
                      }
                      {
                      this.props.authed &&
                      <Link to="/dashboard"><h3>{this.props.store.data.navigation.myaccount[this.props.lang]}</h3></Link>
                      }
                      <FormControl componentClass="select" value={this.state.value} onChange={this.handleChange} placeholder="eng">
                        <option value="eng">ENG</option>
                        <option value="jap">日本語</option>
                      </FormControl>
                  </div>
                </Menu>
            </div>
        );
    }
}