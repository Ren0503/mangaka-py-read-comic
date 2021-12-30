import { Favorite } from './Favorite';

export interface FavoriteUserState {
	favorites: Favorite[];
	loading?: boolean;
	error?: undefined;
}

export enum FavoriteUserActionTypes {
	FAVORITE_MY_REQUEST = 'FAVORITE_MY_REQUEST',
	FAVORITE_MY_SUCCESS = 'FAVORITE_MY_SUCCESS',
	FAVORITE_MY_FAILURE = 'FAVORITE_MY_FAILURE'
}

export interface FavoriteUserRequestAction {
	type: FavoriteUserActionTypes.FAVORITE_MY_REQUEST;
}

export interface FavoriteUserSuccessAction {
	type: FavoriteUserActionTypes.FAVORITE_MY_SUCCESS;
	payload: Favorite[];
}

export interface FavoriteUserFailureAction {
	type: FavoriteUserActionTypes.FAVORITE_MY_FAILURE;
	payload: any;
}

export type FavoriteUserAction =
	| FavoriteUserRequestAction
	| FavoriteUserSuccessAction
	| FavoriteUserFailureAction;
