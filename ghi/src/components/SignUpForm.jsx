import { mlbApi } from '../app/apiSlice'
import { useState } from 'react'
import TeamDropDown from './teamDropDown'
import ErrorNotification from './ErrorNotification'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        address: '',
        birthday: '',
        password: '',
        favorite_team_id: '',
    })
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signup, signupStatus] = mlbApi.useSignupMutation()

    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    const handlePasswordConfirmationChange = (event) => {
        const value = event.target.value
        setPasswordConfirmation(value)
    }

    useEffect(() => {
        if (signupStatus.isSuccess) {
            navigate('/')
        } else if (signupStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail)
        }
    }, [signupStatus, navigate])

    async function handleFormSubmit(e) {
        e.preventDefault()
        // Checks if the two password inputs have the same password
        // If they don't it displays an error and resets the password inputs
        // If they do it submits the form
        if (passwordConfirmation != formData.password) {
            setErrorMessage('Passwords do not match, please try again')
            setPasswordConfirmation('')
            setFormData({
                ...formData,
                password: '',
            })
        } else {
            signup({ ...formData })
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            {errorMessage && <ErrorNotification error={errorMessage} />}
            <div>
                <input
                    type="email"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    placeholder="Enter Email"
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Enter Password"
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password_confirmation"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                    placeholder="Confirm Password"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                    placeholder="Enter First Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                    placeholder="Enter Last Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Enter Address"
                />
            </div>
            <div>
                <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleFormChange}
                    placeholder=""
                />
            </div>
            <TeamDropDown
                value={formData.favorite_team_id}
                onChangeFunction={handleFormChange}
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}
