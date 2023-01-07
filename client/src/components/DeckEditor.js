import React, { useState } from 'react'

import CardList from './CardList'
import ActionCard from './DeckSidebar/DeckActionCard'
import CharacterCard from './DeckSidebar/DeckCharacterCard'

const emptyDeck = {
    deckName: '',
    characterCards: [],
    actionCards: [],
    length: 0,
}

const DeckEditor = (props) => {
    const [deck, setDeck] = useState(props.currentDeck)

    // invalid cards are cards that can't be added to the deck anymore (becuase max value has been reached. this ignores talent cards, which are handled separately)
    // all character cards can only be added once, so they are all invalid
    // all artifact cards can only be added twice, so if there are two artifact cards included then it is
    let invalidCards = [...deck.characterCards]
    for (let i = 0; i < deck.actionCards.length; i++) {
        if (deck.actionCards[i].count === 2)
            invalidCards.push(deck.actionCards[i])
    }

    // add a given card to the deck or throw an alert otherwise
    const addCardToDeck = (card) => {
        // spreading is just used to clone the deck
        let newDeck = { ...deck }

        if (card.cardType === 'character') {
            let characterCards = [...newDeck.characterCards]
            // requirements: no duplicates and can't have more than 3 characters
            if (characterCards.length === 3) return
            else if (characterCards.find((item) => item.name === card.name))
                return
            else characterCards.push(card)
            newDeck = {
                ...newDeck,
                characterCards: characterCards,
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
                length: deck.length + 1,
            }
        }
        setDeck(newDeck)
    }

    const removeCardFromDeck = (card) => {
        let newDeck = {
            ...deck,
            characterCards: [...deck.characterCards],
            actionCards: [...deck.actionCards],
        } // spreading is just used to clone the deck

        if (card.cardType === 'character') {
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
        setDeck(newDeck)
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container-fluid">
            <div className="row">
                {/* This div takes left hand column */}
                <div className="col-sm-4 border rounded">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            props.submitDeck(deck)
                        }}
                    >
                        <input
                            className="form-control editable-title"
                            name="deck_name"
                            placeholder="Enter Deck Name"
                            onChange={(e) => {
                                let newDeck = {
                                    ...deck,
                                    deckName: e.target.value,
                                }
                                setDeck(newDeck)
                            }}
                            value={deck.deckName}
                        ></input>
                        <div className="d-flex flex-wrap justify-content-between">
                            <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    props.submitDeck(deck)
                                }}
                            >
                                Save Deck
                            </button>
                            <button
                                type="button" // so it doesn't submit the form
                                className="btn btn-danger"
                                onClick={() => setDeck(emptyDeck)}
                            >
                                Clear Deck
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <h3 className="mt-4">Character Cards</h3>
                        {deck.characterCards.map((card) => (
                            <CharacterCard
                                key={`${card.name}_character_card`}
                                card={card}
                                removeCardFromDeck={removeCardFromDeck}
                            />
                        ))}
                        <h3 className="mt-4">Action Cards</h3>
                        {deck.actionCards.map((card) => (
                            <ActionCard
                                key={`${card.name}_action_card`}
                                card={card}
                                removeCardFromDeck={removeCardFromDeck}
                            />
                        ))}
                    </div>
                </div>
                {/* This cardlist takes right hand column */}
                <div className="col-sm-8">
                    <CardList
                        onClickAction={addCardToDeck}
                        characters={deck.characterCards}
                        invalidCards={invalidCards}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeckEditor
