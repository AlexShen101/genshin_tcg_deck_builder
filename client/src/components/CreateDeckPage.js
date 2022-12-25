import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import CardListPage from './CardListPage'

const CreateDeckPage = () => {
    const [form, setForm] = useState({
        name: '',
        position: '',
        level: '',
    })
    const navigate = useNavigate()

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault()

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form }

        await fetch('http://localhost:5000/record/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        }).catch((error) => {
            window.alert(error)
            return
        })

        setForm({ name: '', position: '', level: '' })
        navigate('/')
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>My Deck</h3>
            <CardListPage />
        </div>
    )
}

export default CreateDeckPage