import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorNotification from './components/ErrorNotification'
import Nav from './components/Nav'
import Footer from './components/Footer'

import './App.css'

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const [error, setError] = useState(null)

    return (
        <div className="App">
            <header className="App-header">
                <Nav />
            </header>
            <Outlet />
            <ErrorNotification error={error} />
            <Footer />
        </div>
    )
}

export default App
