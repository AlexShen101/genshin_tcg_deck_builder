import { createSlice } from '@reduxjs/toolkit'
import { makeToastConfirmation } from '../../components/toast/ToastDesigns'

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
            state.push(newDeck)
            localStorage.setItem('decks', JSON.stringify(state))
            makeToastConfirmation(
                'successfully added deck: ' + newDeck.deckName
            )
            return state
        },
        deleteDeck: (state, action) => {
            const id = action.payload
            const removedDeck = state.find((deck) => deck.id === id)
            state = state.filter((deck) => deck.id !== id)
            localStorage.setItem('decks', JSON.stringify(state))
            makeToastConfirmation(
                'successfully deleted deck: ' + removedDeck.deckName
            )
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
            makeToastConfirmation(
                'successfully updated deck: ' + newDeck.deckName
            )
        },
        setDecks: (state, action) => {
            state = action.payload
            localStorage.setItem('decks', JSON.stringify(state))
            if (action.payload == []) {
                makeToastConfirmation('Successfully removed all decks')
            } else {
                makeToastConfirmation('Successfully set decks')
            }
            return state
        },
    },
})

export const { addDeck, deleteDeck, updateDeck, setDecks } = deckSlice.actions
export default deckSlice.reducer
