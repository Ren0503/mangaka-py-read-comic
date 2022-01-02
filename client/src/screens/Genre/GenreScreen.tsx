import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import { Menu } from 'components/core'
import { MangaCard } from 'components/manga'
import { Loader, Message } from 'components/shared'

import { detailGenre } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface MatchParams {
    id: string
}

interface GenreScreenProps extends RouteComponentProps<MatchParams> { }

const GenreScreen: FunctionComponent<GenreScreenProps> = ({
    match: {
        params: { id }
    }
}: GenreScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { genre, loading, error } = useSelector(
        (state: ReduxState) => state.genreDetail
    )

    useEffect(() => {
        dispatch(detailGenre(id))
    }, [id, dispatch])

    const genreDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!genre)
            return <Message variant='danger'>Genre Not Found</Message>
        else
            return (
                <>
                    <h3>{genre.name}</h3>
                    <p>{genre.description}</p>
                    <br />
                    <Row>
                        {genre.mangas.map((manga) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={manga._id}>
                                <MangaCard manga={manga} />
                            </Col>
                        ))}
                    </Row>
                </>
            )
    }

    return (
        <Row>
            <Col md={9}>
                {genreDetailDisplay()}
            </Col>
            <Col md={3}>
                <Menu isNavbar={false} />
            </Col>
        </Row>
    )
}

export default GenreScreen
