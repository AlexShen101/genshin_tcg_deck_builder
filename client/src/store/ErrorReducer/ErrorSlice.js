import { createSlice } from '@reduxjs/toolkit'

const autoError = (state, action) => {
    // this looks through action, and gets the error property of the action object
    const { error } = action

    if (error) {
        console.log(error)
        return error
    } else {
        return state
    }
}


const errorSlice = createSlice({
    name: 'decks',
    initialState: null,
    reducers: {
        // for manually creating a custom error
        setError: (state, action) => {
            state = action.payload
            return state
        },
    },
})

export const { setError } = errorSlice.actions
export default errorSlice.reducer
