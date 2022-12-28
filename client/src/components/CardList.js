import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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
        if (cards == null) return null
        const newCards = cards.filter((card) => {
            if (card.cardType == typeFilter.replace('Cards', '')) {
                if (card.name.includes(search)) {
                    return true
                }
            }
            return false
        })
        setCardsToDisplay(newCards)
    }, [typeFilter, search])

    // This method will map out the cards on the table
    const makeCardList = (onClickAction) => {
        return cardsToDisplay.map((card) => {
            if (onClickAction) {
                return (
                    <button
                        onClick={() => onClickAction(card)}
                        key={`card_button_wrapper_${card._id}`}
                    >
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
                    className="form-control"
                    type="string"
                    name="filter_card_input"
                    value={search}
                    placeholder="Search for cards here"
                    onChange={(event) => setSearch(event.target.value)}
                ></input>
                {cardsToFetch.map((item) => {
                    return (
                        <button
                            className={item === typeFilter ? "btn btn-primary btn-primary-active" : "btn btn-primary"}
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
