import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CharacterCard from '../components/CardDisplays/CharacterCard'
import ActionCard from '../components/CardDisplays/ActionCard'

// handles rendering and functions for the card displayer
const viewCardPage = (props) => {
    const allCards = useSelector((state) => {
        return state.cards
    })
    const [card, setCard] = useState()
    console.log(card)

    useEffect(() => {
        const thisCard = allCards.find((card) => card._id === props.params.id)
        setCard(thisCard)
    }, [allCards])

    if (card === undefined) {
        return <div><h3>Loading</h3></div>
    }
    if (card.cardType === "character") {
        return <CharacterCard card={card} />
    } else {
        return <ActionCard card={card} />
    }
    // This following section will display the table with the cards of individuals.
    // return (
    //     <div className="container-fluid">
    //         <div className="row">
    //             {card != null ? (
    //                 <>
    //                     <div className="col-4">
    //                         <h3>{card.name}</h3>
    //                         <img width="100%" src={card.highResImageUrl} alt={card.imageUrl}></img>
    //                     </div>
    //                     <div className="col-8">
    //                         {card.cost && <p>Cost: {card.cost}</p>}
    //                         <p>{card.effect}</p>
    //                         <p>{card.obtained}</p>
    //                         <p>{card.description}</p>
    //                     </div>
    //                 </>
    //             ) : (
    //                 <h3>Loading...</h3>
    //             )}
    //         </div>
    //     </div>
    // )
}

const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />
}

export default withParams(viewCardPage)
