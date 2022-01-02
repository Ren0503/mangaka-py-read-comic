import { MangaList } from "types/manga"
import { Author } from "."

export interface AuthorDetail extends Author {
	mangas: MangaList[]
}

export interface AuthorDetailState {
    author?: AuthorDetail
    loading: boolean
    error?: undefined
}

export enum AuthorDetailActionTypes {
	AUTHOR_DETAIL_REQUEST = 'AUTHOR_DETAIL_REQUEST',
	AUTHOR_DETAIL_SUCCESS = 'AUTHOR_DETAIL_SUCCESS',
	AUTHOR_DETAIL_FAILURE = 'AUTHOR_DETAIL_FAILURE'
}

export interface FetchAuthorDetailRequestAction {
	type: AuthorDetailActionTypes.AUTHOR_DETAIL_REQUEST
}

export interface FetchAuthorDetailSuccessAction {
	type: AuthorDetailActionTypes.AUTHOR_DETAIL_SUCCESS
	payload: AuthorDetail
}

export interface FetchAuthorDetailFailureAction {
	type: AuthorDetailActionTypes.AUTHOR_DETAIL_FAILURE
	payload: any
}

export type AuthorDetailAction =
	| FetchAuthorDetailRequestAction
	| FetchAuthorDetailSuccessAction
	| FetchAuthorDetailFailureAction
