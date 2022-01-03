import { combineReducers } from 'redux'

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailReducer,
	userUpdateProfileReducer,
} from './userReducers'

import {
    mangaListReducer,
    mangaDetailReducer,
    mangaTopReducer,
    mangaCreateReviewReducer,
} from './mangaReducers'

import {
    chapterDetailReducer, 
    chapterListReducer
} from './chapterReducers'

import {
    favoriteAddReducer,
    favoriteUserReducer,
} from './favoriteReducers'

import {
    genresListReducer,
    genreDetailReducer,
    authorDetailReducer,
    advSearchReducer,
} from './genreReducer'

import { ReduxState } from 'types/ReduxState';

const reducer = combineReducers<ReduxState>({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetail: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
    mangaList: mangaListReducer,
    mangaDetail: mangaDetailReducer,
    mangaTop: mangaTopReducer,
    mangaCreateReview: mangaCreateReviewReducer,
    chapterDetail: chapterDetailReducer,
    chapterList: chapterListReducer,
    favoriteAdd: favoriteAddReducer,
    favoriteUser: favoriteUserReducer,
    genreList: genresListReducer,
    genreDetail: genreDetailReducer,
    authorDetail: authorDetailReducer,
    advSearch: advSearchReducer,
});

export default reducer;