import { useEffect, useState } from 'react'
import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'

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

            if (limit && limit <= gamesData.length) {
                gamesData.filter((game) => {
                    const date = new Date(game.date_time)
                    const currentDate = new Date()
                    return date > currentDate
                })
                setGamesList([...gamesData.slice(0, limit)])
            } else {
                setGamesList([...gamesData])
            }
        }
    }, [
        isGamesLoading,
        setGamesList,
        gamesData,
        isError,
        error,
        setError,
        limit,
    ])

    if (isGamesLoading) return <div>Loading...</div>

    if (error) return
    return (
        <div id="games-list-container">
            {gamesList.map((game) => {
                const date = new Date(game.date_time)
                const formatter = new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
                const formattedTime = formatter.format(date)
                return (
                    <div
                        className="card mb-3 russo-one-regular mx-4"
                        key={game.id}
                    >
                        <div className="row no-gutters">
                            <div className="col-sm-3">{`${date.toDateString()} at ${formattedTime}`}</div>
                            <div className="col-sm-5">{`${game.away_team} @ ${game.home_team}`}</div>
                            <div className="col-sm-3">{game.location}</div>
                            <div className="col-sm-1">
                                <button
                                    className="btn btn-success btn-lg ml-auto russo-one-regular"
                                    onClick={() => handleTicketClick(game.id)}
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
