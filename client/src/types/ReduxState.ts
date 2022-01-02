import {
    UserLoginState,
    UserRegisterState,
    UserDetailState,
    UserUpdateProfileState,
} from './user'

import {
    MangaListState,
    MangaDetailState,
    MangaTopState,
    MangaCreateReviewState,
} from './manga'

import {
    ChapterDetailState
} from './chapter'

import {
    FavoriteAddState,
    FavoriteUserState,
} from './favorite'

import {
    GenreListState
} from './genres'

export interface ReduxState {
    userLogin: UserLoginState
	userRegister: UserRegisterState
	userDetail: UserDetailState
	userUpdateProfile: UserUpdateProfileState
    mangaList: MangaListState
    mangaDetail: MangaDetailState
    mangaTop: MangaTopState
    mangaCreateReview: MangaCreateReviewState
    chapterDetail: ChapterDetailState
    favoriteAdd: FavoriteAddState
    favoriteUser: FavoriteUserState
    genreList: GenreListState
}