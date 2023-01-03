import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {
    let savedDecks = localStorage.getItem('decks')
    console.log(savedDecks)
    console.log(JSON.parse(savedDecks))
    if (savedDecks == null) {
        return []
    } else {
        return JSON.parse(savedDecks)
    }
}

const deckSlice = createSlice({
    name: 'decks',
    initialState: getInitialState(),
    reducers: {
        addDeck: (state, action) => {
            state.push(action.payload)
            localStorage.setItem('decks', JSON.stringify(state))
            return state
        },
        deleteDeck: (state, action) => {
            const id = action.payload
            state = state.filter(deck => deck.id !== id)
            localStorage.setItem('decks', JSON.stringify(state))
            return state
        },
        updateDeck: (state, action) => {
            const id = action.payload.id
            const newDeck = action.payload
            for (var i = 0; i < state.length; i++) {
                if (state[i].id === id) {
                    state[i] = newDeck
                }
            }
            localStorage.setItem('decks', JSON.stringify(state))
            return newDeck
        }
    },
})

export const { addDeck, deleteDeck, updateDeck } = deckSlice.actions
export default deckSlice.reducer
