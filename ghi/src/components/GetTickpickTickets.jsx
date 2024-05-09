import { Link } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'
import ErrorNotification from './ErrorNotification'
import { useEffect, useState } from 'react'

export default function GetTickpickTickets(homeTeam, dateTime) {
    const {
        data: ticketData,
        isLoading: isTicketLoading,
        error,
        isError,
    } = mlbApi.useTickpickTicketsQuery(homeTeam, dateTime)

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isError) {
            setErrorMessage(error.data.detail)
        }
    }, [error, isError, setErrorMessage, isTicketLoading])

    if (isTicketLoading) return <div>Loading...</div>
    if (error) return <ErrorNotification error={errorMessage} />

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
                        <button className="btn btn-success btn-lg ml-auto russo-one-regular">
                            Ticket
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
