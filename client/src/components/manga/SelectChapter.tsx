import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Loader, Message } from 'components/shared'

import { listChapter } from 'actions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'

interface SelectChapterProps {
    mangaId: string
}

const SelectChapter = ({
    mangaId
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
    }, [mangaId, dispatch, chapters])

    const handleChange = (value: string) => {
        history.push(`/manga/${mangaId}/chapter/${value}`)
    }

    const chapterListDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant="danger">{error}</Message>
        else
            return (
                <div className='choose align-center text-center'>
                    <i className='fas fa-arrow-left'></i>
                    <Form.Select onChange={(e) => handleChange(e.target.value)}>
                        {chapters.map((chapter) => (
                            <option value={chapter._id}>
                                {chapter.name}
                            </option>
                        ))}
                    </Form.Select>
                    <i className='fas fa-arrow-right'></i>
                </div>
            )
    }

    return (
        <div>
            {chapterListDisplay()}
        </div>
    )
}

export default SelectChapter
