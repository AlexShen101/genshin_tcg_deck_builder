import { createSlice } from '@reduxjs/toolkit'
import { getCards } from './CardThunk'

const cardSlice = createSlice({
    name: 'cards',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state = action.payload
                return state
            })
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

export default cardSlice.reducer
