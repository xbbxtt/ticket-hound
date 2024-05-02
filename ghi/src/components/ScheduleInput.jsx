import TeamDropDown from './teamDropDown'
import InputBox from './InputBox'

export default function ScheduleInput({ formData, handleFormChangeFunction }) {
    return (
        <>
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
            <TeamDropDown
                name="away_team"
                value={formData.away_team}
                onChangeFunction={handleFormChangeFunction}
            />
            <TeamDropDown
                name="home_team"
                value={formData.home_team}
                onChangeFunction={handleFormChangeFunction}
            />
        </>
    )
}
