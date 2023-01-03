import { createAsyncThunk } from '@reduxjs/toolkit'

export const addUser = createAsyncThunk('users/add', async (user) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }
    const response = await fetch(`http://localhost:5000/users`, options).then(
        (data) => data.json()
    )
    const _id = response.insertedId
    return { ...user, id: _id }
})

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(
        `http://localhost:5000/users/${id}`, options
    ).then((data) => data.json())
    // this response is just a confirmation json
    return response
})

export const updateUser = createAsyncThunk(
    'users/update',
    async ({ id, user: newUser }) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }
        const response = await fetch(
            `http://localhost:5000/users/${id}`,
            options
        ).then((data) => data.json())
        return response
    }
)
