import { Manga } from 'types/manga'

export interface Favorite {
    _id: string
    user: {
        _id: string
        name: string
    }
    manga: Manga
}