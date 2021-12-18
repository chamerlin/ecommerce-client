import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function TopNav( {handleLogout} ) {
    let navigate = useNavigate()
    return(
        <Navbar expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ECOMMERCE</Navbar.Brand>
                <Navbar.Collapse id="menu">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData') ?
                            <>
                                <Nav.Link as={Link} to="/cart">
                                    Cart
                                    <Badge bg="primary">0</Badge>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                <Nav.Link onClick={() => {
                                    navigate('/')
                                    handleLogout()
                                    }}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNav