import { mlbApi } from '../app/apiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import GetSeatgeekTickets from './GetSeatgeekTickets'
import GetVividseatsTickets from './GetVividseatsTickets'
import GetTickpickTickets from './GetTickpickTickets'
import { useEffect, useState } from 'react'

export default function GameDetails() {
    // Using the game's id, this component will make
    // an API call to get the details for a specific game
    const location = useLocation()
    const id = location.state.id

    const navigate = useNavigate()

    const { data: gameData, isLoading: gameIsLoading } =
        mlbApi.useGameDetailsQuery(id)

    const [homeTeam, setHomeTeam] = useState('')
    const [awayTeam, setAwayTeam] = useState('')
    const [recordData, setRecordData] = useState({})

    const [trigger, result] = mlbApi.useLazyRecordDetailsQuery()

    useEffect(() => {
        if (!gameData && !gameIsLoading) {
            navigate('/')
        } else if (gameData && !gameIsLoading) {
            setHomeTeam(gameData.home_team)
            setAwayTeam(gameData.away_team)
            if (homeTeam && awayTeam) {
                trigger({ homeTeam, awayTeam })
            }
        }
    }, [
        gameData,
        gameIsLoading,
        navigate,
        trigger,
        setHomeTeam,
        setAwayTeam,
        homeTeam,
        awayTeam,
    ])

    useEffect(() => {
        if (result.isSuccess) setRecordData(result.data)
    }, [result])
    if (gameIsLoading) return <div>Loading...</div>

    const date = new Date(gameData.game_date)
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })
    const formattedTime = formatter.format(date)

    return (
        <div className="container-fluid py-5">
            <div className="mb-3">
                <h3 className="russo-one-regular p-4">{`${gameData.away_team} @ ${gameData.home_team}`}</h3>
            </div>
            <div id="detail-parent">
                <div className="row">
                    <div className="col-9">
                        <div className="card mb ticket-card">
                            <div>
                                <div>
                                    <GetSeatgeekTickets
                                        awayTeam={gameData.away_team}
                                        homeTeam={gameData.home_team}
                                        dateTime={gameData.game_date}
                                    />
                                </div>
                                <div>
                                    <GetVividseatsTickets
                                        awayTeam={gameData.away_team}
                                        homeTeam={gameData.home_team}
                                        dateTime={gameData.game_date}
                                    />
                                </div>
                                <div>
                                    <GetTickpickTickets
                                        homeTeam={gameData.home_team}
                                        dateTime={gameData.game_date}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card mb-1 row-3 russo-one-regular">
                            <div>
                                <div>{gameData.location}</div>
                                <div>{formattedTime}</div>
                                <div>{date.toDateString()}</div>
                            </div>
                        </div>
                        <div className="card mb-1 row-3 russo-one-regular">
                            <div>{gameData.away_team}</div>
                            <div>{recordData.away_record}</div>
                            <div>{recordData.away_standings}</div>
                        </div>
                        <div className="card mb-1 row-3 russo-one-regular">
                            <div>{gameData.home_team}</div>
                            <div>{recordData.home_record}</div>
                            <div>{recordData.home_standings}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
