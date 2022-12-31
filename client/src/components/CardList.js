import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const cardsToFetch = [
    'characterCards',
    'artifactCards',
    'eventCards',
    'supportCards',
    'talentCards',
    'weaponCards',
]

import Card from './Card'

// handles rendering and functions for the card displayer
const CardList = (props) => {
    let cards = useSelector((state) => {
        return state.cards
    })
    const [cardsToDisplay, setCardsToDisplay] = useState(cards)
    const [typeFilter, setTypeFilter] = useState('artifactCards')
    const [search, setSearch] = useState('')

    // filter cards every time typeFilter or search is changed
    useEffect(() => {
        console.log("useeffect triggered")
        if (cards == null) return
        else if (cards == "loading") return
        let newCards = cards.filter((card) => {
            if (card.cardType == typeFilter.replace('Cards', '')) {
                if (card.name.toLowerCase().includes(search.toLowerCase())) {
                    console.log(card.name)
                    return true
                }
            }
            return false
        })
        console.log("here")
        if (typeFilter.replace('Cards', '') === 'talent') {
            newCards = newCards.filter((card) => {
                let checkIfValid = props.characters.find((characterCard) => {
                    return card.name.includes(characterCard.name)
                })
                console.log(checkIfValid)
                if (!checkIfValid) return false
                return true
            })
        }
        newCards = newCards.filter((card) => {
            if (props.invalidCards.length !== 0) {
                let checkIfInvalid = props.invalidCards.find((invalidCard) => {
                    return card._id === invalidCard._id
                })
                if (checkIfInvalid) return false
            }
            return true
        })


        setCardsToDisplay(newCards)
    }, [typeFilter, search, cards, props.invalidCards, props.characters])
    // This method will map out the cards on the table
    const makeCardList = (onClickAction) => {
        return cardsToDisplay.map((card) => {
            if (onClickAction) {
                return (
                    <button
                        className="cardlist-item btn btn-primary-outline p-2 col-lg-3 col-md-4 col-6 align-top"
                        onClick={() => onClickAction(card)}
                        key={`card_button_wrapper_${card._id}`}
                    >
                        <Card card={card} />
                    </button>
                )
            } else {
                return (
                    <Link
                        className="cardlist-item col d-inline-flex m-3 align-top"
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
        <div className='col text-center'>
            {cardsToDisplay != "loading" ?
                <>
                    <h3>Card List</h3>
                    <div className='container-fluid'>
                        <input
                            className="form-control"
                            type="string"
                            name="filter_card_input"
                            value={search}
                            placeholder="Search for cards here"
                            onChange={(event) => setSearch(event.target.value)}
                        ></input>
                        <div className="container-fluid d-flex justify-content-center">
                            {cardsToFetch.map((item) => {
                                return (
                                    <button
                                        className={item === typeFilter ? "btn btn-outline- btn-primary-active col-sm m-1" : "btn btn-outline-primary col-sm m-1"}
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
                    </div>
                    {makeCardList(props.onClickAction)}
                </>
                :
                // Code for when cardlist is still loading
                <>
                    <h3>CardList</h3>
                    <p>Loading Page</p>
                </>
            }
        </div>
    )
}

export default CardList
