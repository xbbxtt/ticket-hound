import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import ScheduleInput from './ScheduleInput'
import ListGames from './ListGames'
import { useEffect, useState } from 'react'
import ErrorNotification from './ErrorNotification'

export default function GamesSchedule() {
    // We need to get the users input
    // and we need to display the games

    // Gets the user so we can load their favorite team
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()
    // Lazy query, only works for getting the users favorite team
    const [trigger, result] = mlbApi.useLazyTeamDetailsQuery(
        user?.favorite_team_id
    )
    // Determines the current date so we can seed the input form
    const todaysDate = new Date()
    const todaysFormattedDate = todaysDate.toJSON().slice(0, 10)
    todaysDate.setDate(todaysDate.getDate() + 7)
    const endFormattedDate = todaysDate.toJSON().slice(0, 10)

    // Sets the users favorite team's name
    const [teamName, setTeamName] = useState()
    // Sets up the formData that will be used in the form
    const [formData, setFormData] = useState({
        start_date: todaysFormattedDate,
        end_date: endFormattedDate,
        away_team: '',
        home_team: '',
    })
    const [displayTeamsList, setDisplayTeamsList] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    // handles changes to the formData
    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    // Once the user is loaded (and exists), fetch the user's
    // favorite team
    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        } else if (user && !isLoadingUser) {
            trigger(user.favorite_team_id)
            setFormData({
                ...formData,
                home_team: user.favorite_team_id,
            })
        }
    }, [user, isLoadingUser, navigate, trigger, setFormData])

    // Once the user's favorite team has been fetched, render it
    useEffect(() => {
        if (result.isSuccess) {
            setTeamName(result.data)
            setDisplayTeamsList(true)
        }
    }, [result, setDisplayTeamsList])

    if (isLoadingUser) {
        return <div>Loading...</div>
    }
    return (
        <>
            {teamName && (
                <form>
                    <ScheduleInput
                        formData={formData}
                        handleFormChangeFunction={handleFormChange}
                    />
                </form>
            )}
            {displayTeamsList && (
                <ListGames
                    startDate={formData.start_date}
                    endDate={formData.end_date}
                    awayTeam={formData.away_team}
                    homeTeam={formData.home_team}
                    setError={setErrorMessage}
                />
            )}
            {errorMessage && <ErrorNotification error={errorMessage} />}
        </>
    )
}
