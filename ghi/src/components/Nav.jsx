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
        <nav
            className="navbar navbar-expand-lg navbar bg-success"
            id="navigation-container"
        >
            <div className="container-fluid">
                <div>
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item nav-link" role="button">
                            <NavLink className="navbar-brand" to={'/'}>
                                {' '}
                                <img
                                    src="https://i.postimg.cc/26wY4BgP/38856257-DD64-4893-A92-F-34-FDFB106-B08-4-5005-c.jpg"
                                    width="75"
                                    height="50"
                                />
                            </NavLink>
                        </li>
                        {user && (
                            <li className="nav-item mb-1" role="button">
                                <NavLink
                                    className="nav-link russo-one-regular"
                                    to={'/games'}
                                >
                                    Games
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item mb-1" role="button">
                                <NavLink
                                    className="nav-link russo-one-regular"
                                    to={'/profile'}
                                >
                                    Profile
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li
                                className="nav-item mr-4b logout-button"
                                role="button"
                            >
                                <div id="signout-button">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg russo-one-regular"
                                        onClick={handleLogOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                        )}
                        {!user && (
                            <li className="nav-item mb-1" role="button">
                                <NavLink className="nav-link" to={'/signup'}>
                                    Sign Up
                                </NavLink>
                            </li>
                        )}
                        {!user && (
                            <li className="nav-item mb-1" role="button">
                                <NavLink className="nav-link" to={'/signin'}>
                                    Log in{' '}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
