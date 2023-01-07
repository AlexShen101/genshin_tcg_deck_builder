import { createSlice, isRejected } from '@reduxjs/toolkit'
import { makeToastError } from '../../components/toast/ToastDesigns'

const errorSlice = createSlice({
    name: 'decks',
    initialState: null,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(isRejected, (state, action) => {
            state = action.error
            console.log(action)
            makeToastError(`Error: ${action.type.replace("/rejected", "")}  ${state.message.toLowerCase()}`)
            // don't update state
        })
    }
})

export default errorSlice.reducer
