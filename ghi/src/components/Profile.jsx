import { mlbApi } from "../app/apiSlice"

export default function Profile() {
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useProfileQuery()

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
                        <td>{user.username}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.address}</td>
                        <td>{user.birthday}</td>
                        <td>{user.favorite_team_id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
