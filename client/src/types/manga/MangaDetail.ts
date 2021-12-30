import { MangaDetail } from '.'

export interface MangaDetailsState {
	loading: boolean
	manga?: MangaDetail
	error?: undefined
}

export enum MangaDetailsActionTypes {
	MANGA_DETAIL_REQUEST = 'MANGA_DETAIL_REQUEST',
	MANGA_DETAIL_SUCCESS = 'MANGA_DETAIL_SUCCESS',
	MANGA_DETAIL_FAILURE = 'MANGA_DETAIL_FAILURE'
}

export interface FetchMangaRequestAction {
	type: MangaDetailsActionTypes.MANGA_DETAIL_REQUEST
}

export interface FetchMangaSuccessAction {
	type: MangaDetailsActionTypes.MANGA_DETAIL_SUCCESS
	payload: MangaDetail
}

export interface FetchMangaFailureAction {
	type: MangaDetailsActionTypes.MANGA_DETAIL_FAILURE
	payload: any
}

export type MangaDetailsAction =
	| FetchMangaSuccessAction
	| FetchMangaFailureAction
	| FetchMangaRequestAction
