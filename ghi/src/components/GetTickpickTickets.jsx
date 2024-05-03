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
