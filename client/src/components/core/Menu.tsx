import React, { useEffect } from 'react'
import { listGenres } from 'actions'
import { Loader, Message } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { Badge, Col, Container, Figure, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface MenuProps {
    isNavbar?: boolean
}

const Menu = ({ isNavbar = true }: MenuProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, genres } = useSelector(
        (state: ReduxState) => state.genreList
    )

    useEffect(() => {
        if (genres.length === 0) dispatch(listGenres())
    }, [dispatch, genres])

    const navGenresDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <Navbar className='menu' collapseOnSelect variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <NavDropdown title="Genres" id="collasible-nav-dropdown">
                                    <Row>
                                        {genres.map((genre) => (
                                            <Col md={6}>
                                                <Link to={`/genres/${genre._id}`}>
                                                    <NavDropdown.Item href="/genre">{genre.name}</NavDropdown.Item>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </NavDropdown>
                                <Nav.Link href="/about">For Male</Nav.Link>
                                <Nav.Link href="/contact">For Female</Nav.Link>
                                <Nav.Link href="/advanced-search">Search Adv</Nav.Link>
                                <Nav.Link href="/group">Group</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
    }

    const tagGenresDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <Figure>
                        {genres.map((genre) => (
                            <Link to={`/genre/${genre._id}`}>
                                <div className="tag" key={genre._id}>
                                    {genre.name}
                                </div>
                            </Link>
                        ))}
                    </Figure>
                </>
            )
    }

    return (
        <>
            {isNavbar ? (
                <>{navGenresDisplay()}</>
            ) : (
                <>{tagGenresDisplay()}</>
            )}
        </>
    )
}

export default Menu
