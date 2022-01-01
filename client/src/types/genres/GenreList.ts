import { Genre } from "."

export interface GenreListState {
    genres: Genre[]
    loading?: boolean
    error?: undefined
}

export enum GenreListActionTypes {
	GENRE_LIST_REQUEST = 'GENRE_LIST_REQUEST',
	GENRE_LIST_SUCCESS = 'GENRE_LIST_SUCCESS',
	GENRE_LIST_FAILURE = 'GENRE_LIST_FAILURE'
}

export interface FetchGenresRequestAction {
	type: GenreListActionTypes.GENRE_LIST_REQUEST
}

export interface FetchGenresSuccessAction {
	type: GenreListActionTypes.GENRE_LIST_SUCCESS
	payload: Genre[]
}

export interface FetchGenresFailureAction {
	type: GenreListActionTypes.GENRE_LIST_FAILURE
	payload: any
}

export type GenreListAction =
	| FetchGenresSuccessAction
	| FetchGenresFailureAction
	| FetchGenresRequestAction
