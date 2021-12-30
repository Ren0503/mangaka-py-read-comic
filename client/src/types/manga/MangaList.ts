import { MangaList } from "."

export interface MangaListState {
    mangas: MangaList[]
    pages?: number
    page?: number
    loading: boolean
    error?: undefined
}

export enum MangaListActionTypes {
	MANGA_LIST_REQUEST = 'MANGA_LIST_REQUEST',
	MANGA_LIST_SUCCESS = 'MANGA_LIST_SUCCESS',
	MANGA_LIST_FAILURE = 'MANGA_LIST_FAILURE'
}

export interface FetchMangasRequestAction {
	type: MangaListActionTypes.MANGA_LIST_REQUEST
}

export interface FetchMangasSuccessAction {
	type: MangaListActionTypes.MANGA_LIST_SUCCESS
	payload: { 
        mangas: MangaList[] 
        pages: number 
        page: number 
    }
}

export interface FetchMangasFailureAction {
	type: MangaListActionTypes.MANGA_LIST_FAILURE
	payload: any
}

export type MangaListAction =
	| FetchMangasSuccessAction
	| FetchMangasFailureAction
	| FetchMangasRequestAction
