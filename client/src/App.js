import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
import Navbar from './components/Navbar'
import ViewAllCardsPage from './views/ViewAllCardsPage'
import EditDeckPage from './views/EditDeckPage'
import CreateDeckPage from './views/CreateDeckPage'
import ViewCardPage from './views/ViewCardPage'
import PageNotFound from './views/PageNotFound'

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/view_all_cards" element={<ViewAllCardsPage />} />
                <Route path="/edit_deck/:id" element={<EditDeckPage />} />
                <Route path="/create_deck" element={<CreateDeckPage />} />
                <Route
                    path="/view_card/:cardType/:id"
                    element={<ViewCardPage />}
                />
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </div>
    )
}

export default App
