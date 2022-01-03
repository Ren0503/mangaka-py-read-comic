import React, { useEffect, useState } from 'react'
import { useQuery } from 'hooks/useQuery'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container, Button } from 'react-bootstrap'

import {
    Loader,
    Message,
    Paginate,
} from 'components/shared'
import { MangaCard, TopManga } from 'components/manga'

import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { searchAdv } from 'actions'

interface MatchParams {
    pageNumber: string
}
interface SearchScreenProps extends RouteComponentProps<MatchParams> { }

const SearchScreen = ({
    match: {
        params: { pageNumber: pgNumber }
    }
}: SearchScreenProps) => {
    const query = useQuery()
    const pageNumber = pgNumber || '1'

    const keyword = query.get('keyword') || ''
    const dispatch = useDispatch<AppDispatch>()
    const { mangas, loading, error, page, pages } = useSelector(
        (state: ReduxState) => state.advSearch
    )

    useEffect(() => {
        dispatch(searchAdv(keyword, pageNumber))
    }, [dispatch, query, pageNumber])

    const displayMangas = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else
            return (
                <Row>
                    <Col md={9}>
                        <>
                            <div>
                                <h2>Latest Manga</h2>
                            </div>
                            <Row>
                                {mangas
                                    .map((manga) => (
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
        <div>
            <Container>
                {displayMangas()}
            </Container>
        </div>
    )
}

export default SearchScreen
