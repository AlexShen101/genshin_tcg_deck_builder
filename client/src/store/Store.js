import { configureStore } from '@reduxjs/toolkit'

import decksReducer from './DecksReducer/DeckSlice'
import currentDeckReducer from './CurrentDeckReducer/CurrentDeckSlice'
import cardsReducer from './CardsReducer/CardSlice'
import userReducer from './UserReducer/UserSlice'

// combine reducers here
const store = configureStore({
    reducer: {
        decks: decksReducer,
        currentDeck: currentDeckReducer,
        cards: cardsReducer,
        user: userReducer
    },
})

export default store
