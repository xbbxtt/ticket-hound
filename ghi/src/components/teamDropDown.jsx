import { mlbApi } from '../app/apiSlice'

const TeamDropDown = ({ value, onChangeFunction }) => {
    const { data: teamData, isLoading: teamsIsLoading } =
        mlbApi.useListMlbTeamsQuery()

    if (teamsIsLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <select
                name="favorite_team_id"
                value={value}
                onChange={onChangeFunction}
                required
            >
                <option value="">Choose a Team!</option>
                {teamData.map((team) => {
                    return (
                        <option key={team.id} value={team.id}>
                            {team.full_name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default TeamDropDown
