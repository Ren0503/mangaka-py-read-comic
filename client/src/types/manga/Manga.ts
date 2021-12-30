import { Chapter } from 'types/chapter';
import { Author, Genre } from 'types/genres';

export interface Manga {
    _id: string
    name: string
    image: string
    description: string
    status: string
    views: number
    createdAt: string
}

export interface Comment {
    _id: string
    user: string
    name: string
    body: string
    createdAt: string
}

export interface MangaList extends Manga {
    author: string
    genres: Array<string>
}

export interface MangaDetail extends Manga {
    author: Author
    genre: Array<Genre>
    comments: Array<Comment>
    chapters: Array<Chapter>
}