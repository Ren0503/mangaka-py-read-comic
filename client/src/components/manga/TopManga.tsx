import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { Card, Image, ListGroup, Row, Col, Figure } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { listTopMangas } from 'actions'
import { AppDispatch } from 'store'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

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
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
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
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else
            return (
                <Slider {...settings}>
                    {mangas.map((manga) => (
                        <Card className='my-3 p-3 rounded'>
                            <Card.Img className="manga-img" src={manga.image} variant='top' height="350" />

                            <Card.Body>
                                <Link to={`/manga/${manga._id}`}>
                                    <Card.Title as='h5' className="title">
                                        <strong>{manga.name}</strong>
                                    </Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Slider>
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