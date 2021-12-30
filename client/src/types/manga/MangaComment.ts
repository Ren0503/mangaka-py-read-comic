export interface MangaCreateCommentState {
	success?: boolean
	loading?: boolean
	error?: any
}

export enum MangaCreateCommentActionTypes {
	MANGA_CREATE_COMMENT_REQUEST = 'MANGA_CREATE_COMMENT_REQUEST',
	MANGA_CREATE_COMMENT_SUCCESS = 'MANGA_CREATE_COMMENT_SUCCESS',
	MANGA_CREATE_COMMENT_FAILURE = 'MANGA_CREATE_COMMENT_FAILURE',
	MANGA_CREATE_COMMENT_RESET = 'MANGA_CREATE_COMMENT_RESET'
}

export interface MangaCreateCommentRequestAction {
	type: MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_REQUEST
}

export interface MangaCreateCommentSuccessAction {
	type: MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_SUCCESS
}

export interface MangaCreateCommentFailureAction {
	type: MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_FAILURE
	payload: any
}

export interface MangaCreateCommentResetAction {
	type: MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_RESET
}

export type MangaCreateCommentAction =
	| MangaCreateCommentRequestAction
	| MangaCreateCommentSuccessAction
	| MangaCreateCommentFailureAction
	| MangaCreateCommentResetAction
