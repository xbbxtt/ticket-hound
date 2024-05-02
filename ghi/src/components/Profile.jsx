import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Profile() {
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()
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

    if (isLoadingUser) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>Favorite Team</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user?.username}</td>
                        <td>{user?.first_name}</td>
                        <td>{user?.last_name}</td>
                        <td>{user?.address}</td>
                        <td>{user?.birthday}</td>
                        <td>{teamName?.full_name}</td>
                        <td>
                            {teamName && (
                                <img
                                    src={teamName.logo}
                                    alt="Favorite team's logo"
                                />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => navigate('/edit')}>Edit Profile</button>
        </div>
    )
}
