export interface FavoriteAddState {
	success?: boolean
	loading?: boolean
	error?: any
}

export enum FavoriteAddActionTypes {
	FAVORITE_ADD_REQUEST = 'FAVORITE_ADD_REQUEST',
	FAVORITE_ADD_SUCCESS = 'FAVORITE_ADD_SUCCESS',
	FAVORITE_ADD_FAILURE = 'FAVORITE_ADD_FAILURE',
	FAVORITE_ADD_RESET = 'FAVORITE_ADD_RESET'
}

export interface FavoriteAddRequestAction {
	type: FavoriteAddActionTypes.FAVORITE_ADD_REQUEST
}

export interface FavoriteAddSuccessAction {
	type: FavoriteAddActionTypes.FAVORITE_ADD_SUCCESS
}

export interface FavoriteAddFailureAction {
	type: FavoriteAddActionTypes.FAVORITE_ADD_FAILURE
	payload: any
}

export interface FavoriteAddResetAction {
	type: FavoriteAddActionTypes.FAVORITE_ADD_RESET
}

export type FavoriteAddAction =
	| FavoriteAddRequestAction
	| FavoriteAddSuccessAction
	| FavoriteAddFailureAction
	| FavoriteAddResetAction
