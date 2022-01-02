import {
    AdvSearchAction,
    AdvSearchActionTypes,
    AdvSearchState,
    AuthorDetailAction,
    AuthorDetailActionTypes,
    AuthorDetailState,
    Genre,
    GenreDetailAction,
    GenreDetailActionTypes,
    GenreDetailState,
    GenreListAction,
    GenreListActionTypes,
    GenreListState,
} from 'types/genres'

const initialGenreListState: GenreListState = {
    loading: false,
    genres: []
}

export const genresListReducer = (
    state: GenreListState = initialGenreListState,
    action: GenreListAction
) => {
    switch(action.type) {
        case GenreListActionTypes.GENRE_LIST_REQUEST:
            return {
                loading: true,
                genres: initialGenreListState.genres
            }
        case GenreListActionTypes.GENRE_LIST_SUCCESS:
            return {
                loading: initialGenreListState.loading,
                genres: action.payload
            }
        case GenreListActionTypes.GENRE_LIST_FAILURE:
            return {
                genres: initialGenreListState.genres,
                error: action.payload
            }
        default:
            return state
    }
}

const initialGenreDetailState: GenreDetailState = {
    loading: false
}

export const genreDetailReducer = (
    state: GenreDetailState = initialGenreDetailState,
    action: GenreDetailAction
) => {
    switch(action.type) {
        case GenreDetailActionTypes.GENRE_DETAIL_REQUEST:
            return {
                loading: true,
                genre: initialGenreDetailState.genre
            }
        case GenreDetailActionTypes.GENRE_DETAIL_SUCCESS:
            return {
                loading: initialGenreDetailState.loading,
                genre: action.payload
            }
        case GenreDetailActionTypes.GENRE_DETAIL_FAILURE:
            return {
                loading: initialGenreDetailState.loading,
                genre: initialGenreDetailState.genre,
                error: action.payload
            }
        default:
            return state
    }
}



const initialAuthorDetailState: AuthorDetailState = {
    loading: false
}

export const authorDetailReducer = (
    state: AuthorDetailState = initialAuthorDetailState,
    action: AuthorDetailAction
) => {
    switch(action.type) {
        case AuthorDetailActionTypes.AUTHOR_DETAIL_REQUEST:
            return {
                loading: true,
                author: initialAuthorDetailState.author
            }
        case AuthorDetailActionTypes.AUTHOR_DETAIL_SUCCESS:
            return {
                loading: initialGenreDetailState.loading,
                author: action.payload
            }
        case AuthorDetailActionTypes.AUTHOR_DETAIL_FAILURE:
            return {
                loading: initialGenreDetailState.loading,
                author: initialAuthorDetailState.author,
                error: action.payload
            }
        default:
            return state
    }
}

const initialAdvSearchState: AdvSearchState = {
    mangas: [],
    loading: false,
}

export const advSearchReducer = (
    state: AdvSearchState = initialAdvSearchState,
    action: AdvSearchAction
) => {
    switch(action.type) {
        case AdvSearchActionTypes.ADV_SEARCH_REQUEST:
            return {
                loading: true,
                mangas: initialAdvSearchState.mangas
            }
        case AdvSearchActionTypes.ADV_SEARCH_SUCCESS:
            return {
                loading: initialAdvSearchState.loading,
                mangas: action.payload.mangas,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case AdvSearchActionTypes.ADV_SEARCH_FAILURE:
            return {
                loading: initialAdvSearchState.loading,
                mangas: initialAdvSearchState.mangas,
                error: action.payload
            }
        default:
            return state
    }
}