import React, { useEffect } from 'react'
import { listGenres } from 'actions'
import { Loader, Message } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, genres } = useSelector(
        (state: ReduxState) => state.genreList
    )
    useEffect(() => {
        if (genres.length === 0) dispatch(listGenres())
        console.log(genres)
    }, [dispatch, genres])

    const genresDisplay = () => {
        if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
            return (
                <NavDropdown title="Genres" id="collasible-nav-dropdown">
                    {genres.map((genre) => (
                        <Link to={`/genres/${genre._id}`}>
                            <NavDropdown.Item href="/genre">{genre.name}</NavDropdown.Item>
                        </Link>
                    ))}
                </NavDropdown>
            )
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {genresDisplay()}
                            <Nav.Link href="/about">About</Nav.Link>

                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Menu
