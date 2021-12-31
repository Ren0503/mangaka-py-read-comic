import {
    MangaListAction,
    MangaListActionTypes,
    MangaListState,
    MangaDetailAction,
    MangaDetailActionTypes,
    MangaDetailState,
    MangaTopAction,
    MangaTopActionTypes,
    MangaTopState,
    MangaCreateCommentAction,
    MangaCreateCommentActionTypes,
    MangaCreateCommentState,
} from 'types/manga'

const initialMangaListState: MangaListState = {
    mangas: [],
    loading: false,
}

export const mangaListReducer = (
    state: MangaListState = initialMangaListState,
    action: MangaListAction
) => {
    switch(action.type) {
        case MangaListActionTypes.MANGA_LIST_REQUEST:
            return {
                loading: true,
                mangas: initialMangaListState.mangas
            }
        case MangaListActionTypes.MANGA_LIST_SUCCESS:
            return {
                loading: initialMangaListState.loading,
                mangas: action.payload.mangas,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case MangaListActionTypes.MANGA_LIST_FAILURE:
            return {
                loading: initialMangaListState.loading,
                mangas: initialMangaListState.mangas,
                error: action.payload
            }
        default:
            return state
    }
}

const initialMangaDetailState: MangaDetailState = {
    loading: false
}

export const mangaDetailReducer = (
    state: MangaDetailState = initialMangaDetailState,
    action: MangaDetailAction
) => {
    switch(action.type) {
        case MangaDetailActionTypes.MANGA_DETAIL_REQUEST:
            return {
                loading: true,
                manga: initialMangaDetailState.manga
            }
        case MangaDetailActionTypes.MANGA_DETAIL_SUCCESS:
            return {
                loading: initialMangaDetailState.loading,
                manga: action.payload
            }
        case MangaDetailActionTypes.MANGA_DETAIL_FAILURE:
            return {
                loading: initialMangaDetailState.loading,
                manga: initialMangaDetailState.manga,
                error: action.payload
            }
        default:
            return state
    }
}


const initialMangaTopState: MangaTopState = {
    mangas: [],
    loading: false
}

export const mangaTopReducer = (
    state: MangaTopState = initialMangaTopState,
    action: MangaTopAction
) => {
    switch (action.type) {
        case MangaTopActionTypes.MANGA_TOP_REQUEST:
            return {
                loading: true,
                mangas: initialMangaTopState.mangas
            }
        case MangaTopActionTypes.MANGA_TOP_SUCCESS:
            return {
                loading: initialMangaTopState.loading,
                mangas: action.payload
            }
        case MangaTopActionTypes.MANGA_TOP_FAILURE:
            return {
                mangas: initialMangaListState.mangas,
                error: action.payload
            }
        default:
            return state
    }
}

const initialMangaCreateCommentState: MangaCreateCommentState = {
    loading: false
}

export const mangaCreateCommentReducer = (
    state: MangaCreateCommentState = initialMangaCreateCommentState,
    action: MangaCreateCommentAction
) => {
    switch(action.type) {
        case MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_REQUEST:
            return { loading: true }
        case MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_SUCCESS:
            return {
                loading: initialMangaCreateCommentState.loading,
                success: true
            }
        case MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_FAILURE:
            return {
                error: action.payload
            }
        case MangaCreateCommentActionTypes.MANGA_CREATE_COMMENT_RESET:
            return {}
        default:
            return state
    }
}