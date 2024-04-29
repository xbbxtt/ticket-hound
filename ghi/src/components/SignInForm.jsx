import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'
import ErrorNotification from './ErrorNotification'

export default function SignInForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signin, signinStatus] = mlbApi.useSigninMutation()

    useEffect(() => {
        if (signinStatus.isSuccess) {
            navigate('/')
        } else if (signinStatus.isError) {
            console.log(signinStatus.error)
            setErrorMessage(signinStatus.error.data.detail)
            setUsername('')
            setPassword('')
        }
    }, [signinStatus, navigate])

    function handleFormSubmit(e) {
        e.preventDefault()
        signin({ username: username, password: password })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            {errorMessage && <ErrorNotification error={errorMessage} />}
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="submit">Sign In</button>
        </form>
    )
}
