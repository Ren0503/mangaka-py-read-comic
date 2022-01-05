import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { Loader, Message } from 'components/shared'

import { listChapter } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface SelectChapterProps {
    mangaId: string
    page: number
}

const SelectChapter = ({
    mangaId,
    page
}: SelectChapterProps) => {
    const history = useHistory()
    const dispatch = useDispatch<AppDispatch>()

    const { chapters, loading, error } = useSelector(
        (state: ReduxState) => state.chapterList
    )

    useEffect(() => {
        if (chapters.length === 0) {
            dispatch(listChapter(mangaId))
        }
    }, [mangaId, dispatch, chapters, page])

    const handleChange = (value: string) => {
        history.push(`/manga/${mangaId}/chapter/${value}`)
    }    

    const chapterListDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant="danger">{error}</Message>
        else
            return (
                <div className='choose align-center text-center'>
                    {page !== 1 && (
                        <Link to={`/manga/${mangaId}/chapter/${chapters.at(page - 2)?._id}`}>
                            <i className='fas fa-arrow-left'></i>
                        </Link>
                    )}
                    <Form.Select onChange={(e) => handleChange(e.target.value)}>
                        <option>Choose Chapters</option>
                        {chapters.map((chapter) => (
                            <option value={chapter._id}>
                                {chapter.name}
                            </option>
                        ))}
                    </Form.Select>
                    {page !== chapters.length && (
                        <Link to={`/manga/${mangaId}/chapter/${chapters.at(page)?._id}`}>
                            <i className='fas fa-arrow-right'></i>
                        </Link>
                    )}
                </div>
            )
    }

    return (
        <div className='my-4'>
            {chapterListDisplay()}
        </div>
    )
}

export default SelectChapter
