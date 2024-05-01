import { mlbApi } from '../app/apiSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signout() {
    const [signout, signoutStatus] = mlbApi.useSignoutMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        signout()
    }, [])

    if (signoutStatus.isSuccess) {
        navigate('/')
    } else if (signoutStatus.isError) {
        setErrorMessage(signoutStatus.error.data.detail)
    }



    
}
