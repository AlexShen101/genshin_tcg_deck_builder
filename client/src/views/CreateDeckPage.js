import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import CardList from '../components/CardList'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../components/Card'

import { setCurrentDeck } from '../store/CurrentDeckReducer/CurrentDeckSlice'
import { addDeck } from '../store/DecksReducer/DeckThunk'

// See CurrentDeckSlice for the deck state structure
const CreateDeckPage = () => {
    console.log("rendering page")
    let deck = useSelector((state) => {
        return state.currentDeck
    })
    window.localStorage.setItem('deck', typeof (deck) == 'object' ? JSON.stringify(deck) : deck);

    const dispatch = useDispatch()
    // add a given card to the deck or throw an alert otherwise
    const addCardToDeck = (card) => {
        // spreading is just used to clone the deck
        let newDeck = { ...deck }

        if (card.cardType === "character") {
            // TODO: reason why I'm only spreading characterCards vs the entire deck is that spreading the deck still keeps characterCards immutable
            let characterCards = [...newDeck.characterCards]
            // requirements: no duplicates and can't have more than 3 characters
            if (characterCards.length === 3) return
            else if (characterCards.find(item => item.name === card.name)) return
            else characterCards.push(card)
            newDeck = {
                ...newDeck,
                characterCards: characterCards
            }
        } else {
            let actionCards = [...newDeck.actionCards]
            // requirements: max of 2 cards per action card. can't have more than 30 cards
            if (newDeck.length === 30) {
                return
            }
            let cardInDeck = false
            for (let i = 0; i < actionCards.length; i++) {
                // check if new card is already in deck
                if (actionCards[i].name === card.name) {
                    cardInDeck = true
                    if (actionCards[i].count === 2) return
                    else {
                        let newCard = { ...actionCards[i], count: 2 }
                        actionCards[i] = newCard
                    }
                }
            }
            if (!cardInDeck) actionCards.push({ ...card, count: 1 })
            newDeck = {
                ...newDeck,
                actionCards: actionCards,
                length: (deck.length + 1)
            }
        }
        dispatch(setCurrentDeck(newDeck))
    }

    const removeCardFromDeck = (card) => {
        let newDeck = {
            ...deck,
            characterCards: [...deck.characterCards],
            actionCards: [...deck.actionCards]
        } // spreading is just used to clone the deck

        if (card.cardType === "character") {
            for (let i = 0; i < newDeck.characterCards.length; i++) {
                if (newDeck.characterCards[i].name === card.name) {
                    newDeck.characterCards.splice(i, 1)
                }
            }
        } else {
            for (let i = 0; i < newDeck.actionCards.length; i++) {
                if (newDeck.actionCards[i].name === card.name) {
                    if (newDeck.actionCards[i].count === 1) {
                        newDeck.actionCards.splice(i, 1)
                    } else {
                        let cardCopy = { ...newDeck.actionCards[i] }
                        cardCopy.count = 1
                        newDeck.actionCards[i] = cardCopy
                    }
                    newDeck.length -= 1
                }
            }
        }
        dispatch(setCurrentDeck(newDeck))
    }

    const submitDeck = async (e) => {
        e.preventDefault()
        console.log('start submit deck action')
        // requirements: 3 chars, 30 action characters, name exists
        const deckCopy = { ...deck }
        if (deckCopy.deckName === "") {
            console.log("Deck needs to have a name!")
            return
        } else if (deckCopy.length !== 30) {
            console.log("Deck needs to have 30 action cards!")
            return
        } else if (deckCopy.characterCards.length !== 3) {
            console.log("Deck needs to have 3 character cards!")
            return
        }
        dispatch(addDeck(deck))
        dispatch(setCurrentDeck(null))
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            {/* This div takes left hand column */}
            <div>
                <h3>My Deck</h3>
                <form onSubmit={submitDeck}>
                    <input name="deck_name"
                        onChange={(e) => {
                            let newDeck = { ...deck, deckName: e.target.value }
                            dispatch(setCurrentDeck(newDeck))
                        }}
                        value={deck.deckName}></input>
                    <button onClick={submitDeck}>Create Deck</button>
                </form>
                <p>Character Cards</p>
                {deck != null && deck.characterCards.map((card) => {
                    return (
                        // <Card key={card.id} card={card} />
                        <div key={`${card.name}_div`}>
                            <p key={`${card.name}_text`}>{card.name}</p>
                            <button
                                key={`${card.name}_button`}
                                onClick={() => removeCardFromDeck(card)}>
                                Remove</button>
                        </div>
                    )
                })}
                <p>Action Cards</p>
                {deck != null && deck.actionCards.map((card) => {
                    return (
                        // <Card key={card.id} card={card} />
                        <div key={`${card.name}_div`}>
                            <p key={`${card.name}_text`}>{card.name} x {card.count}</p>
                            <button
                                key={`${card.name}_button`}
                                onClick={() => removeCardFromDeck(card)}>
                                Remove</button>
                        </div>
                    )
                })}
            </div>
            {/* This cardlist takes right hand column */}
            <div>
                <CardList onClickAction={addCardToDeck} />
            </div>
        </div >
    )
}

export default CreateDeckPage