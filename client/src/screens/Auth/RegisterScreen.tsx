import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Message, Loader, FormContainer } from 'components/shared'
import { register } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface RegisterScreenProps extends RouteComponentProps {}

const RegisterScreen = ({
	location: { search },
	history
}: RegisterScreenProps) => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [message, setMessage] = useState<string>()
	const redirect = search ? search.split('=')[1] : '/'

	const dispatch = useDispatch<AppDispatch>()
	const { userInfo, loading, error } = useSelector(
		(state: ReduxState) => state.userRegister
	)

	useEffect(() => {
		if (userInfo) history.push(redirect)
	}, [history, redirect, userInfo])

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== confirmPassword) setMessage('Password do not match')
		else dispatch(register(name, email, password))
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{message && <Message variant='danger'>{message}</Message>}
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
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
