import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deleteDeck, editDeck } from '../store/DecksReducer/DeckThunk'

const MyDecksPage = () => {
    const dispatch = useDispatch()
    const decks = useSelector((state) => {
        return state.decks
    })

    const editDeck = (id) => {
        // open the edit deck page
        let deck = decks.find((deck) => deck._id === id)
    }

    const makeDeckList = () => {
        return decks.map((deck) => {
            return (
                <tr key={`${deck._id}`}>
                    <th>
                        {deck.deckName}
                        <Link to={`/edit_deck/${deck._id}`}>
                            Edit Deck
                        </Link>
                        <button onClick={() => dispatch(deleteDeck(deck._id))}>
                            {' '}
                            Delete Deck
                        </button>
                    </th>
                    <th>
                        {deck.characterCards.map((card) => {
                            return card.name + ' '
                        })}
                    </th>
                </tr>
            )
        })
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>My Decks</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Deck Name</th>
                        <th>Characters</th>
                    </tr>
                </thead>
                <tbody>{makeDeckList()}</tbody>
            </table>
        </div>
    )
}

export default MyDecksPage
