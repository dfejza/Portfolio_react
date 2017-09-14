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
                        <IndexLinkContainer to="/"><NavItem>{this.props.store.data.navigation[0][this.props.store.lang]}</NavItem></IndexLinkContainer>
                        <LinkContainer to="/portfolio"><NavItem>{this.props.store.data.navigation[1][this.props.store.lang]}</NavItem></LinkContainer>
                        <LinkContainer to="/aboutme"><NavItem>{this.props.store.data.navigation[2][this.props.store.lang]}</NavItem></LinkContainer>
                        <LinkContainer to="/chat"><NavItem>{this.props.store.data.navigation[4][this.props.store.lang]}</NavItem></LinkContainer>
                        <LinkContainer to="/mangareader"><NavItem>{this.props.store.data.navigation[5][this.props.store.lang]}</NavItem></LinkContainer>
                    </Nav>
                    <Nav pullRight>
                    <LinkContainer to="/login"><NavItem>{this.props.store.data.navigation[3][this.props.store.lang]}</NavItem></LinkContainer>
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

