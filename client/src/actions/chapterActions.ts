import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    Chapter,
    ChapterDetailActionTypes,
    ChapterListActionTypes
} from 'types/chapter'

export const listChapter = (mangaId: string): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: ChapterListActionTypes.CHAPTER_LIST_REQUEST })

        const { data } = await axios.get<Chapter[]>(`/api/chapter/by/${mangaId}`)

        dispatch({
            type: ChapterListActionTypes.CHAPTER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ChapterListActionTypes.CHAPTER_LIST_FAILURE,
            payload: errorHandler(error)
        })
    }
}

export const detailChapter = (id: string): AppThunk => async (
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