import { Link } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'

export default function GetSeatgeekTickets(awayTeam, homeTeam, dateTime) {
    const { data: ticketData, isLoading: isTicketLoading } =
        mlbApi.useSeatgeekTicketsQuery(awayTeam, homeTeam, dateTime)

    if (isTicketLoading) return <div>Loading...</div>

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-sm-4">
                    <img
                        src={ticketData.logo}
                        alt={ticketData.provider_name}
                        width="200"
                        height="100"
                    />
                </div>
                <div className="col-sm-4">${ticketData.min_price}</div>
                <div className="col-sm-4">
                    <Link type="button" to={ticketData.url} target="_blank">
                        <button className="btn btn-success btn-md ml-auto p-3 mb-3 russo-one-regular">
                            Ticket
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
