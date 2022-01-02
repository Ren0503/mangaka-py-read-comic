import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    Badge
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { AppDispatch } from 'store'
import { detailManga, addFavorite, createMangaReview } from 'actions'
import { MangaCreateReviewActionTypes } from 'types/manga'
import { Rating, TopManga } from 'components/manga'
import { FavoriteAddActionTypes } from 'types/favorite'

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
	const [rating, setRating] = useState<number>(0)
	const [comment, setComment] = useState<string>('')
    const [show, setShow] = useState<number>(4)

    const dispatch = useDispatch<AppDispatch>()
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { manga, loading, error } = useSelector(
        (state: ReduxState) => state.mangaDetail
    )
    const {
        error: errorMangaReview,
        loading: loadingMangaReview,
        success: successMangaReview
    } = useSelector((state: ReduxState) => state.mangaCreateReview)

    const {
        loading: loadingAddFavorite,
        error: errorAddFavorite,
        success: successAddFavorite,
    } = useSelector((state: ReduxState) => state.favoriteAdd)

    useEffect(() => {
        if (successAddFavorite) {
            dispatch({
                type: FavoriteAddActionTypes.FAVORITE_ADD_RESET
            })
        }

        if (successMangaReview) {
            dispatch({
                type: MangaCreateReviewActionTypes.MANGA_CREATE_REVIEW_RESET
            })
        }

        dispatch(detailManga(id))
    }, [id, dispatch, successMangaReview, successAddFavorite])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createMangaReview(id, { rating, comment }))
    }

    const addFavoriteHandler = (mangaId: string) => {
        dispatch(addFavorite(mangaId))
    }

    const handleShowMore = () => {
        if (manga)
            setShow(manga.chapters.length)
    }

    const mangaDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!manga)
            return <Message variant='danger'>Manga Not Found</Message>
        else
            return (
                <>
                    <h3 className='text-center'>{manga.name}</h3>
                    <Row>
                        <Col md={4}>
                            <Image src={manga.image} alt={manga.name} fluid />
                        </Col>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    Author: {manga.author.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Status: {manga.status}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Genres: {manga.genres.map((genre) => (<Badge>{genre.name}</Badge>))}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Views: {manga.views}
                                </ListGroup.Item>
                            </ListGroup>
                            <Rating value={manga.star} />
                            <Button
                                type="button"
                                className="btn-red"
                                onClick={() => addFavoriteHandler(manga._id)}
                            >
                                Add to Favorite
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h4>Description</h4>
                        <p>{manga.description}</p>
                    </Row>
                    <ListGroup>
                        <h4>Chapters</h4>
                        {manga.chapters.slice(0, show).map((chapter, index) => (
                            <ListGroup.Item key={chapter._id}>
                                <Row>
                                    <Col>{index + 1}</Col>
                                    <Col>{chapter.name}</Col>
                                    <Col>{chapter.views}</Col>
                                    <Col>{chapter.createdAt.substring(0, 10)}</Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                        {manga.chapters.length > 4 &&
                            <div style={{ margin: 'auto' }}>
                                <Button className='btn btn-red' onClick={handleShowMore}>
                                    <i className="fas fa-angle-down"></i>
                                </Button>
                            </div>
                        }
                    </ListGroup>
                    <Row className='my-3'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {manga.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {userInfo &&
                                    <ListGroup.Item>
                                        <h2>Writer a viewer comment</h2>
                                        {errorMangaReview && (
                                            <Message variant='danger'>{errorMangaReview}</Message>
                                        )}
                                        {loadingMangaReview && <Loader />}
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Write your comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    rows={3}
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(e.target.value)
                                                    }></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </ListGroup.Item>
                                }

                                {manga.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )
    }

    return (
        <Row>
            <Col md={9}>
                {mangaDetailDisplay()}
            </Col>
            <Col md={3}>
                <TopManga isSidebar={true} />
            </Col>
        </Row>
    )
}

export default MangaScreen