import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import ListGames from './ListGames'
import { useEffect, useState } from 'react'
import ErrorNotification from './ErrorNotification'

export default function Mainpage() {
    // Determines the current date so we can seed the input form
    const todaysDate = new Date()
    const todaysFormattedDate = todaysDate.toJSON().slice(0, 10)
    todaysDate.setDate(todaysDate.getDate() + 7)
    const endFormattedDate = todaysDate.toJSON().slice(0, 10)
    // Sets up the formData that will be used in the form
    const formData = {
        start_date: todaysFormattedDate,
        end_date: endFormattedDate,
        away_team: '',
        home_team: '',
    }

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    return (
        <>
            <button
                className="p-4 mt-5 btn-success btn-lg mb-5 russo-one-regular find-games "
                onClick={() => navigate('/games')}
            >
                Find More Games!
            </button>
            <ListGames
                startDate={formData.start_date}
                endDate={formData.end_date}
                awayTeam={formData.away_team}
                homeTeam={formData.home_team}
                setError={setErrorMessage}
                limit={5}
            />
            {errorMessage && <ErrorNotification error={errorMessage} />}
        </>
    )
}
