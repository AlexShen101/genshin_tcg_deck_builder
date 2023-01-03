import { createSlice } from '@reduxjs/toolkit'
import { addUser, deleteUser, updateUser } from './UserThunk'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            if (action == null || action.payload == null) {
                return null
            }
            return action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state = null
                return state
            })
            .addCase(updateUser.fulfilled, (state, action) => {
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

export const { setUsesr } = userSlice.actions
export default userSlice.reducer
