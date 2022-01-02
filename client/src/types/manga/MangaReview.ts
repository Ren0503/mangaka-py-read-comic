export interface MangaCreateReviewState {
	success?: boolean
	loading?: boolean
	error?: any
}

export enum MangaCreateReviewActionTypes {
	MANGA_CREATE_REVIEW_REQUEST = 'MANGA_CREATE_REVIEW_REQUEST',
	MANGA_CREATE_REVIEW_SUCCESS = 'MANGA_CREATE_REVIEW_SUCCESS',
	MANGA_CREATE_REVIEW_FAILURE = 'MANGA_CREATE_REVIEW_FAILURE',
	MANGA_CREATE_REVIEW_RESET = 'MANGA_CREATE_REVIEW_RESET'
}

export interface MangaCreateReviewRequestAction {
	type: MangaCreateReviewActionTypes.MANGA_CREATE_REVIEW_REQUEST
}

export interface MangaCreateReviewSuccessAction {
	type: MangaCreateReviewActionTypes.MANGA_CREATE_REVIEW_SUCCESS
}

export interface MangaCreateReviewFailureAction {
	type: MangaCreateReviewActionTypes.MANGA_CREATE_REVIEW_FAILURE
	payload: any
}

export interface MangaCreateReviewResetAction {
	type: MangaCreateReviewActionTypes.MANGA_CREATE_REVIEW_RESET
}

export type MangaCreateReviewAction =
	| MangaCreateReviewRequestAction
	| MangaCreateReviewSuccessAction
	| MangaCreateReviewFailureAction
	| MangaCreateReviewResetAction
