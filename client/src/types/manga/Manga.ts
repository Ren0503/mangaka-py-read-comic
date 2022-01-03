import { Chapter } from 'types/chapter'
import { Author, Genre } from 'types/genres'

export interface Manga {
    _id: string
    name: string
    image: string
    description: string
    status: string
    views: number
    rating: number
    favorites: number
    numReviews: number
    chapters: Array<Chapter>
    createdAt: string
}

export interface Review {
    _id: string
    user: string
    name: string
    rating: number
    comment: string
    createdAt: string
}

export interface MangaList extends Manga {
    author: string
    genres: Array<string>
}

export interface MangaDetail extends Manga {
    author: Author
    genres: Array<Genre>
    reviews: Array<Review>
}