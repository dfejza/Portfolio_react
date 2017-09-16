import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import React from 'react';

export default class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/aboutme"><a>dfejza</a></LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/"><NavItem>{this.props.store.data.navigation.home[this.props.store.lang]}</NavItem></IndexLinkContainer>
                        <LinkContainer to="/portfolio"><NavItem>{this.props.store.data.navigation.projects[this.props.store.lang]}</NavItem></LinkContainer>
                        <LinkContainer to="/aboutme"><NavItem>{this.props.store.data.navigation.aboutme[this.props.store.lang]}</NavItem></LinkContainer>
                        <NavDropdown title={this.props.store.data.navigation.sideprojects[this.props.store.lang]} id="basic-nav-dropdown">
                            <LinkContainer to="/chat"><NavItem>{this.props.store.data.navigation.chat[this.props.store.lang]}</NavItem></LinkContainer>
                            <LinkContainer to="/mangareader"><NavItem>{this.props.store.data.navigation.mangareader[this.props.store.lang]}</NavItem></LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                    <LinkContainer to="/login"><NavItem>{this.props.store.data.navigation.login[this.props.store.lang]}</NavItem></LinkContainer>
                    <NavDropdown title={this.props.store.data.selectorText[this.props.store.lang]} id="basic-nav-dropdown">
                        <MenuItem onSelect={this.props.store.changeEng}>ENG</MenuItem>
                        <MenuItem onSelect={this.props.store.changeJap}>日本語</MenuItem>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

