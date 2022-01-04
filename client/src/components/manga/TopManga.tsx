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
import { MangaCard, Rating } from '.'

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 500,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 600,
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
                                <Col md={3}>
                                    <Link to={`manga/${manga._id}`}>
                                        <Image src={manga.image} width="50" />
                                    </Link>
                                </Col>
                                <Col md={9}>
                                    <strong>{manga.name}</strong>
                                    <p className="chapter"><i className='fas fa-eye'></i> {manga.views}</p>
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
                        <div className="book-card">
                            <div className="book-card__cover">
                                <div className="book-card__book">
                                    <div className="book-card__book-front">
                                        <img className="book-card__img" src={manga.image} />
                                    </div>
                                    <div className="book-card__book-back" />
                                    <div className="book-card__book-side" />
                                </div>
                            </div>
                            <div>
                                <div className="book-card__title">
                                    {manga.name}
                                </div>
                                <div className="book-card__author">
                                    <Rating value={manga.rating} />
                                </div>
                            </div>
                        </div>
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