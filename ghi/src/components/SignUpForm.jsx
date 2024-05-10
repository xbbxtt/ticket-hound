import { mlbApi } from '../app/apiSlice'
import { useState } from 'react'
import TeamDropDown from './TeamDropDown'
import ErrorNotification from './ErrorNotification'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputBox from './InputBox'

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
        <div className="container-fluid py-5">
            <div className="offset-3 col-6 container-darkblue">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleFormSubmit}>
                        {errorMessage && (
                            <ErrorNotification error={errorMessage} />
                        )}
                        <div>
                            <InputBox
                                title="Email: "
                                type="email"
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                placeholder="Enter Email"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="Password: "
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormChange}
                                placeholder="Enter Password"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="Confirm Password: "
                                type="password"
                                name="password_confirmation"
                                value={passwordConfirmation}
                                onChange={handlePasswordConfirmationChange}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="First Name: "
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleFormChange}
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="Last Name: "
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleFormChange}
                                placeholder="Enter Last Name"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="Address: "
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                placeholder="Enter Address"
                            />
                        </div>
                        <div>
                            <InputBox
                                title="Birthday: "
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleFormChange}
                                placeholder=""
                            />
                        </div>
                        <label className="mb-2">
                            Favorite Team:
                            <TeamDropDown
                                name="favorite_team_id"
                                value={formData.favorite_team_id}
                                onChangeFunction={handleFormChange}
                            />
                        </label>
                        <div className="p-4">
                            <button
                                className="btn btn-success btn-md ml-auto p-3 mb-3 russo-one-regular"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
