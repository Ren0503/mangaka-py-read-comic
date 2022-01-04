import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Header, Footer, Menu } from 'components/core'
import { ScrollToTop } from 'components/shared'

import HomeRoutes from 'routes/HomeRoutes'
import AuthRoutes from 'routes/AuthRoutes'
import MangaRoutes from 'routes/MangaRoutes'

import image from 'assets/scrollToTop.png'

import "styles/modules.css"
import "styles/layout.css"
import GenreRoutes from 'routes/GenreRoutes'

const App = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, [])

    return (
        <Router>
            <ScrollToTop />
            <Header />
            <Menu />
            <main className='py-3'>
                <Container>
                    <HomeRoutes />
                    <AuthRoutes />
                    <GenreRoutes />
                    <MangaRoutes />
                </Container>
            </main>
            <div className="scroll-to-top">
                {visible &&
                    <div onClick={scrollToTop}>
                        <img src={image} alt='Go to top' width="50" />
                    </div>
                }
            </div>
            <Footer />
        </Router>
    )
}

export default App
