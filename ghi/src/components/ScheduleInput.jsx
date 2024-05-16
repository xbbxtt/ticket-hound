import TeamDropDown from './TeamDropDown'
import InputBox from './InputBox'

export default function ScheduleInput({ formData, handleFormChangeFunction }) {
    return (
        <div className="shadow p-2">
            <InputBox
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleFormChangeFunction}
                placeholder=""
                title="Start Date:"
                min={formData.start_date}
            />
            <InputBox
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleFormChangeFunction}
                placeholder=""
                title="End Date:"
                min={formData.start_date}
            />
            <div className="mb-3 px-2">
                <label>
                    Away Team:
                    <TeamDropDown
                        name="away_team"
                        value={formData.away_team}
                        onChangeFunction={handleFormChangeFunction}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label>
                    Home Team:
                    <TeamDropDown
                        name="home_team"
                        value={formData.home_team}
                        onChangeFunction={handleFormChangeFunction}
                    />
                </label>
            </div>
        </div>
    )
}
