import { useEffect, useState } from 'react'
import { mlbApi } from '../app/apiSlice'

export default function ListGames({
    startDate,
    endDate,
    awayTeam = null,
    homeTeam = null,
    setError,
}) {
    // Query to grab the list of games
    const {
        data: gamesData,
        isLoading: isGamesLoading,
        error,
        isError,
    } = mlbApi.useGamesListQuery({ startDate, endDate, awayTeam, homeTeam })

    const [gamesList, setGamesList] = useState([])
    // const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isError) {
            setError(error.data.detail)
            setGamesList([])
        } else if (gamesData && !isGamesLoading) {
            setError('')
            setGamesList([...gamesData])
        }
    }, [isGamesLoading, setGamesList, gamesData, isError, error, setError])

    if (isGamesLoading) return <div>Loading...</div>

    // if (errorMessage) return <ErrorNotification error={errorMessage} />

    if (error) return

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Teams</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {gamesList.map((game) => {
                        return (
                            <tr key={game.id}>
                                <td>{game.date_time}</td>
                                <td>{`${game.away_team}@${game.home_team}`}</td>
                                <td>{game.location}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
