import { mlbApi } from '../app/apiSlice'

export default function TeamDropDown ({
    value,
    onChangeFunction,
    name = 'favorite_team_id',
}) {
    const { data: teamData, isLoading: teamsIsLoading } =
        mlbApi.useListMlbTeamsQuery()

    if (teamsIsLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="mb-2">
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChangeFunction}
                required
                className="form-select"
            >
                <option value="" defaultValue="">
                    Choose a Team!
                </option>
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
