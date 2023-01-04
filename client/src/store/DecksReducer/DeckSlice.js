import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {
    let savedDecks = localStorage.getItem('decks')
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
            const newDeck = action.payload
            for (const deck of state) {
                if (newDeck.id === deck.id) {
                    return state
                }
            }
            state.push(action.payload)
            localStorage.setItem('decks', JSON.stringify(state))
            return state
        },
        deleteDeck: (state, action) => {
            const id = action.payload
            state = state.filter((deck) => deck.id !== id)
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
        },
        setDecks: (state, action) => {
            state = action.payload
            localStorage.setItem('decks', JSON.stringify(state))
            return state
        }
    },
})

export const { addDeck, deleteDeck, updateDeck, setDecks } = deckSlice.actions
export default deckSlice.reducer
