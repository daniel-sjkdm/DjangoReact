import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/Navigation.css';


const Navigation = (props) => {
    return (
        <Navbar expand="lg" className="navigation">
            <Navbar.Brand href="#"> Post App </Navbar.Brand>
            <Navbar.Toggle aria-controls="navigation-collapse"/>
            <Navbar.Collapse id="navigation-collapse">
                <Nav className="ml-auto"> 
                        <Link to="/">
                            <Nav.Link className="navigation-link">
                                Home
                            </Nav.Link>
                        </Link> 
                        <NavDropdown title="User" id="navigation">
                            <NavDropdown.Item> 
                                <Link to="/register">
                                    Register  
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#"> 
                                <Link to="/login">
                                    Login 
                                </Link>
                            </NavDropdown.Item>
                                <Link to="/logout">
                                    <NavDropdown.Item href="#"> Logout </NavDropdown.Item>
                                </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}




export default Navigation;
