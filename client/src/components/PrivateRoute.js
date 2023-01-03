import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            return navigate("/")
        } else {
            return children ? children : <Outlet />
        }
    }, [user])
}

export default PrivateRoute;