import React, { useState, useMemo } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const ActionCard = (props) => {
    const card = props.card

    return (
        <div key={`${card.name}_div`}
            className="deck-card-container">
            <img src={card.highResImageUrl}
                alt={card.highResImageUrl}
                className="deck-card-image circle" />
            <div className="deck-card-overlay m-1">
                {card.count == 2 ?
                    <>
                        <p className="deck-card-count">2</p>
                        <p key={`${card.name}_text`}
                            className="deck-card-name">{card.name}</p>
                    </>
                    : <p key={`${card.name}_text`}
                        className="deck-card-name">{card.name}</p>
                }

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

export default ActionCard