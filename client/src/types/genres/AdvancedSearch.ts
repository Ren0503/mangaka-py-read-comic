import { MangaList } from "types/manga"

export interface AdvSearchState {
    mangas: MangaList[]
    pages?: number
    page?: number
    loading?: boolean
    error?: undefined
}

export enum AdvSearchActionTypes {
	ADV_SEARCH_REQUEST = 'ADV_SEARCH_REQUEST',
	ADV_SEARCH_SUCCESS = 'ADV_SEARCH_SUCCESS',
	ADV_SEARCH_FAILURE = 'ADV_SEARCH_FAILURE'
}

export interface FetchSearchRequestAction {
	type: AdvSearchActionTypes.ADV_SEARCH_REQUEST
}

export interface FetchSearchSuccessAction {
	type: AdvSearchActionTypes.ADV_SEARCH_SUCCESS
	payload: { 
        mangas: MangaList[] 
        pages: number 
        page: number 
    }
}

export interface FetchSearchFailureAction {
	type: AdvSearchActionTypes.ADV_SEARCH_FAILURE
	payload: any
}

export type AdvSearchAction =
	| FetchSearchRequestAction
	| FetchSearchSuccessAction
	| FetchSearchFailureAction
