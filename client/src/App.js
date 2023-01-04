import React from 'react'
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

import { useDispatch } from 'react-redux'
import { getCards } from './store/CardsReducer/CardThunk'

import './styles/base.scss'

const App = () => {
    const dispatch = useDispatch()
    dispatch(getCards())

    return (
        <BrowserRouter>
            <Debug />
            <Navbar />
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
