import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// We components needed
import Navbar from './components/Navbar'
import ViewAllCardsPage from './views/ViewAllCardsPage'
// import EditDeckPage from './views/EditDeckPage'
import CreateDeckPage from './views/CreateDeckPage'
import ViewCardPage from './views/ViewCardPage'
import MyDecksPage from './views/MyDecksPage'
import PageNotFound from './views/PageNotFound'

import { useSelector, useDispatch } from 'react-redux'
import { getDecks } from './store/DecksReducer/DeckThunk'

const App = () => {
    // start redux things
    const dispatch = useDispatch()
    dispatch(getDecks())

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    exact
                    path="/view_all_cards"
                    element={<ViewAllCardsPage />}
                />
                {/* <Route path="/edit_deck/:id" element={<EditDeckPage />} /> */}
                <Route path="/create_deck" element={<CreateDeckPage />} />
                <Route
                    path="/view_card/:cardType/:id"
                    element={<ViewCardPage />}
                />
                <Route path="/my_decks" element={<MyDecksPage />} />
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
