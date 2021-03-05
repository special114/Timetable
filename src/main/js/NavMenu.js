import { LinkContainer } from 'react-router-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";

import AuthService from "./services/auth.service";


function NavMenu(props) {
    const user = AuthService.getCurrentUser();

    return (
        <div>
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/home">
                <Navbar.Brand>Home</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/show-timetable">
                        <Nav.Link onSelect={() => props.onSelect(1)}>Groups</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/show-timetable">
                        <Nav.Link onSelect={() => props.onSelect(2)}>Teachers</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/show-timetable">
                        <Nav.Link onSelect={() => props.onSelect(3)}>Rooms</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <LinkContainer to={user ? "/home" : "/login"}>
                        <Nav.Link
                                onSelect={user ? () => props.onSelect(4) : null}>
                            {user ? "Log out" : "Log in"}
                        </Nav.Link>
                    </LinkContainer>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default NavMenu;