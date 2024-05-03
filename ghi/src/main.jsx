import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Signout from './components/SignOut'
import App from './App'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import GamesSchedule from './components/GamesSchedule'
import GameDetails from './components/GameDetails'
import Nav from './components/Nav'

import './index.css'
import { store } from './app/store'
import Wrapper from './components/AuthWrapper'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'profile',
                    element: <Profile />,
                },
                {
                    path: 'edit',
                    element: (
                        <Wrapper>
                            <EditProfile />
                        </Wrapper>
                    ),
                },
                {
                    path: 'signout',
                    element: <Signout />,
                },
                {
                    path: 'games',
                    element: (
                        <Wrapper>
                            <GamesSchedule />
                        </Wrapper>
                    ),
                },
                {
                    path: 'game',
                    element: (
                        <Wrapper>
                            <GameDetails />
                        </Wrapper>
                    ),
                },
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
