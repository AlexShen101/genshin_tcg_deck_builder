import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// We components needed
import Navbar from './components/Navbar'
import Debug from './Debug'
import PrivateRoute from './components/PrivateRoute'

import ViewAllCardsPage from './views/ViewAllCardsPage'
import EditDeckPage from './views/EditDeckPage'
import CreateDeckPage from './views/CreateDeckPage'
import ViewCardPage from './views/ViewCardPage'
import MyDecksPage from './views/MyDecksPage'
import PageNotFound from './views/PageNotFound'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'

import { useSelector, useDispatch } from 'react-redux'
import { getCards } from './store/CardsReducer/CardThunk'

import './styles/base.scss'

const App = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // check if user is logged in
    // if not, redirect to login page
    // if are, redirect to dashboard page

    dispatch(getCards())

    // this should be moved to right after the user is logged in
    // start redux things

    return (
        <BrowserRouter>
            <Debug />
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    exact
                    path="/view_all_cards"
                    element={<ViewAllCardsPage />}
                />
                <Route
                    path="/view_card/:cardType/:id"
                    element={<ViewCardPage />}
                />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<MyDecksPage />} />
                    <Route path="/create_deck" element={<CreateDeckPage />} />
                    <Route path="/edit_deck/:id" element={<EditDeckPage />} />
                </Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
