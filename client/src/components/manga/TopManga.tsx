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
    slidesToShow: 4,
    speed: 500,
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
                                <Col md={3}>
                                    <Image src={manga.image} width="50" />
                                </Col>
                                <Col md={9}>
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
                        <>
                            <div className="top-manga">
                                <img src={manga.image} />
                                <div className="content-manga">
                                    <h4 className="name">{manga.name}</h4>
                                    <p>{manga.description.substring(0, 60)}</p>
                                </div>
                            </div>
                        </>

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