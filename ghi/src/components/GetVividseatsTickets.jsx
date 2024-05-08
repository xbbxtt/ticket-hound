import { Link } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'

export default function GetVividseatsTickets(awayTeam, homeTeam, dateTime) {
    const { data: ticketData, isLoading: isTicketLoading } =
        mlbApi.useVividseatsTicketsQuery(awayTeam, homeTeam, dateTime)

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
                        <button className="btn btn-success mx-2 btn-lg">
                            Ticket
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
