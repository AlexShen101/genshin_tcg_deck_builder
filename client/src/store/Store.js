import { configureStore } from '@reduxjs/toolkit'

import decksReducer from './DecksReducer/DeckSlice'
import currentDeckReducer from './CurrentDeckReducer/CurrentDeckSlice'
import cardsReducer from './CardsReducer/CardSlice'

// combine reducers here
const store = configureStore({
    reducer: {
        decks: decksReducer,
        currentDeck: currentDeckReducer,
        cards: cardsReducer,
    },
})

export default store
