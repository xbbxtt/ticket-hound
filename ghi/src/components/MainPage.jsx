import { useNavigate } from 'react-router-dom'
import ListGames from './ListGames'
import { useState } from 'react'
import ErrorNotification from './ErrorNotification'

export default function GamesSchedule() {
    const todaysDate = new Date()
    const todaysFormattedDate = todaysDate.toJSON().slice(0, 10)
    todaysDate.setDate(todaysDate.getDate() + 7)
    const endFormattedDate = todaysDate.toJSON().slice(0, 10)

    const [formData, setFormData] = useState({
        start_date: todaysFormattedDate,
        end_date: endFormattedDate,
        away_team: '',
        home_team: '',
    })

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    return (
        <>
            <div className="container-fluid">
                <h2 className="p-4 h2 mb-3 russo-one-regular">
                    Upcoming Games...
                </h2>
                <ListGames
                    startDate={formData.start_date}
                    endDate={formData.end_date}
                    awayTeam={formData.away_team}
                    homeTeam={formData.home_team}
                    setError={setErrorMessage}
                    limit={5}
                />
                {errorMessage && <ErrorNotification error={errorMessage} />}
                <button
                    className="btn btn-success btn-md ml-auto p-3 mb-3 russo-one-regular"
                    onClick={() => navigate('/games')}
                >
                    Find More Games!
                </button>
            </div>
        </>
    )
}
