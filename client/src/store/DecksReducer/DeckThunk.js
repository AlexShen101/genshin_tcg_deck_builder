import { createAsyncThunk } from '@reduxjs/toolkit'

export const getDecks = createAsyncThunk(
    'decks/getAll',
    async () => {
        const response = await fetch(`http://localhost:5000/decks/`).then(data => data.json())
        return response
    }
)

export const getDeck = createAsyncThunk(
    'decks/get',
    async (id) => {
        const response = await fetch(`http://localhost:5000/decks/${id}`).then(
            (data) => data.json())
        return response
    })

export const addDeck = createAsyncThunk(
    'decks/add',
    async (deck) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deck)
        }
        const response = await fetch(`http://localhost:5000/decks`, options).then(
            (data) => data.json())
        return { ...deck, deckId: response.insertedId }
    }
)

export const deleteDeck = createAsyncThunk(
    'decks/delete',
    async (id) => {
        const options = {
            type: 'DELETE'
        }
        const response = await fetch(`http://localhost:5000/decks/${id}`, options).then(
            (data) => data.json())
    }
)

export const updateDeck = createAsyncThunk(
    'decks/update',
    async (id, deck) => {
        const options = {
            type: 'PUT',
            body: deck
        }
        const response = await fetch(`http://localhost:5000/decks/${id}`, options).then(
            (data) => data.json())
        return response
    }
)