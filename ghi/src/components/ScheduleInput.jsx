import TeamDropDown from './teamDropDown'
import InputBox from './InputBox'

export default function ScheduleInput({ formData, handleFormChangeFunction }) {
    return (
        <div className="container-fluid mb-3">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <InputBox
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleFormChangeFunction}
                        placeholder=""
                        title="Start Date"
                    />
                    <InputBox
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleFormChangeFunction}
                        placeholder=""
                        title="End Date"
                    />
                    <label htmlFor="away_team">Away Team</label>
                    <TeamDropDown
                        name="away_team"
                        value={formData.away_team}
                        onChangeFunction={handleFormChangeFunction}
                    />
                    <label htmlFor="home_team">Home Team</label>
                    <TeamDropDown
                        name="home_team"
                        value={formData.home_team}
                        onChangeFunction={handleFormChangeFunction}
                    />
                </div>
            </div>
        </div>
    )
}
