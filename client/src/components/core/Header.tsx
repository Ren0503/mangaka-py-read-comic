import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { ReduxState } from 'types/ReduxState'
import { logout } from 'actions'
import { AppDispatch } from 'store'
import Search from './Search'

const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch<AppDispatch>()

    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)

    const logoutHandler = () => dispatch(logout(() => history.push('/')))

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>Mangakan</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Search />
                        <Nav className='ml-auto'>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <Link to='/profile'>
                                        <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Link to='/login'>
                                    <Nav.Link>
                                        Sign In
                                    </Nav.Link>
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
