import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'
import ErrorNotification from './ErrorNotification'
import InputBox from './InputBox'
import { NavLink } from 'react-router-dom'

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
        <div className="container-fluid">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleFormSubmit}>
                        {errorMessage && (
                            <ErrorNotification error={errorMessage} />
                        )}
                        <InputBox
                            title="Email: "
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Email"
                        />
                        <InputBox
                            title="Password: "
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    Don't have an account?
                    <NavLink to="/signup" className="navigation-link">
                        Sign up here!
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
