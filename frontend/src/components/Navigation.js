import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../assets/css/Navigation.css';


const Navigation = (props) => {
    const [ state, dispatch ] = useContext(UserContext);
    return (
        <Navbar expand="lg" className="navigation">
            <Navbar.Brand href="#"> Post App </Navbar.Brand>
            <Navbar.Toggle aria-controls="navigation-collapse"/>
            <Navbar.Collapse id="navigation-collapse">
                <Nav className="ml-auto"> 
                        <NavDropdown title="USER" id="navigation" className="navigation-link">
                            {
                                state.isAuthenticated? (
                                    <NavDropdown.Item> 
                                        <LinkContainer to="/accounts/logout">
                                            <p> Logout </p> 
                                        </LinkContainer>
                                    </NavDropdown.Item>
                                ) : (
                                    <React.Fragment>
                                        <NavDropdown.Item> 
                                            <LinkContainer to="/accounts/register">
                                            <p> Register </p> 
                                            </LinkContainer>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item> 
                                            <LinkContainer to="/accounts/login">
                                                <p> Login </p> 
                                            </LinkContainer>
                                        </NavDropdown.Item>
                                    </React.Fragment>
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}




export default Navigation;
