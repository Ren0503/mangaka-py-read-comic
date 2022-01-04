import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Image, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Message, Loader } from 'components/shared'
import { getUserDetail, updateUserProfile, listFavorites } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { UserUpdateProfileActionTypes } from 'types/user'

interface ProfileScreenProps extends RouteComponentProps { }

const ProfileScreen = ({ history }: ProfileScreenProps) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [message, setMessage] = useState<string>()
    const [updateMessage, setUpdateMessage] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector(
        (state: ReduxState) => state.userDetail
    )
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { success } = useSelector(
        (state: ReduxState) => state.userUpdateProfile
    )
    const { favorites, loading: loadingFavorite, error: errorFavorite } = useSelector(
        (state: ReduxState) => state.favoriteUser
    )

    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            if (success) setUpdateMessage(true)
            if (!user || success) {
                dispatch(getUserDetail())
                dispatch(listFavorites())
                dispatch({
                    type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET
                })
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) setMessage('Password do not match')
        else {
            if (!user) return
            dispatch(
                updateUserProfile({
                    _id: user._id,
                    name,
                    email,
                    password
                })
            )
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {updateMessage && !loading && (
                    <Message variant='success'>Profile Updated</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='ConfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Favorites</h2>
                {loadingFavorite ? (
                    <Loader />
                ) : errorFavorite ? (
                    <Message variant='danger'>{errorFavorite}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>IMAGE</th>
                                <th>NAME</th>
                                <th>VIEWS</th>
                                <th>DETAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map((favorite, index) => (
                                <tr key={favorite._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image src={favorite.manga.image} alt={favorite.manga.name} height="200" />
                                    </td>
                                    <td>{favorite.manga.name}</td>
                                    <td>
                                        {favorite.manga.views}
                                    </td>
                                    <td>
                                        <Link to={`/manga/${favorite.manga._id}`}>
                                            <Button className="btn btn-theme">
                                                Detail
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
