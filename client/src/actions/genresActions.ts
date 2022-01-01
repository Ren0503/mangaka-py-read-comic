import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    Genre, 
    GenreListActionTypes,
} from 'types/genres'

export const listGenres = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({ type: GenreListActionTypes.GENRE_LIST_REQUEST })

        const { data } = await axios.get<Genre[]>(`/api/info/genres/`)

        dispatch({
            type: GenreListActionTypes.GENRE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
			type: GenreListActionTypes.GENRE_LIST_FAILURE,
			payload: errorHandler(error)
		})
    }
}