import { User } from './User'

export interface UserDetailState {
	user?: User
	loading?: boolean
	error?: any
}

export enum UserDetailActionTypes {
	USER_DETAIL_REQUEST = 'USER_DETAIL_REQUEST',
	USER_DETAIL_SUCCESS = 'USER_DETAIL_SUCCESS',
	USER_DETAIL_FAILURE = 'USER_DETAIL_FAILURE',
	USER_DETAIL_RESET = 'USER_DETAIL_RESET'
}

export interface UserDetailRequestAction {
	type: UserDetailActionTypes.USER_DETAIL_REQUEST
}

export interface UserDetailSuccessAction {
	type: UserDetailActionTypes.USER_DETAIL_SUCCESS
	payload: User
}

export interface UserDetailFailureAction {
	type: UserDetailActionTypes.USER_DETAIL_FAILURE
	payload: any
}

export interface UserDetailResetAction {
	type: UserDetailActionTypes.USER_DETAIL_RESET
	payload: any
}

export type UserDetailsAction =
	| UserDetailRequestAction
	| UserDetailSuccessAction
	| UserDetailFailureAction
	| UserDetailResetAction
