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
        <nav className="" id="navigation-container">
            <div className="container-fluid text-center">
                <div class="row align-items-start">
                    <div class="col-9">
                        <li className="nav-item nav-link" role="button">
                            <NavLink className="navbar-brand" to={'/'}>
                                {' '}
                                <img
                                    src="https://i.postimg.cc/kXPX3pZw/A577-C781-F0-A8-43-EF-9-C9-B-B01687700-DDC-4-5005-c.jpg"
                                    width="65"
                                    height="50"
                                />
                            </NavLink>
                        </li>
                    </div>
                    <div class="col-3">
                        {user && (
                            <div
                                class="d-grid gap-2 d-md-flex justify-content-md-end"
                                id="signout-button"
                            >
                                <li className="nav-item mb-3" role="button">
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-md"
                                        onClick={handleLogOut}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

// ;<nav
//     className="navbar navbar-expand-lg navbar bg-success"
//     id="navigation-container"
// >
//     <div className="container-fluid">
//         <div>
//             <ul className="navbar-nav me-auto mb-2">
//                 <li className="nav-item nav-link" role="button">
//                     <NavLink className="navbar-brand" to={'/'}>
//                         {' '}
//                         <img
//                             src="https://i.postimg.cc/kXPX3pZw/A577-C781-F0-A8-43-EF-9-C9-B-B01687700-DDC-4-5005-c.jpg"
//                             width="65"
//                             height="50"
//                         />
//                     </NavLink>
//                 </li>
//                 {user && (
//                     <li className="nav-item mb-1" role="button">
//                         <NavLink className="nav-link" to={'/games'}>
//                             Games
//                         </NavLink>
//                     </li>
//                 )}
//                 {user && (
//                     <li className="nav-item mb-1" role="button">
//                         <NavLink className="nav-link" to={'/profile'}>
//                             Profile
//                         </NavLink>
//                     </li>
//                 )}
//                 {user && (
//                     <div
//                         class="d-grid gap-2 d-md-flex justify-content-md-end"
//                         id="signout-button"
//                     >
//                         <li className="nav-item mb-3" role="button">
//                             <button
//                                 type="button"
//                                 class="btn btn-primary btn-md"
//                                 onClick={handleLogOut}
//                             >
//                                 Logout
//                             </button>
//                         </li>
//                     </div>
//                 )}
//                 {!user && (
//                     <li className="nav-item mb-1" role="button">
//                         <NavLink className="nav-link" to={'/signup'}>
//                             Sign Up
//                         </NavLink>
//                     </li>
//                 )}
//                 {!user && (
//                     <li className="nav-item mb-1" role="button">
//                         <NavLink className="nav-link" to={'/signin'}>
//                             Log in{' '}
//                         </NavLink>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     </div>
// </nav>
