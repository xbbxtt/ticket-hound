import TeamDropDown from './teamDropDown'
import InputBox from './InputBox'

export default function ScheduleInput({ formData, onChangeFunction }) {
    return (
        <>
            <InputBox
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={onChangeFunction}
                placeholder=""
                title="Start Date"
            />
            <InputBox
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={onChangeFunction}
                placeholder=""
                title="End Date"
            />
            <TeamDropDown
                value={formData.away_team}
                onChange={onChangeFunction}
            />
            <TeamDropDown
                value={formData.home_team}
                onChange={onChangeFunction}
            />
        </>
    )
}
