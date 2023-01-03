import { createSlice } from '@reduxjs/toolkit'
import { getDecks, getDeck, addDeck, deleteDeck, updateDeck } from './DeckThunk'

const deckSlice = createSlice({
    name: 'decks',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDecks.fulfilled, (state, action) => {
                state = action.payload
                return state
            })
            .addCase(getDeck.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(addDeck.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(deleteDeck.fulfilled, (state, action) => {
                // action payload is the id of the deck deleted
                console.log("new state")
                let id = action.payload
                state = state.filter((deck) => {
                    return deck._id !== id
                })
                return state
            })
            .addCase(updateDeck.fulfilled, (state, action) => {
                let id = action.payload._id
                let newDeck = action.payload
                for (let i = 0; i < state.length; i++) {
                    if (state[i]._id === id) {
                        state[i] = newDeck
                    }
                }
                return state
            })
            // .addMatcher(
            //     // if the action name ends with rejected, perform the following function
            //     (action) => {
            //         if (action.type) return action.type.endsWith('pending')
            //     },
            //     (state, action) => {
            //         return "loading"
            //     }
            // )
            .addMatcher(
                // if the action name ends with rejected, perform the following function
                (action) => {
                    if (action.type) return action.type.endsWith('rejected')
                },
                (state, action) => {
                    console.log(action.type + ' was rejected')
                    console.log(action)
                }
            )
    },
})

export default deckSlice.reducer