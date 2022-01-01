import {
    Genre,
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