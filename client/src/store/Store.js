import { configureStore } from '@reduxjs/toolkit'

import decksReducer from './DecksReducer/DecksSlice'
import currentDeckReducer from './CurrentDeckReducer/CurrentDeckSlice'

// combine reducers here

const store = configureStore({
    reducer: {
        decks: decksReducer,
        currentDeck: currentDeckReducer,
    },
})

export default store
