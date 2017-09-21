import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import LoginComponent from './login'
import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title={this.props.store.data.selectorText[this.props.store.lang]} id="basic-nav-dropdown">
                                <MenuItem onSelect={this.props.store.changeEng}>ENG</MenuItem>
                                <MenuItem onSelect={this.props.store.changeJap}>日本語</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown title={this.props.store.data.navigation.sideprojects[this.props.store.lang]} id="basic-nav-dropdown">
                                <LinkContainer to="/chat"><NavItem>{this.props.store.data.navigation.chat[this.props.store.lang]}</NavItem></LinkContainer>
                                <LinkContainer to="/mangareader"><NavItem>{this.props.store.data.navigation.mangareader[this.props.store.lang]}</NavItem></LinkContainer>
                            </NavDropdown>

                            {
                            !this.props.authed &&
                            <LoginComponent lang={this.props.store.lang} data={this.props.store.data} authed={this.props.authed}/>
                            }
                           {
                            this.props.authed &&
                            <LinkContainer to="/dashboard"><NavItem>{this.props.store.data.navigation.myaccount[this.props.store.lang]}</NavItem></LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

{
    /*
                    <NavDropdown title={this.props.store.data.navigation.sideprojects[this.props.store.lang]} id="basic-nav-dropdown">
                    <LinkContainer to="/chat"><NavItem>{this.props.store.data.navigation.chat[this.props.store.lang]}</NavItem></LinkContainer>
                    <LinkContainer to="/mangareader"><NavItem>{this.props.store.data.navigation.mangareader[this.props.store.lang]}</NavItem></LinkContainer>
                    </NavDropdown>

                    {
                    !this.props.authed &&
                    <LoginComponent lang={this.props.store.lang} data={this.props.store.data} authed={this.props.authed}/>
                    }
                   {
                    this.props.authed &&
                    <LinkContainer to="/dashboard"><NavItem>{this.props.store.data.navigation.myaccount[this.props.store.lang]}</NavItem></LinkContainer>
                    }
                    <NavDropdown title={this.props.store.data.selectorText[this.props.store.lang]} id="basic-nav-dropdown">
                        <MenuItem onSelect={this.props.store.changeEng}>ENG</MenuItem>
                        <MenuItem onSelect={this.props.store.changeJap}>日本語</MenuItem>
                    </NavDropdown>

    */
}