import { useEffect, useState } from 'react'
import { mlbApi } from '../app/apiSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function ListGames({
    startDate,
    endDate,
    awayTeam = null,
    homeTeam = null,
    setError,
    limit = null,
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
            console.log([...gamesData.slice(0, limit)])
            if (limit && limit <= gamesData.length) {
                setGamesList([...gamesData.slice(0, limit)])
            } else {
                setGamesList([...gamesData])
            }
        }
    }, [isGamesLoading, setGamesList, gamesData, isError, error, setError, limit])

    if (isGamesLoading) return <div>Loading...</div>

    if (error) return

    return (
        <div>
            {gamesList.map((game) => {
                return (
                    <div
                        className="card mb-3 russo-one-regular"
                        key={game.id}
                    >
                        <div className="row no-gutters">
                            <div className="col-sm-3">
                                {game.date_time}
                            </div>
                            <div className="col-sm-5">{`${game.away_team} @ ${game.home_team}`}</div>
                            <div className="col-sm-3">
                                {game.location}
                            </div>
                            <div className="col-sm-1">
                                <button
                                    className="btn btn-success btn-md ml-auto p-3 mb-3 russo-one-regular"
                                    onClick={() =>
                                        handleTicketClick(game.id)
                                    }
                                >
                                    Tickets
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
