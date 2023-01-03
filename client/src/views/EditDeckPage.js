import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { updateDeck } from '../store/DecksReducer/DeckSlice'
import DeckEditor from '../components/DeckEditor'

const EditDeckPage = (props) => {
    console.log('rendering edit deck page')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deckId = useParams().id
    const decks = useSelector((state) => {
        return state.decks
    })

    const thisDeck = decks.find((deck) => deck.id === deckId)
    // dispatch(setCurrentDeck(thisDeck))

    const editMydeck = async (deck) => {
        console.log('start submit deck action')
        // requirements: 3 chars, 30 action characters, name exists
        const deckCopy = { ...deck }
        if (deckCopy.deckName === '') {
            console.log('Deck needs to have a name!')
            return
        } else if (deckCopy.length !== 30) {
            console.log('Deck needs to have 30 action cards!')
            return
        } else if (deckCopy.characterCards.length !== 3) {
            console.log('Deck needs to have 3 character cards!')
            return
        }
        dispatch(updateDeck({ id: deck.id, deck: deck }))
        return navigate('/dashboard')
        // dispatch(setCurrentDeck(null))
    }

    return (
        <>
            {thisDeck === undefined ? (
                <p>No deck was found with this id...</p>
            ) : (
                <div>
                    <DeckEditor
                        submitDeck={editMydeck}
                        currentDeck={thisDeck}
                    />
                </div>
            )}
        </>
    )
}

export default EditDeckPage
