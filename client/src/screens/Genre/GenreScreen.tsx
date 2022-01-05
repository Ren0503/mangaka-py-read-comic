import React, { FunctionComponent, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row } from 'react-bootstrap'

import { Menu } from 'components/core'
import { MangaCard } from 'components/manga'
import { Loader, Message } from 'components/shared'

import { detailGenre } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface MatchParams {
    genreId: string
}

interface GenreScreenProps extends RouteComponentProps<MatchParams> { }

const GenreScreen: FunctionComponent<GenreScreenProps> = ({
    match: {
        params: { genreId }
    }
}: GenreScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { genre, loading, error } = useSelector(
        (state: ReduxState) => state.genreDetail
    )

    useEffect(() => {
        dispatch(detailGenre(genreId))
    }, [genreId, dispatch])

    const genreDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!genre)
            return <Message variant='danger'>Genre Not Found</Message>
        else
            return (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href='/'>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {genre.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
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
