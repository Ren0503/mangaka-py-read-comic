import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Form,
    Table,
    Breadcrumb
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
    mangaId: string
}

interface MangaScreenProps extends RouteComponentProps<MatchParams> { }

const MangaScreen: FunctionComponent<MangaScreenProps> = ({
    match: {
        params: { mangaId }
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

        dispatch(detailManga(mangaId))
    }, [mangaId, dispatch, successMangaReview, successAddFavorite])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createMangaReview(mangaId, { rating, comment }))
    }

    const addFavoriteHandler = (mangaId: string) => {
        if (!userInfo)
            window.alert('You need to login')
        else 
            dispatch(addFavorite(mangaId))
    }

    const handleShowMore = () => {
        if (manga)
            setShow(manga.chapters.length)
    }

    const mangaDetailDisplay = () => {
        if (loading || loadingAddFavorite) return <Loader />
        else if (error || errorAddFavorite) return <Message variant='danger'>{error}</Message>
        else if (!manga)
            return <Message variant='danger'>Manga Not Found</Message>
        else
            return (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href='/'>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {manga.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className='text-center'>{manga.name}</h3>
                    <Row>
                        <Col md={4}>
                            <Image src={manga.image} alt={manga.name} fluid />
                        </Col>
                        <Col md={8}>
                            <Rating value={manga.rating} />
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <i className='fas fa-user'></i> Author:
                                    <Link to={`/author/${manga.author._id}`}>
                                        {manga.author.name}
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className='fas fa-rss'></i> Status: {manga.status}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className='fas fa-tags'></i> Genres: {manga.genres.map((genre) => (
                                        <Link to={`/genres/${genre._id}`}>
                                            <div className="tag" key={genre._id}>
                                                {genre.name}
                                            </div>
                                        </Link>
                                    ))}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className='fas fa-eye'></i> Views: {manga.views}
                                </ListGroup.Item>
                            </ListGroup>
                            <Button
                                type="button"
                                className="btn-theme ml-3"
                                onClick={() => addFavoriteHandler(manga._id)}
                            >
                                <i className='fas fa-heart'></i> Favorite/ {manga.favorites}
                            </Button>
                        </Col>
                    </Row>
                    <div className='mt-2'>
                        <h4>Description</h4>
                        <p>{manga.description}</p>
                    </div>
                    <h4>Chapters</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NAME</th>
                                <th>VIEWS</th>
                                <th>DETAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manga.chapters.slice(0, show).map((chapter, index) => (
                                <tr key={chapter._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/manga/${manga._id}/chapter/${chapter._id}`}>
                                            {chapter.name}
                                        </Link>
                                    </td>
                                    <td>{chapter.views}</td>
                                    <td>{chapter.createdAt.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {manga.chapters.length > 4 &&
                        <div style={{ margin: 'auto' }}>
                            <Button className='btn btn-red' onClick={handleShowMore}>
                                <i className="fas fa-angle-down"></i>
                            </Button>
                        </div>
                    }
                    <div className='my-3'>
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
                    </div>
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