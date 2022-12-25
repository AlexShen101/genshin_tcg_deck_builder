import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../firebase/FirebaseSetup'
import { ref, getDownloadURL } from 'firebase/storage'

const mapCardToImageFolder = {
    characterCards: 'characters',
    artifactCards: 'weapons_artifacts',
    eventCards: 'event',
    supportCards: 'support',
    talentCards: 'talents',
    weaponCards: 'weapons_artifacts',
}

// backend URLs to call get requests on
const cardsToFetch = [
    'characterCards',
    'artifactCards',
    'eventCards',
    'supportCards',
    'talentCards',
    'weaponCards',
]

// takes in an image_type
const queryImage = (image_type, image_id, my_callback) => {
    const pathReference = ref(
        storage,
        image_type + '/' + image_id + '/' + image_id + '.png'
    )
    // var storageRef = firebase.storage().ref()
    getDownloadURL(pathReference)
        .then((url) => {
            my_callback(url)
            // document.querySelector('img').src = test;
        })
        .catch((error) => {
            console.log(error)
            my_callback(undefined)
        })
}

const Card = (props) => {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        let imageFolder = mapCardToImageFolder[props.cardType]
        queryImage(imageFolder, props.card.image_id, setImageUrl)
    }, [])

    return (
        <div>
            <img
                src={imageUrl}
                alt={props.card.name + props.card.image_id}
            ></img>
            <p>{props.card.name}</p>
        </div>
    )
}

// handles rendering and functions for the card displayer
const CardListPage = () => {
    const [cards, setCards] = useState([])
    const [typeFilter, setTypeFilter] = useState('artifactCards')
    const [search, setSearch] = useState('')

    // This method fetches the relevant card types from the database.
    useEffect(() => {
        // card should either be "" or one of the elements in cardsToFetch
        async function getCards(cardType) {
            console.log('cardtype:' + cardType)
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
                    console.log(message)
                    window.alert(message)
                    return
                }
                let outputCards = await response.json()
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
    function makeCardList() {
        return cards.map((card) => {
            return (
                <Link to={`/view_card/${typeFilter}/${card._id}`}>
                    <Card card={card} key={card._id} cardType={typeFilter} />
                </Link>
            )
        })
    }

    // This following section will display the table with the cards of individuals.
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
            {makeCardList()}
        </div>
    )
}

export default CardListPage
