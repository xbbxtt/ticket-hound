import { Link } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'

export default function GetSeatgeekTickets(awayTeam, homeTeam, dateTime) {
    const { data: ticketData, isLoading: isTicketLoading } =
        mlbApi.useSeatgeekTicketsQuery(awayTeam, homeTeam, dateTime)

    if (isTicketLoading) return <div>Loading...</div>

    return (
        <div>
            <div>
                <img
                    src={ticketData.logo}
                    alt={ticketData.provider_name}
                    width="200"
                    height="200"
                />
            </div>
            <div>
                <Link to={ticketData.url} target="_blank">
                    Ticket
                </Link>
            </div>
            <div>{ticketData.min_price}</div>
        </div>
    )
}
