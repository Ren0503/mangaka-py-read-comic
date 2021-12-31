import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { AppDispatch } from 'store'
import { detailManga, createMangaComment } from 'actions'
import { MangaCreateCommentActionTypes } from 'types/manga'

interface MatchParams {
    id: string
}

interface MangaScreenProps extends RouteComponentProps<MatchParams> { }

const MangaScreen: FunctionComponent<MangaScreenProps> = ({
    match: {
        params: { id }
    },
    history
}: MangaScreenProps) => {
    const [body, setBody] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { manga, loading, error } = useSelector(
        (state: ReduxState) => state.mangaDetail
    )
    const {
        error: errorMangaComment,
        loading: loadingMangaComment,
        success: successMangaComment
    } = useSelector((state: ReduxState) => state.mangaCreateComment)

    useEffect(() => {
        if (successMangaComment)
            dispatch({
                type: MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_RESET
            })

        dispatch(detailManga(id))
    }, [id, dispatch, successMangaComment])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createMangaComment(id, { body }))
    }

    const mangaDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!manga)
            return <Message variant='danger'>Manga Not Found</Message>
        else
            return (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={manga.image} alt={manga.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{manga.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>Status: ${manga.status}</ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {manga.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                {manga.chapters.map((chapter) => (
                                    <ListGroup.Item>
                                        {chapter.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={6}>
                            <h2>Comments</h2>
                            {manga.comments.length === 0 && <Message>No Comment</Message>}
                            <ListGroup variant='flush'>
                                {userInfo &&
                                    <ListGroup.Item>
                                        <h2>Writer a viewer comment</h2>
                                        {errorMangaComment && (
                                            <Message variant='danger'>{errorMangaComment}</Message>
                                        )}
                                        {loadingMangaComment && <Loader />}
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Write your comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    rows={3}
                                                    value={body}
                                                    onChange={(e) =>
                                                        setBody(e.target.value)
                                                    }></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </ListGroup.Item>
                                }

                                {manga.comments.map((comment) => (
                                    <ListGroup.Item key={comment._id}>
                                        <strong>{comment.name}</strong>
                                        <p>{comment.createdAt.substring(0, 10)}</p>
                                        <p>{comment.body}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )
    }

    return (
        <>
            {mangaDetailDisplay()}
        </>
    )
}

export default MangaScreen