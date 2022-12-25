import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
import Navbar from './components/Navbar'
import CardListPage from './components/CardListPage'
import EditDeckPage from './components/EditDeckPage'
import CreateDeckPage from './components/CreateDeckPage'
import ViewCardPage from './components/ViewCardPage'
import PageNotFound from './components/PageNotFound'

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<CardListPage />} />
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
