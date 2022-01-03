import React, { useEffect, useState } from 'react'
import { Col, Row, Container, ButtonGroup, Button } from 'react-bootstrap'
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
import { MangaSkeleton } from 'components/skeleton'
import { MangaList } from 'types/manga'

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
    const [sortType, setSortType] = useState<string>('Newest');

    const dispatch = useDispatch<AppDispatch>()
    const { mangas, loading, error, page, pages } = useSelector(
        (state: ReduxState) => state.mangaList
    )

    useEffect(() => {
        dispatch(listMangas(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const handleSorting = () => {
        switch (sortType) {
            case 'Rating':
                return (a: MangaList, b: MangaList) => b.rating - a.rating
            case 'Views':
                return (a: MangaList, b: MangaList) => b.views - a.views
            case 'Newest':
                return (a: MangaList, b: MangaList) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
            case 'Oldest':
                return (a: MangaList, b: MangaList) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
            default:
                break
        }
    }

    const displayMangas = () => {
        if (loading) return <MangaSkeleton />
        else if (error) return <Message variant='danger'>{error}</Message>
        else
            return (
                <Row>
                    <Col md={9}>
                        <>
                            <h2>Latest Manga</h2>
                            <ButtonGroup className="text-right">
                                <Button onClick={() => setSortType('Rating')}>
                                    Rating
                                </Button>
                                <Button onClick={() => setSortType('Views')}>
                                    Views
                                </Button>
                                <Button onClick={() => setSortType('Newest')}>
                                    Newest
                                </Button>
                                <Button onClick={() => setSortType('Oldest')}>
                                    Oldest
                                </Button>
                            </ButtonGroup>
                            <Row>
                                {mangas
                                    ?.sort(handleSorting())
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
        <Container fluid>
            <h2>Browser Manga</h2>
            <TopManga isSidebar={false} />

            <Container>
                {displayMangas()}
            </Container>
        </Container>
    )
}

export default HomeScreen
