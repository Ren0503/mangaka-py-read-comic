import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import {
    Loader,
    Message,
    Paginate,
} from 'components/shared'
import { MangaCard, TopManga } from 'components/manga'

import { AppDispatch } from 'store'
import { listMangas } from 'actions'
import { ReduxState } from 'types/ReduxState'

interface MatchParams {
    keyword: string
    pageNumber: string
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> { }

const HomeScreen = ({
    match: {
        params: { keyword, pageNumber: pgNumber }
    }
}: HomeScreenProps) => {
    const pageNumber = pgNumber || '1'

    const dispatch = useDispatch<AppDispatch>()
    const { mangas, loading, error, page, pages } = useSelector(
        (state: ReduxState) => state.mangaList
    )

    useEffect(() => {
        dispatch(listMangas(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const displayProducts = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else
            return (
                <Row>
                    <Col md={9}>
                        <>
                            <Row>
                                {mangas.map((manga) => (
                                    <Col sm={12} md={6} lg={4} xl={3} key={manga._id}>
                                        <MangaCard manga={manga} />
                                    </Col>
                                ))}
                            </Row>
                            {pages && page && (
                                <Paginate
                                    page={page}
                                    pages={pages}
                                    keyword={keyword ? keyword : ''}
                                />
                            )}
                        </>
                    </Col>
                    <Col md={3}>
                        <TopManga isSidebar={true} />
                    </Col>
                </Row>
            )
    }

    return (
        <>
            <h1>Latest Manga</h1>
            <TopManga isSidebar={false} />

            {displayProducts()}
        </>
    )
}

export default HomeScreen
