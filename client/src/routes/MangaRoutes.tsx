import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    MangaScreen,
    ChapterScreen,
} from 'screens/Manga'

export default function HomeRoutes() {
    return (
        <Switch>
            <Route path='/manga/:id' component={MangaScreen} />
            <Route path='/chapter/:id' component={ChapterScreen} />
        </Switch>
    )
};