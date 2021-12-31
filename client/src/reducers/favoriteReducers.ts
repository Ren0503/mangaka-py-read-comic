import {
    FavoriteAddAction,
    FavoriteAddActionTypes,
    FavoriteAddState,
    FavoriteUserAction,
    FavoriteUserActionTypes,
    FavoriteUserState,
} from 'types/favorite'

const initialAddFavoriteState: FavoriteAddState = {
    loading: false
}

export const favoriteAddReducer = (
    state: FavoriteAddState = initialAddFavoriteState,
    action: FavoriteAddAction
) => {
    switch(action.type) {
        case FavoriteAddActionTypes.FAVORITE_ADD_REQUEST:
            return { loading: true }
        case FavoriteAddActionTypes.FAVORITE_ADD_SUCCESS:
            return {
                loading: initialAddFavoriteState.loading,
                success: true,
            }
        case FavoriteAddActionTypes.FAVORITE_ADD_FAILURE:
            return {
                error: action.payload
            }
        case FavoriteAddActionTypes.FAVORITE_ADD_RESET:
            return {}
        default:
            return state
    }
}


const initialFavoriteUserState: FavoriteUserState= {
    favorites: [],
    loading: false,
}

export const favoriteUserReducer = (
    state: FavoriteUserState = initialFavoriteUserState,
    action: FavoriteUserAction
) => {
    switch (action.type) {
        case FavoriteUserActionTypes.FAVORITE_MY_REQUEST:
            return {
                loading: true,
                favorites: initialFavoriteUserState.favorites
            }
        case FavoriteUserActionTypes.FAVORITE_MY_SUCCESS:
            return {
                loading: initialFavoriteUserState.loading,
                favorites: action.payload
            }
        case FavoriteUserActionTypes.FAVORITE_MY_FAILURE:
            return {
                favorites: initialFavoriteUserState.favorites,
                error: action.payload
            }
        default:
            return state
    }
}