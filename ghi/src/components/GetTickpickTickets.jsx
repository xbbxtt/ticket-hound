import { Link } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'

export default function GetTickpickTickets(homeTeam, dateTime) {
    const { data: ticketData, isLoading: isTicketLoading } =
        mlbApi.useTickpickTicketsQuery(homeTeam, dateTime)

    if (isTicketLoading) return <div>Loading...</div>

    return (
        <div>
            <div>
                <img
                    src={ticketData.logo}
                    alt={ticketData.provider_name}
                    width="200"
                    height="100"
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
