import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Header, Footer, Menu } from 'components/core'
import HomeScreen from 'screens/HomeScreen'
import { LoginScreen, RegisterScreen } from 'screens/Auth'
import { ChapterScreen, MangaScreen } from 'screens/Manga'
import ProfileScreen from 'screens/User/ProfileScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <Menu />
            <main className='py-3'>
                <Container>
                    <Switch>
                        <Route path='/login' component={LoginScreen} />
                        <Route path='/register' component={RegisterScreen} />
                        <Route path='/profile' component={ProfileScreen} />
                        <Route path='/manga/:id' component={MangaScreen} />
                        <Route path='/chapter/:id' component={ChapterScreen} />
                        <Route exact path='/search/:keyword' component={HomeScreen} />
                        <Route exact path='/page/:pageNumber' component={HomeScreen} />
                        <Route
                            exact
                            path='/search/:keyword/page/:pageNumber'
                            component={HomeScreen}
                        />
                        <Route exact path='/' component={HomeScreen} />
                    </Switch>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
