import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    AdvSearchActionTypes,
    AuthorDetail,
    AuthorDetailActionTypes,
    Genre, 
    GenreDetail, 
    GenreDetailActionTypes, 
    GenreListActionTypes,
} from 'types/genres'
import { MangaList } from 'types/manga'

export const listGenres = (): AppThunk => async (dispatch) => {
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

export const detailGenre = (genreId: string): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: GenreDetailActionTypes.GENRE_DETAIL_REQUEST })

        const { data } = await axios.get<GenreDetail>(`/api/info/genres/${genreId}`)

        dispatch({
            type: GenreDetailActionTypes.GENRE_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
			type: GenreDetailActionTypes.GENRE_DETAIL_FAILURE,
			payload: errorHandler(error)
		})
    }
}

export const detailAuthor = (authorId: string): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: AuthorDetailActionTypes.AUTHOR_DETAIL_REQUEST })

        const { data } = await axios.get<AuthorDetail>(`/api/info/author/${authorId}`)

        dispatch({
            type: AuthorDetailActionTypes.AUTHOR_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
			type: AuthorDetailActionTypes.AUTHOR_DETAIL_FAILURE,
			payload: errorHandler(error)
		})
    }
}

export const searchAdv = (
    query: string = '',
    pageNumber: string = ''
): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: AdvSearchActionTypes.ADV_SEARCH_REQUEST })

		const { data } = await axios.get<{
			mangas: MangaList[]
			page: number
			pages: number
		}>(`/api/info/search/${query}&page=${pageNumber}`)
		
		dispatch({
			type: AdvSearchActionTypes.ADV_SEARCH_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: AdvSearchActionTypes.ADV_SEARCH_FAILURE,
			payload: errorHandler(error)
		})
	}
}