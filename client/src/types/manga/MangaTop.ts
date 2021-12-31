import { MangaList } from '.'

export interface MangaTopState {
	mangas: MangaList[];
	loading?: boolean;
	error?: undefined;
}

export enum MangaTopActionTypes {
	MANGA_TOP_REQUEST = 'MANGA_TOP_REQUEST',
	MANGA_TOP_SUCCESS = 'MANGA_TOP_SUCCESS',
	MANGA_TOP_FAILURE = 'MANGA_TOP_FAILURE'
}

export interface MangaTopRequestAction {
	type: MangaTopActionTypes.MANGA_TOP_REQUEST;
}

export interface MangaTopSuccessAction {
	type: MangaTopActionTypes.MANGA_TOP_SUCCESS;
	payload: MangaList[];
}

export interface MangaTopFailureAction {
	type: MangaTopActionTypes.MANGA_TOP_FAILURE;
	payload: any;
}

export type MangaTopAction =
	| MangaTopSuccessAction
	| MangaTopFailureAction
	| MangaTopRequestAction;
