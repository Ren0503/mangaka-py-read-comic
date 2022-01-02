import { MangaList } from "types/manga"
import { Genre } from "."

export interface GenreDetail extends Genre {
	mangas: MangaList[]
}

export interface GenreDetailState {
    genre?: GenreDetail
    loading: boolean
    error?: undefined
}

export enum GenreDetailActionTypes {
	GENRE_DETAIL_REQUEST = 'GENRE_DETAIL_REQUEST',
	GENRE_DETAIL_SUCCESS = 'GENRE_DETAIL_SUCCESS',
	GENRE_DETAIL_FAILURE = 'GENRE_DETAIL_FAILURE'
}

export interface FetchGenreDetailRequestAction {
	type: GenreDetailActionTypes.GENRE_DETAIL_REQUEST
}

export interface FetchGenreDetailSuccessAction {
	type: GenreDetailActionTypes.GENRE_DETAIL_SUCCESS
	payload: GenreDetail
}

export interface FetchGenreDetailFailureAction {
	type: GenreDetailActionTypes.GENRE_DETAIL_FAILURE
	payload: any
}

export type GenreDetailAction =
	| FetchGenreDetailRequestAction
	| FetchGenreDetailSuccessAction
	| FetchGenreDetailFailureAction
