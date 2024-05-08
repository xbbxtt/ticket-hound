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
            <div className="offset-3 col-6" id="profile-card">
                <div className="shadow p-4 mt-4">
                    <p>Username: {user?.username}</p>
                    <p>
                        Name: {user?.first_name} {user?.last_name}
                    </p>
                    <p className="lexend-deca-uniquifier">
                        Address: {user?.address}
                    </p>
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

            {/* <table>
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
            <button onClick={handleDelete}>Delete Profile</button> */}
        </div>
    )
}

{
    /* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */
}
