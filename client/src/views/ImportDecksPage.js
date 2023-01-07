import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    makeToastError,
    makeToastConfirmation,
} from '../components/toast/ToastDesigns'
import { addDeck } from '../store/DecksReducer/DeckSlice'

const ImportDecksPage = () => {
    const dispatch = useDispatch()

    const uploadFile = (e) => {
        e.preventDefault()

        const file = e.target.file.files[0]
        if (file !== undefined) {
            let reader = new FileReader()
            reader.readAsText(file)

            reader.onload = (e) => {
                try {
                    let json = JSON.parse(e.target.result)
                    if (Array.isArray(json)) {
                        for (const item of json) {
                            dispatch(addDeck(item))
                        }
                    } else {
                        dispatch(addDeck(json))
                    }
                    makeToastConfirmation('The import was successful!')
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        makeToastError('Please upload a valid JSON file!')
                    } else {
                        makeToastError('A general error occured.')
                    }
                }
            }

            reader.onerror = (e) => {
                makeToastError(reader.error)
            }
        } else {
            makeToastError('Please select a file!')
        }
    }

    return (
        <>
            <div className="container">
                <form className="" onSubmit={uploadFile}>
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                    ></input>
                    <button className="btn btn-primary">Upload</button>
                </form>
            </div>
        </>
    )
}

export default ImportDecksPage
