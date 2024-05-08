import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Profile() {
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()

    const [deleteUser, deleteUserStatus] = mlbApi.useDeleteUserMutation()
    const [error, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const [trigger, result] = mlbApi.useLazyTeamDetailsQuery(
        user?.favorite_team_id
    )
    const [teamName, setTeamName] = useState()

    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/')
        } else if (user && !isLoadingUser) {
            trigger(user.favorite_team_id)
        }
    }, [user, isLoadingUser, navigate, trigger])
    useEffect(() => {
        if (result.isSuccess) setTeamName(result.data)
    }, [result])

    const handleDelete = (e) => {
        e.preventDefault()
        deleteUser()
    }

    useEffect(() => {
        if (deleteUserStatus.isSuccess) {
            navigate('/')
        } else if (deleteUserStatus.isError) {
            setErrorMessage('')
        }
    }, [deleteUserStatus, navigate])

    if (isLoadingUser) {
        return <div>Loading...</div>
    }

    return (
        <div className="container-fluid mb-3">
            <div
                style={{ backgroundColor: `#${teamName?.alternate_color}` }}
                className="offset-3 col-6"
                id="profile-card"
            >
                <div className="shadow p-4 mt-4">
                    <p>Username: {user?.username}</p>
                    <p>
                        Name: {user?.first_name} {user?.last_name}
                    </p>
                    <p>Address: {user?.address}</p>
                    <p>Birthday: {user?.birthday}</p>
                    <p>Favorite Team: {teamName?.full_name}</p>
                    {teamName && (
                        <img
                            src={teamName.logo}
                            alt="Favorite team's logo"
                            width="200"
                        />
                    )}
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary mx-2 btn-lg"
                            onClick={() => navigate('/edit')}
                        >
                            Edit Profile
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger mx-2 btn-lg"
                            onClick={handleDelete}
                        >
                            Delete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}
