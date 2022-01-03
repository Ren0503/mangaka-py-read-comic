import {
    ChapterDetailAction,
    ChapterDetailActionTypes,
    ChapterDetailState,
    ChapterListAction,
    ChapterListActionTypes,
    ChapterListState
} from 'types/chapter'

const initialChapterListState: ChapterListState = {
    loading: false,
    chapters: []
}

export const chapterListReducer = (
    state: ChapterListState = initialChapterListState,
    action: ChapterListAction
) => {
    switch(action.type) {
        case ChapterListActionTypes.CHAPTER_LIST_REQUEST:
            return {
                loading: true,
                chapters: initialChapterListState.chapters
            }
        case ChapterListActionTypes.CHAPTER_LIST_SUCCESS:
            return {
                loading: initialChapterListState.loading,
                chapters: action.payload
            }
        case ChapterListActionTypes.CHAPTER_LIST_FAILURE:
            return {
                chapters: initialChapterListState.chapters,
                error: action.payload
            }
        default:
            return state
    }
}

const initialChapterDetailState: ChapterDetailState = {
    loading: false
}

export const chapterDetailReducer = (
    state: ChapterDetailState = initialChapterDetailState,
    action: ChapterDetailAction
) => {
    switch(action.type) {
        case ChapterDetailActionTypes.CHAPTER_DETAIL_REQUEST:
            return {
                loading: true,
                chapter: initialChapterDetailState.chapter
            }
        case ChapterDetailActionTypes.CHAPTER_DETAIL_SUCCESS:
            return {
                loading: initialChapterDetailState.loading,
                chapter: action.payload
            }
        case ChapterDetailActionTypes.CHAPTER_DETAIL_FAILURE:
            return {
                loading: initialChapterDetailState.loading,
                chapter: initialChapterDetailState.chapter,
                error: action.payload
            }
        default:
            return state
    }
}