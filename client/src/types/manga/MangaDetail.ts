import { MangaDetail } from '.'

export interface MangaDetailState {
	loading: boolean
	manga?: MangaDetail
	error?: undefined
}

export enum MangaDetailActionTypes {
	MANGA_DETAIL_REQUEST = 'MANGA_DETAIL_REQUEST',
	MANGA_DETAIL_SUCCESS = 'MANGA_DETAIL_SUCCESS',
	MANGA_DETAIL_FAILURE = 'MANGA_DETAIL_FAILURE'
}

export interface FetchMangaRequestAction {
	type: MangaDetailActionTypes.MANGA_DETAIL_REQUEST
}

export interface FetchMangaSuccessAction {
	type: MangaDetailActionTypes.MANGA_DETAIL_SUCCESS
	payload: MangaDetail
}

export interface FetchMangaFailureAction {
	type: MangaDetailActionTypes.MANGA_DETAIL_FAILURE
	payload: any
}

export type MangaDetailAction =
	| FetchMangaSuccessAction
	| FetchMangaFailureAction
	| FetchMangaRequestAction
