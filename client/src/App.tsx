import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Header, Footer } from 'components/core'
import HomeScreen from 'screens/HomeScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route exact path='/search/:keyword' component={HomeScreen} />
                    <Route exact path='/page/:pageNumber' component={HomeScreen} />
                    <Route
                        exact
                        path='/search/:keyword/page/:pageNumber'
                        component={HomeScreen}
                    />
                    <Route path='/' component={HomeScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
