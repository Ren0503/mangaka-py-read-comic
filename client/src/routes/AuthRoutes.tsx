import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    LoginScreen,
    ProfileScreen,
    RegisterScreen,
} from 'screens/Auth'

export default function AuthRoutes() {
    return (
        <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen} />
        </Switch>
    )
}