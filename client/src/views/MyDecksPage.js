import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deleteDeck, updateDeck } from '../store/DecksReducer/DeckSlice'

const MyDecksPage = () => {
    console.log("rendering myDecksPage")
    const dispatch = useDispatch()
    const decks = useSelector((state) => {
        return state.decks
    })
    const [search, setSearch] = useState("")

    if (decks === "loading") {
        return <p>Loading</p>
    }

    const decksToDisplay = decks.filter((deck) => deck.deckName.toLowerCase().includes(search.toLowerCase()))

    const makeDeckList = (inputDecks) => {
        return inputDecks.map((deck) => {
            return (
                <tr key={`${deck.id}`} className="">
                    <th className="">
                        <p className="deck-page-deck-title">{deck.deckName}</p>
                    </th>
                    <th className="d-flex justify-content-between">
                        <Link to={`/edit_deck/${deck.id}`}
                            className="nav-link">
                            Edit Deck
                        </Link>
                        <button className="btn btn-danger mx-2" onClick={() => dispatch(deleteDeck(deck.id))}>
                            {' '}
                            Delete Deck
                        </button>
                    </th>
                </tr>
            )
        })
    }

    // This following section will display the table with the records of individuals.
    return (
        <div className=''>
            <div className='container-fluid'>
                <h3 className=''>My Decks</h3>
                <input
                    className="form-control mb-4"
                    type="string"
                    name="filter_card_input"
                    value={search}
                    placeholder="Search for cards here"
                    onChange={(event) => setSearch(event.target.value)}
                ></input>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className=''>Deck Name</th>
                    </tr>
                </thead>
                <tbody>{makeDeckList(decksToDisplay)}</tbody>
            </table>
        </div >
    )
}

export default MyDecksPage
