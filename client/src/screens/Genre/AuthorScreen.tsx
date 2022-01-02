import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import { Menu } from 'components/core'
import { MangaCard } from 'components/manga'
import { Loader, Message } from 'components/shared'

import { detailAuthor } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface MatchParams {
    id: string
}

interface AuthorScreenProps extends RouteComponentProps<MatchParams> { }

const AuthorScreen: FunctionComponent<AuthorScreenProps> = ({
    match: {
        params: { id }
    }
}: AuthorScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { author, loading, error } = useSelector(
        (state: ReduxState) => state.authorDetail
    )

    useEffect(() => {
        dispatch(detailAuthor(id))
    }, [id, dispatch])

    const authorDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!author)
            return <Message variant='danger'>Author Not Found</Message>
        else
            return (
                <>
                    <h3>{author.name}</h3>
                    <br />
                    <Row>
                        {author.mangas.map((manga) => (
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
                {authorDetailDisplay()}
            </Col>
            <Col md={3}>
                <Menu isNavbar={false} />
            </Col>
        </Row>
    )
}

export default AuthorScreen
