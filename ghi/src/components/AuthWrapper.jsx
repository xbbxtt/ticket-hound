import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mlbApi } from '../app/apiSlice'

export default function Wrapper ({ children }) {
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/signin')
        }
    }, [user, isLoadingUser, navigate])

    if (isLoadingUser) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}


