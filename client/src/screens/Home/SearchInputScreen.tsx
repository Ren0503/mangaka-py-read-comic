import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Loader, Message } from 'components/shared'

import { listGenres } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

const SearchInputScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, genres } = useSelector(
        (state: ReduxState) => state.genreList
    )

    useEffect(() => {
        if (genres.length === 0) dispatch(listGenres())
    }, [dispatch, genres])

    const [check, setCheck] = useState(
        new Array(genres.length).fill(false)
    )

    const handleOnchange = (position: number) => {
        const updatedCheck = check.map((item, index) =>
            index === position ? !item : item
        )

        setCheck(updatedCheck)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        history.push(`/search/keyword=${check}`)
    }

    const checkboxGenres = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            {genres.map((genre, index) => (
                                <Col md={2}>
                                    <Form.Check
                                        type="radio"
                                        id={genre._id}
                                        name={genre.name}
                                        label={genre.name}
                                        value={genre.name}
                                        checked={check[index]}
                                        onChange={() => handleOnchange(index)}
                                    ></Form.Check>
                                </Col>
                            ))}
                        </Row>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                    </Form>
                </>
            )
    }

    return (
        <Container>
            {checkboxGenres()}
        </Container>
    )
}

export default SearchInputScreen
