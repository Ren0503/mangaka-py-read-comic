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
    ChapterDetailState, 
    ChapterListState
} from './chapter'

import {
    FavoriteAddState,
    FavoriteUserState,
} from './favorite'

import {
    GenreListState,
    GenreDetailState,
    AuthorDetailState,
    AdvSearchState,
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
    chapterList: ChapterListState
    favoriteAdd: FavoriteAddState
    favoriteUser: FavoriteUserState
    genreList: GenreListState
    genreDetail: GenreDetailState
    authorDetail: AuthorDetailState
    advSearch: AdvSearchState
}