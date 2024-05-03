import { useEffect, useState } from 'react'
import { mlbApi } from '../app/apiSlice'
import { Link, useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()

    const handleTicketClick = (id) => {
        navigate('/game', { state: { id: id } })
    }

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

    if (error) return

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Teams</th>
                        <th>Location</th>
                        <th>Tickets</th>
                    </tr>
                </thead>
                <tbody>
                    {gamesList.map((game) => {
                        const handleClick = () => {
                            setGameID(game.id)
                        }
                        return (
                            <tr key={game.id}>
                                <td>{game.date_time}</td>
                                <td>{`${game.away_team}@${game.home_team}`}</td>
                                <td>{game.location}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleTicketClick(game.id)
                                        }
                                    >
                                        Tickets
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
