import React, { useState, useMemo } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const CharacterCard = (props) => {
    const card = props.card

    return (
        <div key={`${card.name}_div`}
            className="deck-card-container">
            <img src={card.highResImageUrl}
                alt={card.highResImageUrl}
                className="deck-card-image rounded" />
            <div className="deck-card-overlay m-1">
                <p key={`${card.name}_text`}
                    className="deck-card-name">{card.name}</p>
                <button
                    className="btn btn-outline-danger deck-card-button"
                    key={`${card.name}_button`}
                    onClick={() => props.removeCardFromDeck(card)}
                >
                    <BsFillTrashFill />
                </button>
            </div>
        </div>
    )
}

export default CharacterCard