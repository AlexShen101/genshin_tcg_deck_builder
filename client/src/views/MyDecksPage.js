import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deleteDeck, setDecks } from '../store/DecksReducer/DeckSlice'

const MyDecksPage = () => {
    console.log('rendering myDecksPage')
    const dispatch = useDispatch()
    const decks = useSelector((state) => {
        return state.decks
    })
    const [search, setSearch] = useState('')

    const decksToDisplay = decks.filter((deck) =>
        deck.deckName && deck.deckName.toLowerCase().includes(search.toLowerCase())
    )

    const clearAllDecks = () => {
        let newDecks = []
        dispatch(setDecks(newDecks))
    }

    const makeDeckList = (inputDecks) => {
        return inputDecks.map((deck) => {
            return (
                <tr key={`${deck.id}`} className="">
                    <th className="w-50 align-middle">
                        <p className="deck-page-deck-title">{deck.deckName}</p>
                    </th>
                    <th className="d-flex justify-content-end mw-50">
                        <Link to={`/edit_deck/${deck.id}`} className="nav-link mx-2">
                            Edit Deck
                        </Link>
                        <button
                            className="btn btn-info mx-2"
                            onClick={(e) => {
                                e.preventDefault()
                                downloadDeck(deck, deck.deckName)
                            }}
                        >
                            Download Deck
                        </button>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => dispatch(deleteDeck(deck.id))}
                        >
                            {' '}
                            Delete Deck
                        </button>
                    </th>
                </tr>
            )
        })
    }

    const downloadDeck = (deck, exportName) => {
        // there are many things that might go wrong with a file download
        // ideal sol would be "attempt" and catch errors
        let dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(deck))
        let downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', dataStr)
        downloadAnchorNode.setAttribute('download', exportName + '.json')
        document.body.appendChild(downloadAnchorNode) // required for firefox
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    // This following section will display the table with the records of individuals.
    return (
        <div className="">
            <div className="container-fluid mb-4">
                <h3 className="">My Decks</h3>
                <input
                    className="form-control mb-2"
                    type="string"
                    name="filter_card_input"
                    value={search}
                    placeholder="Search for cards here"
                    onChange={(event) => setSearch(event.target.value)}
                ></input>
                <button
                    className="btn btn-info"
                    onClick={(e) => {
                        e.preventDefault()
                        downloadDeck(decks, "Genshin TCG Deck Builder Decks")
                    }}
                >
                    Download All Decks
                </button>
                <button
                    className='btn btn-danger mx-4'
                    onClick={clearAllDecks}>Clear All Decks</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="">Deck Name</th>
                    </tr>
                </thead>
                <tbody>{makeDeckList(decksToDisplay)}</tbody>
            </table>
        </div>
    )
}

export default MyDecksPage
