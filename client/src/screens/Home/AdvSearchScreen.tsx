import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container, Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, Message, Paginate } from 'components/shared'

import { listGenres, searchAdv } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { MangaCard } from 'components/manga'

const AdvSearchScreen = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const { error, loading, genres } = useSelector(
        (state: ReduxState) => state.genreList
    )

    const {
        mangas,
        page,
        pages,
        loading: loadingManga,
        error: errorManga,
    } = useSelector((state: ReduxState) => state.advSearch)

    useEffect(() => {
        if (genres.length === 0) {
            dispatch(listGenres())
        }
    }, [dispatch, genres])

    const handleOnchange = (id: string) => {
        const selectCB = selectedCheckbox

        const findIdx = selectCB.indexOf(id)
        if (findIdx > -1) {
            selectCB.splice(findIdx, 1)
        } else {
            selectCB.push(id)
        }

        setSelectedCheckbox(selectCB)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedCheckbox.length === 0) {
            window.alert('You did not selected')
        } else {
            let url = '?keyword=' + selectedCheckbox[0]

            if (selectedCheckbox.length > 1) {
                selectedCheckbox.slice(1).map((item, index) => {
                    url += '&keyword=' + item
                })
            }
            setIsSearch(true)
            dispatch(searchAdv(url, ''))
        }
    }

    const checkboxGenres = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            {genres.map((genre) => (
                                <Col md={2} key={genre._id}>
                                    <Form.Check
                                        type="checkbox"
                                        id={genre._id}
                                        name={genre.name}
                                        label={genre.name}
                                        value={genre.name}
                                        onChange={() => handleOnchange(genre.name)}
                                    ></Form.Check>
                                </Col>
                            ))}
                        </Row>
                        <Button type='submit' className='btn-theme'>
                            Submit
                        </Button>
                    </Form>
                </>
            )
    }

    const displayMangas = () => {
        if (loadingManga) return <Loader />
        else if (errorManga) return <Message variant='danger'>{errorManga}</Message>
        else
            return (
                <>
                    <div>
                        <h2>Result</h2>
                    </div>
                    <Row>
                        {mangas
                            .map((manga) => (
                                <Col sm={12} md={6} lg={4} xl={2} key={manga._id}>
                                    <MangaCard manga={manga} />
                                </Col>
                            ))}
                    </Row>
                    {pages && page && (
                        <Paginate
                            page={page}
                            pages={pages}
                        />
                    )}
                </>
            )
    }

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Advanced Search
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className='mx-4 my-3'>
                <h4>Select Genres Want Searck</h4>
                {checkboxGenres()}
            </div>

            {isSearch && (<>{displayMangas()}</>)}
        </Container>
    )
}

export default AdvSearchScreen
