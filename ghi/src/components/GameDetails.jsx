import { mlbApi } from '../app/apiSlice'
import { useLocation } from 'react-router-dom'
import GetSeatgeekTickets from './GetSeatgeekTickets'
import GetVividseatsTickets from './GetVividseatsTickets'

export default function GameDetails() {
    // Using the game's id, this component will make
    // an API call to get the details for a specific game
    const location = useLocation()
    const id = location.state.id

    const { data: gameData, isLoading: gameIsLoading } =
        mlbApi.useGameDetailsQuery(id)

    if (gameIsLoading) return <div>Loading...</div>

    return (
        <div>
            <div>
                <h3>{`${gameData.away_team}@${gameData.home_team}`}</h3>
            </div>
            <div>
                <h4>Game Details:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{gameData.location}</td>
                            <td>{gameData.game_date.slice(11, 19)}</td>
                            <td>{gameData.game_date.slice(0, 10)}</td>
                        </tr>
                        <tr>
                            <td>
                                <GetSeatgeekTickets
                                    awayTeam={gameData.away_team}
                                    homeTeam={gameData.home_team}
                                    dateTime={gameData.game_date}
                                />
                            </td>
                            <td>
                                <GetVividseatsTickets
                                    awayTeam={gameData.away_team}
                                    homeTeam={gameData.home_team}
                                    dateTime={gameData.game_date}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
