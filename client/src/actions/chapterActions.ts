import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    Chapter,
    ChapterDetailActionTypes
} from 'types/chapter'

export const chapterDetail = (id: string): AppThunk => async (
    dispatch
) => {
    try {
        dispatch({
            type: ChapterDetailActionTypes.CHAPTER_DETAIL_REQUEST
        })

        const { data } = await axios.get<Chapter>(`/api/chapter/${id}/`)

        dispatch({
            type: ChapterDetailActionTypes.CHAPTER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ChapterDetailActionTypes.CHAPTER_DETAIL_FAILURE,
            payload: errorHandler(error)
        })
    }
}