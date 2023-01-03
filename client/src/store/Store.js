import { configureStore } from '@reduxjs/toolkit'

import decksReducer from './DecksReducer/DeckSlice'
import cardsReducer from './CardsReducer/CardSlice'

// combine reducers here
const store = configureStore({
    reducer: {
        decks: decksReducer,
        cards: cardsReducer,
    },
})

export default store
