// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function handleFormSubmit(e) {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="submit">Sign In</button>
        </form>
    )
}
