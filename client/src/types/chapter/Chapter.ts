export interface Chapter {
    _id: string
    name: string
    views: number
    createdAt: string
}

export interface ChapterImage {
    _id: string
    image: string
    page: number
    createdAt: string
}

export interface ChapterDetail {
    chapterImages: Array<ChapterImage>
}