import React, { FunctionComponent, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
    Image,    
    Breadcrumb
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { FormContainer, Loader, Message } from 'components/shared'
import { ReduxState } from 'types/ReduxState'
import { AppDispatch } from 'store'
import { detailChapter } from 'actions'
import { SelectChapter } from 'components/manga'

interface MatchParams {
    mangaId: string
    chapterId: string
}

interface ChapterScreenProps extends RouteComponentProps<MatchParams> { }

const ChapterScreen: FunctionComponent<ChapterScreenProps> = ({
    match: {
        params: { mangaId, chapterId }
    },
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
                    <Breadcrumb>
                        <Breadcrumb.Item href='/'>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {chapter.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SelectChapter mangaId={mangaId} page={chapter.number} />
                    <h1>{chapter.name}</h1>
                    <FormContainer>
                        {chapter.chapterImages.map((chapImg) => (
                            <Image src={chapImg.image} alt={chapImg._id} fluid />
                        ))}
                    </FormContainer>
                    <SelectChapter mangaId={mangaId} page={chapter.number} />
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
