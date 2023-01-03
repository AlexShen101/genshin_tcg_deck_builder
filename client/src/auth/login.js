import { useSelector, useDispatch } from 'react-redux'

const login = async (credentials, dispatch) => {
    console.log(credentials)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }
    const response = await fetch(`http://localhost:5000/users/login`, options).then(
        (data) => data.json()
    )
    console.log(response)
}

export default login