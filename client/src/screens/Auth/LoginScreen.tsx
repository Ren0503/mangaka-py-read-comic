import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Message, Loader, FormContainer } from 'components/shared'
import { login } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface LoginScreenProps extends RouteComponentProps {}

const LoginScreen = ({ location: { search }, history }: LoginScreenProps) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const redirect = search ? search.split('=')[1] : '/'

	const dispatch = useDispatch<AppDispatch>()
	const { userInfo, loading, error } = useSelector(
		(state: ReduxState) => state.userLogin
	)

	useEffect(() => {
		if (userInfo) history.push(redirect)
	}, [history, redirect, userInfo])

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
