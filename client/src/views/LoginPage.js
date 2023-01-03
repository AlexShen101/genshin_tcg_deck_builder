import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getDecks } from '../store/DecksReducer/DeckThunk'

import login from '../auth/login'

const LoginPage = () => {
    const user = useSelector((state) => state.user)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== null) {
            dispatch(getDecks())
            return navigate("/dashboard")
        }
    }, [user])

    const formSubmit = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value

        if (username == "" || password == "") {
            // error message
            setError("Please fill out the login form")
            return
        } else {
            login({ username: username, password: password }, dispatch)
            return
        }
    }

    return (
        <div>
            <p>This is the login page</p>
            {error && <p className="alert-danger">{error}</p>}
            <form onSubmit={(e) => formSubmit(e)}>
                <label htmlFor="username">Username</label>
                <input className="form-control" id="username" name="username" type="text" placeholder="Enter Username" />
                <label htmlFor="loginPassword">Password</label>
                <input type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter Password" />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage