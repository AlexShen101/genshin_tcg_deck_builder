import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

// backend URLs to call get requests on
const cardsToFetch = [
    'characterCards',
    'artifactCards',
    'eventCards',
    'supportCards',
    'talentCards',
    'weaponCards',
]

const mapCardToImageFolder = {
    characterCards: 'characters',
    artifactCards: 'weapons_artifacts',
    eventCards: 'event',
    supportCards: 'support',
    talentCards: 'talents',
    weaponCards: 'weapons_artifacts',
}

// handles rendering and functions for the card displayer
const CardList = (props) => {
    const [cards, setCards] = useState([])
    const [typeFilter, setTypeFilter] = useState('artifactCards')
    const [search, setSearch] = useState('')


    // This method fetches the relevant card types from the database.
    useEffect(() => {
        // card should either be "" or one of the elements in cardsToFetch
        async function getCards(cardType) {
            let allCards = []

            if (!cardsToFetch.includes(cardType)) {
                console.log(
                    'cardtype: ' +
                    cardType +
                    ' should be invalid, check for bug'
                )
            } else {
                const fetchUrl = `http://localhost:5000/${cardType}`
                const response = await fetch(fetchUrl)
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`
                    window.alert(message)
                    return
                }
                let outputCards = await response.json()
                outputCards = outputCards.map((card) => {
                    return {
                        ...card,
                        firebasePath: `/${mapCardToImageFolder[typeFilter]}/${card.image_id}/${card.image_id}.png`,
                        cardType: typeFilter.replace('Cards', '')
                    }
                })
                outputCards = outputCards.filter((item) => {
                    if (
                        item.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                        return item
                    }
                })
                setCards(outputCards)
            }
        }
        getCards(typeFilter)
        return
    }, [typeFilter, search])

    // This method will map out the cards on the table
    function makeCardList(onClickAction) {
        return cards.map((card) => {
            if (onClickAction) {
                return (
                    <button
                        onClick={() => onClickAction(card)}
                        key={`card_button_wrapper_${card._id}`}>
                        <Card card={card} />
                    </button>
                )
            } else {
                return (
                    <Link
                        key={`button_${card._id}`}
                        to={`/view_card/${typeFilter}/${card._id}`}
                    >
                        <Card card={card} key={card._id} />
                    </Link>
                )
            }

        })
    }

    // Displays a grid of cards
    return (
        <div>
            <h3>Card List</h3>
            <div>
                <input
                    type="string"
                    name="filter_card_input"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                ></input>
                {cardsToFetch.map((item) => {
                    return (
                        <button
                            name={`${item}_button`}
                            onClick={() => {
                                setTypeFilter(item)
                                setSearch('')
                            }}
                            key={`${item}_button`}
                        >
                            {item.replace('Cards', ' cards')}
                        </button>
                    )
                })}
            </div>
            {makeCardList(props.onClickAction)}
        </div>
    )
}

export default CardList
