import { Chapter } from "."

export interface ChapterListState {
    chapters: Chapter[]
    loading?: boolean
    error?: undefined
}

export enum ChapterListActionTypes {
	CHAPTER_LIST_REQUEST = 'CHAPTER_LIST_REQUEST',
	CHAPTER_LIST_SUCCESS = 'CHAPTER_LIST_SUCCESS',
	CHAPTER_LIST_FAILURE = 'CHAPTER_LIST_FAILURE'
}

export interface FetchChaptersRequestAction {
	type: ChapterListActionTypes.CHAPTER_LIST_REQUEST
}

export interface FetchChaptersSuccessAction {
	type: ChapterListActionTypes.CHAPTER_LIST_SUCCESS
	payload: Chapter[]
}

export interface FetchChaptersFailureAction {
	type: ChapterListActionTypes.CHAPTER_LIST_FAILURE
	payload: any
}

export type ChapterListAction =
	| FetchChaptersSuccessAction
	| FetchChaptersFailureAction
	| FetchChaptersRequestAction
