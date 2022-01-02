import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    GenreScreen,
    AuthorScreen,
} from 'screens/Genre'

export default function GenreRoutes() {
    return (
        <Switch>
            <Route path='/genres/:id' component={GenreScreen} />
            <Route path='/author/:id' component={AuthorScreen} />
        </Switch>
    )
};