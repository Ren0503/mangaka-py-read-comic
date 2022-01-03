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

import { FormContainer, Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { AppDispatch } from 'store'
import { detailChapter, listChapter } from 'actions'

interface MatchParams {
    mangaId: string
    chapterId: string
}

interface ChapterScreenProps extends RouteComponentProps<MatchParams> { }

const ChapterScreen: FunctionComponent<ChapterScreenProps> = ({
    match: {
        params: { mangaId, chapterId }
    },
    history
}: ChapterScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { chapter, loading, error } = useSelector(
        (state: ReduxState) => state.chapterDetail
    )

    const {
        chapters: chapterList,
        loading: loadingList,
        error: errorList,
    } = useSelector((state: ReduxState) => state.chapterList)

    useEffect(() => {
        dispatch(detailChapter(chapterId))

        if (chapterList.length === 0) {
            dispatch(listChapter(mangaId))
            console.log(chapterList)
        }
    }, [chapterId, dispatch])

    const chapterDetailDisplay = () => {
        if (loading || loadingList) return <Loader />
        else if (error || errorList) return <Message variant='danger'>{error}</Message>
        else if (!chapter)
            return <Message variant='danger'>Chapter Not Found</Message>
        else
            return (
                <>
                    <div className='choose align-center text-center'>
                        <i className='fas fa-arrow-left'></i>
                        <Form.Select aria-label={chapter.name}>
                            {chapterList.map((chap) => (
                                <option value={chap.name}>
                                    <Link to={`/manga/${mangaId}/chapter/${chap._id}`}>
                                        {chap.name}
                                    </Link>
                                </option>
                            ))}
                        </Form.Select>
                        <i className='fas fa-arrow-right'></i>
                    </div>
                    <h1>{chapter.name}</h1>
                    <FormContainer>

                        {chapter.chapterImages.map((chapImg) => (
                            <Image src={chapImg.image} alt={chapImg._id} fluid />
                        ))}
                    </FormContainer>
                </>
            )
    }

    return (
        <div>
            {chapterDetailDisplay()}
        </div>
    )
}

export default ChapterScreen
