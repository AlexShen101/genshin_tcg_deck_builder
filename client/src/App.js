import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// We components needed
import Navbar from './components/Navbar'
import Debug from './Debug'

import ViewAllCardsPage from './views/ViewAllCardsPage'
import EditDeckPage from './views/EditDeckPage'
import CreateDeckPage from './views/CreateDeckPage'
import ViewCardPage from './views/ViewCardPage'
import MyDecksPage from './views/MyDecksPage'
import PageNotFound from './views/PageNotFound'
import ImportDecksPage from './views/ImportDecksPage'

import { useDispatch, useSelector } from 'react-redux'
import { getCards } from './store/CardsReducer/CardThunk'

import { ToastDefaultContainer } from './components/toast/ToastContainerDesigns'

import './styles/base.scss'

let init = true

const App = () => {
    const dispatch = useDispatch()

    // runs only on first mount of App
    useEffect(() => {
        if (init) {
            dispatch(getCards())
            init = false
        }
    }, [init])

    return (
        <BrowserRouter>
            <Debug />
            <Navbar />
            <ToastDefaultContainer />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                    exact
                    path="/view_all_cards"
                    element={<ViewAllCardsPage />}
                />
                <Route
                    path="/view_card/:cardType/:id"
                    element={<ViewCardPage />}
                />
                <Route path="/dashboard" element={<MyDecksPage />} />
                <Route path="/create_deck" element={<CreateDeckPage />} />
                <Route path="/edit_deck/:id" element={<EditDeckPage />} />
                <Route path="/import_decks" element={<ImportDecksPage />} />
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
