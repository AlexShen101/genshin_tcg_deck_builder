import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => (
    <tr>
        <td>{props.card.name}</td>
        <td>{props.card.cost}</td>
    </tr>
)

// handles rendering and functions for the card displayer
export default function cardListPage() {
    const [cards, setCards] = useState([])
    const [typeFilter, setTypeFilter] = useState("artifactCards")
    const [search, setSearch] = useState("")
    // console.log("cards")
    // console.log(cards)
    // console.log("typeFilter")
    // console.log(typeFilter)
    // This method fetches the relevant card types from the database.
    useEffect(() => {
        // card should either be "" or one of the elements in cardsToFetch
        async function getCards(cardType) {
            console.log("cardtype:" + cardType)
            let allCards = []
            const cardsToFetch = [
                'characterCards',
                'artifactCards',
                'eventCards',
                'supportCards',
                'statuses',
                'summons',
                'talentCards',
                'weaponCards',
            ]

            if (cardType == '') {
                for (let i = 0; i < cardsToFetch.length; i++) {
                    const fetchUrl = `http://localhost:5000/${cardsToFetch[i]}`
                    const response = await fetch(fetchUrl)
                    if (!response.ok) {
                        const message = `An error occurred: ${response.statusText}`
                        console.log(message)
                        window.alert(message)
                        return
                    }
                    const outputCards = await response.json()
                    allCards = allCards.concat(outputCards)
                }
                setCards(allCards)
            }
            else {
                console.log("here")
                const fetchUrl = `http://localhost:5000/${cardType}`
                const response = await fetch(fetchUrl)
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`
                    console.log(message)
                    window.alert(message)
                    return
                }
                const outputCards = await response.json()
                setCards(outputCards)
            }
        }
        getCards(typeFilter)
        return
    }, [typeFilter])

    const makeCardView = () => {
        return (
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>{makeCardList()}</tbody>
            </table>
        )
    }
    // This method will map out the cards on the table
    function makeCardList() {
        return cards.map((card) => {
            return (
                <Card
                    card={card}
                    key={card._id}
                />
            )
        })
    }

    // This following section will display the table with the cards of individuals.
    return (
        <div>
            <h3>Card List</h3>
            <div>
                <input type="string" name="filter_card_input"></input>
                <button name="artifact_button" onClick={() => setTypeFilter("artifactCards")}>Artifacts</button>
                <button name="character_button" onClick={() => setTypeFilter("characterCards")}>Characters</button>
                <button name="event_button" onClick={() => setTypeFilter("eventCards")}>Events</button>
                <button name="status_button" onClick={() => setTypeFilter("statuses")}>Statuses</button>
                <button name="summon_button" onClick={() => setTypeFilter("summons")}>Summons</button>
                <button name="support_button" onClick={() => setTypeFilter("supportCards")}>Support</button>
                <button name="talent_button" onClick={() => setTypeFilter("talentCards")}>Talents</button>
                <button name="weapon_button" onClick={() => setTypeFilter("weaponCards")}>Weapons</button>
            </div>
            {makeCardView()}
        </div>
    )
}
