import React, { useEffect, useState } from 'react'

const ActionCardDisplay = (props) => {
    const card = props.card

    const makeHeader = (title) => {
        return (
            <div className="border text-center bg-dark-5">
                <p className="m-0 fw-bolder color-primary">{title}</p>
            </div>
        )
    }

    const makeBlock = (title, content) => {
        return (
            <>
                {makeHeader(title)}
                <div className="border">
                    <p className="mx-2 card-display-card-obtained">{content}</p>
                </div>
            </>
        )
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4 col-12">
                    <div className="text-center p-2">
                        <p className="text-uppercase m-0 card-display-card-name">{card.name}</p>
                    </div>
                    <img src={card.highResImageUrl} className="w-100"></img>
                    <p className="card-display-card-description fst-italic">{card.description}</p>
                </div>

                <div className="col-sm-8 col-12">
                    {makeHeader("Info")}
                    <div className="d-flex justify-content-center">
                        <ul className="list-group rounded-0 w-50">
                            <li className="list-group-item border-right-0 color-primary">Type</li>
                            <li className="list-group-item border-right-0 color-primary">Cost</li>
                            {card.life &&
                                <li className="list-group-item border-right-0 color-primary">Duration</li>
                            }
                        </ul>
                        <ul className="list-group rounded-0 w-50">
                            <li className="card-display-card-faction list-group-item border-left-0 ">{card.cardType}</li>
                            <li className="card-display-card-element list-group-item border-left-0">{card.cost}</li>
                            {card.life &&
                                <li className="card-display-card-element list-group-item border-left-0">{card.life === "nan" ? "None" : Math.floor(card.life)}</li>
                            }
                        </ul>
                    </div>

                    {makeBlock("Obtained", card.obtained)}
                    {makeBlock("Effect", card.effect)}
                </div>
            </div>
        </div>

    )
}

export default ActionCardDisplay