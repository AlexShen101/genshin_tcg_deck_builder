import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const MyDecksPage = () => {
    console.log("rerender")
    const dispatch = useDispatch()
    const decks = useSelector((state) => {
        return state.decks
    })
    console.log(decks)

    // This method will delete a record
    // const deleteRecord = async (id) => {
    //     await fetch(`http://localhost:5000/${id}`, {
    //         method: 'DELETE',
    //     })

    //     const newRecords = records.filter((el) => el._id !== id)
    //     setRecords(newRecords)
    // }

    // This method will map out the records on the table
    // const recordList = () => {
    //     return records.map((record) => {
    //         return (
    //             <Record
    //                 record={record}
    //                 deleteRecord={() => deleteRecord(record._id)}
    //                 key={record._id}
    //             />
    //         )
    //     })
    // }

    const makeDeckList = () => {
        return decks.map((deck) => {
            return (
                <tr key={`${deck._id}`}>
                    <th>{deck.deckName}</th>
                    <th>
                        {deck.characterCards.map((card) => {
                            return card.name + " "
                        })}
                    </th>
                </tr>
            )
        })
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>My Decks</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Deck Name</th>
                        <th>Characters</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {makeDeckList()}
                </tbody>
            </table>
        </div>
    )
}

export default MyDecksPage