import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import CardList from '../components/CardList'
import Card from '../components/Card'

/*
  This component is used to display a deck of cards
  A deck requires 3 character cards and support carts
deck = {
    "characterCards": [],
    "actionCards": []
}
*/
const CreateDeckPage = () => {
    console.log('rerender')
    const [deck, setDeck] = useState({ characterCards: [], actionCards: [] })

    const navigate = useNavigate()
    // add a given card to the deck or throw an alert otherwise
    const addCardToDeck = (card) => {
        let newDeck = { ...deck } // spreading is just used to clone the deck
        if (card.cardType === "character") {
            // requirements: no duplicates and can't have more than 3 characters
            if (newDeck.characterCards.length === 3) return
            else if (newDeck.characterCards.find(item => item.name === card.name)) return
            else newDeck.characterCards.push(card)
        } else {
            // requirements: max of 2 cards per action card. can't have more than 30 cards
            // check if card is already in action card
            const found = newDeck.actionCards.find((elem) => {
                return elem.name === card.name
            })
            console.log(found)
            if (newDeck.actionCards.length === 30) return
            // check if action card is already in deck and there are 2 cards
            else if (found && found.count === 2) return
            // else add 1 to the count
            else if (found) found.count = 2
            else newDeck.actionCards.push({ ...card, count: 1 })
        }
        setDeck(newDeck)
    }

    const removeCardFromDeck = (card) => {
        let newDeck = { ...deck } // spreading is just used to clone the deck
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
                        newDeck.actionCards[i].count = 1
                    }
                }
            }
        }
        setDeck(newDeck)
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault()

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = ""

        await fetch('http://localhost:5000/record/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        }).catch((error) => {
            window.alert(error)
            return
        })

        navigate('/')
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            {/* This div takes left hand column */}
            <div>
                <h3>My Deck</h3>
                <p>Character Cards</p>
                {deck.characterCards.map((card) => {
                    return (
                        // <Card key={card.id} card={card} />
                        <>
                            <p key={`${card.name}_text`}>{card.name}</p>
                            <button
                                key={`${card.name}_button`}
                                onClick={() => removeCardFromDeck(card)}>
                                Remove</button>
                        </>
                    )
                })}
                <p>Action Cards</p>
                {deck.actionCards.map((card) => {
                    return (
                        // <Card key={card.id} card={card} />
                        <>
                            <p key={`${card.name}_text`}>{card.name} x {card.count}</p>
                            <button
                                key={`${card.name}_button`}
                                onClick={() => removeCardFromDeck(card)}>
                                Remove</button>
                        </>
                    )
                })}
            </div>
            {/* This cardlist takes right hand column */}
            <div>
                <CardList onClickAction={addCardToDeck} />
            </div>
        </div>
    )
}

export default CreateDeckPage