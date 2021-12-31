import {
    ChapterDetailAction,
    ChapterDetailActionTypes,
    ChapterDetailState
} from 'types/chapter'

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