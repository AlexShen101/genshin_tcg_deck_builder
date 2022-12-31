import { createSlice, current } from '@reduxjs/toolkit'

console.log('loading currentDeckSlice')

const initialState = {
    deckName: '',
    characterCards: [],
    actionCards: [],
    length: 0,
}

const getInitialState = () => {
    // let localDeck = window.localStorage.getItem('deck')
    // let result = localDeck != 'null' && localDeck != null
    // if (result) return JSON.parse(localDeck)
    // else return initialState
    return initialState
}
const currentDeckSlice = createSlice({
    name: 'cards',
    initialState: getInitialState(),
    reducers: {
        setCurrentDeck: (state, action) => {
            if (action == null || action.payload == null) {
                return initialState
            }
            return action.payload
        },
    },
})

export const { setCurrentDeck } = currentDeckSlice.actions
export default currentDeckSlice.reducer
