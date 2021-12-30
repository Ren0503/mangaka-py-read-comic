import { ChapterDetail } from "."

export interface ChapterDetailState {
	loading: boolean
	chapter?: ChapterDetail
	error?: any
}

export enum ChapterDetailActionTypes {
	CHAPTER_DETAIL_REQUEST = 'CHAPTER_DETAIL_REQUEST',
	CHAPTER_DETAIL_SUCCESS = 'CHAPTER_DETAIL_SUCCESS',
	CHAPTER_DETAIL_FAILURE = 'CHAPTER_DETAIL_FAILURE'
}

export interface ChapterDetailRequestAction {
	type: ChapterDetailActionTypes.CHAPTER_DETAIL_REQUEST
}

export interface ChapterDetailSuccessAction {
	type: ChapterDetailActionTypes.CHAPTER_DETAIL_SUCCESS
	payload: ChapterDetail
}

export interface ChapterDetailFailureAction {
	type: ChapterDetailActionTypes.CHAPTER_DETAIL_FAILURE
	payload: any
}

export type ChapterDetailAction =
	| ChapterDetailRequestAction
	| ChapterDetailSuccessAction
	| ChapterDetailFailureAction
