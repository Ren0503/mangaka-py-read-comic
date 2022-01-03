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
import { detailChapter } from 'actions'

interface MatchParams {
    chapterId: string
}

interface ChapterScreenProps extends RouteComponentProps<MatchParams> { }

const ChapterScreen: FunctionComponent<ChapterScreenProps> = ({
    match: {
        params: { chapterId }
    },
    history
}: ChapterScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { chapter, loading, error } = useSelector(
        (state: ReduxState) => state.chapterDetail
    )
    
    useEffect(() => {
        dispatch(detailChapter(chapterId))
    }, [chapterId, dispatch])

    const chapterDetailDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>
        else if (!chapter)
            return <Message variant='danger'>Chapter Not Found</Message>
        else
            return (
                <>                        
                    <h1>{chapter.name}</h1>
                    <FormContainer>

                        {chapter.chapterImages.map((chapImg) => (
                            <Image src={chapImg.image} alt={chapImg._id} fluid/>
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
