import React, { useEffect } from 'react'
import { Carousel, Image, ListGroup, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { listTopMangas } from 'actions'
import { AppDispatch } from 'store'

interface TopMangaProps {
    isSidebar: boolean
}

const TopManga = ({ isSidebar = true }: TopMangaProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, mangas } = useSelector(
        (state: ReduxState) => state.mangaTop
    )
    useEffect(() => {
        if (mangas.length === 0) dispatch(listTopMangas())
    }, [dispatch, mangas])

    const listMangasDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <ListGroup>
                    <h3>Top Manga</h3>
                    {mangas.map((manga) => (
                        <ListGroup.Item key={manga._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={manga.image} width="50" />
                                </Col>
                                <Col md={10}>
                                    <strong>{manga.name}</strong>
                                    <p>{manga.views}</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )
    }

    const slideMangasDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <Carousel pause='hover' className='bg-dark'>
                    {mangas.map((manga) => (
                        <Carousel.Item key={manga._id}>
                            <Link to={`/manga/${manga._id}`}>
                                <Image src={manga.image} alt={manga.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>
                                        {manga.name}
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    }

    return (
        <>
            {isSidebar ? (
                <>{listMangasDisplay()}</>
            ) : (
                <>{slideMangasDisplay()}</>
            )}
        </>
    )
}

export default TopManga