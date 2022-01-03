import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    GenreScreen,
    AuthorScreen,
} from 'screens/Genre'

export default function GenreRoutes() {
    return (
        <Switch>
            <Route path='/genres/:genreId' component={GenreScreen} />
            <Route path='/author/:authorId' component={AuthorScreen} />
        </Switch>
    )
};