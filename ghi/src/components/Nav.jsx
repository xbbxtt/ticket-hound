import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const [signout, signoutStatus] = mlbApi.useSignoutMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (signoutStatus.isSuccess) {
            navigate('/')
        } else if (signoutStatus.isError) {
            setErrorMessage(signoutStatus.error.data.detail)
        }
    }, [signoutStatus, navigate])

    const handleLogOut = (e) => {
        e.preventDefault()
        signout()
    }

    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()

    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <NavLink to={'/'}>Ticket Hound</NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to={'/profile'}> Profile</NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink to={'/signup'}>Sign Up</NavLink>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink to={'/signin'}>Log in </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
