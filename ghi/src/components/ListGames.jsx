import { useEffect, useState } from 'react'

export default function ListGames({
    start_date,
    end_date,
    away_team = null,
    home_team = null,
}) {
    // Query to grab the list of games
    const { data: gamesData, isLoading: isGamesLoading } =
        mlbApi.useGamesListQuery({ start_date, end_date, away_team, home_team })

    if (isGamesLoading) return <div>Loading...</div>
    console.log(gamesData)

    return <div>Games are Loaded, write the code if you want to see them</div>
}
