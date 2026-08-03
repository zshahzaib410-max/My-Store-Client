import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const Auth = createContext()
const intialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGIN":
            return { isAuth: true, user: payload.user }

        case "SET_PROFILE":
            return { ...state, user: payload.user }

        case "SET_LOGOUT":
            return intialState

        default:
            return state

    }
}


const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState)
    const [appLoading, setAppLoading] = useState(true)

    const readProfile = (token) => {
        const jwt = token || localStorage.getItem('jwt')
        axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {  headers: { Authorization: `Bearer ${jwt}`} })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    dispatch({ type: "SET_LOGIN", payload: { user: data.userFound } })

                }
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {

                setAppLoading(false)
            })
    }


    useEffect(() => {
        readProfile()
    }, [])

    const handleDelete = () => {
        localStorage.removeItem('jwt')
        dispatch({ type: "SET_LOGOUT" })

    }

    return (
        <Auth.Provider value={{ ...state, dispatch, appLoading, setAppLoading, readProfile, handleDelete }} >
            {children}
        </Auth.Provider>
    )
}

export const useAuth = () => useContext(Auth)

export default AuthContext