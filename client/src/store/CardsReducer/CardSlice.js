import { createSlice } from '@reduxjs/toolkit'
import { getCards } from './CardThunk'
import { makeToastConfirmation } from '../../components/toast/ToastDesigns'

const cardSlice = createSlice({
    name: 'cards',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state = action.payload
                makeToastConfirmation("Successfully retrieved card data!")
                return state
            })
            .addMatcher(
                (action) => {
                    if (action.type) return action.type.endsWith('pending')
                },
                (state, action) => {
                    return "loading"
                }
            )
            .addMatcher(
                (action) => {
                    if (action.type) return action.type.endsWith('rejected')
                },
                (state, action) => {
                    return []
                }
            )
    },
})

export default cardSlice.reducer
