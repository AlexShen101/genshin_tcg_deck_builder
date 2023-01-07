import { configureStore } from '@reduxjs/toolkit'

import decksReducer from './DecksReducer/DeckSlice'
import cardsReducer from './CardsReducer/CardSlice'
import errorReducer from './ErrorReducer/ErrorSlice'

// combine reducers here
const store = configureStore({
    reducer: {
        decks: decksReducer,
        cards: cardsReducer,
        error: errorReducer,
    },
})

export default store
