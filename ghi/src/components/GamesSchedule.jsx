import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import ScheduleInput from './ScheduleInput'

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
    // Needs to load a teams details, (not lazy)

    // Determines the current date so we can seed the input form
    const date = new Date().toJSON().slice(0, 10)

    // Sets the users favorite team's name
    const [teamName, setTeamName] = useState()
    // Sets up the formData that will be used in the form
    const [formData, setFormData] = useState({
        start_date: todays_date,
        end_date: '',
        away_team: '',
        home_team: '',
    })
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
        }
    }, [user, isLoadingUser, navigate, trigger])

    // Once the user's favorite team has been fetched, render it
    useEffect(() => {
        if (result.isSuccess) setTeamName(result.data)
    }, [result])

    const handleFormSubmit = async () => {}

    if (isLoadingUser) {
        return <div>Loading...</div>
    }

    return (
        <>
            {teamName && (
                <form>
                    <ScheduleInput
                        favoriteTeamName={teamName.full_name}
                        onChangeFunction={handleFormChange}
                    />
                    <button>submit</button>
                </form>
            )}
        </>
    )
}
