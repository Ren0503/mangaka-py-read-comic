import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    MangaScreen,
    ChapterScreen,
} from 'screens/Manga'

export default function HomeRoutes() {
    return (
        <Switch>
            <Route path='/manga/:mangaId' component={MangaScreen} exact />
            <Route path='/manga/:mangaId/chapter/:chapterId' component={ChapterScreen} exact />
        </Switch>
    )
};