import { useEffect, useState } from 'react'
import { mlbApi } from '../app/apiSlice'

export default function ListGames({
    startDate,
    endDate,
    awayTeam = null,
    homeTeam = null,
}) {
    // Query to grab the list of games
    const { data: gamesData, isLoading: isGamesLoading } =
        mlbApi.useGamesListQuery({ startDate, endDate, awayTeam, homeTeam })

    const [gamesList, setGamesList] = useState([])

    useEffect(() => {
        if (gamesData && !isGamesLoading) {
            setGamesList([...gamesData])
        }
    }, [isGamesLoading, setGamesList, gamesData])

    if (isGamesLoading) return <div>Loading...</div>

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
