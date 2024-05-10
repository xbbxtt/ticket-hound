import { mlbApi } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import TeamDropDown from './TeamDropDown'
import ErrorNotification from './ErrorNotification'

export default function EditProfile() {
    const navigate = useNavigate()
    const { data: user, isLoading: isLoadingUser } =
        mlbApi.useAuthenticateQuery()
    const [editProfile, setEditProfile] = mlbApi.useEditUserMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [formData, setFormData] = useState({ ...user, password: '' })

    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (passwordConfirmation != formData.password) {
            setErrorMessage('Passwords do not match, please try again')
            setPasswordConfirmation('')
            setFormData({
                ...formData,
                password: '',
            })
        } else {
            editProfile({ ...formData })
        }
    }

    const handlePasswordConfirmationChange = (event) => {
        const value = event.target.value
        setPasswordConfirmation(value)
    }

    useEffect(() => {
        setFormData({ ...user, password: '' })
    }, [user])

    useEffect(() => {
        if (setEditProfile.isSuccess) {
            navigate('/profile')
        } else if (setEditProfile.isError) {
            setErrorMessage(setEditProfile.error.data.detail)
        }
    }, [setEditProfile, navigate])

    if (isLoadingUser) {
        return <div>Loading...</div>
    }

    return (
        <div className="container py-5">
            <h2 className="russo-one-regular">Edit Profile</h2>
            <div className="card col col-span-6 shadow">
                <form onSubmit={handleFormSubmit}>
                    {errorMessage && <ErrorNotification error={errorMessage} />}
                    <div>
                        <InputBox
                            title="Password: "
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            placeholder="Password"
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
                    <label htmlFor="favorite_team_id">Favorite Team:</label>
                    <TeamDropDown
                        name="favorite_team_id"
                        value={formData.favorite_team_id}
                        onChangeFunction={handleFormChange}
                    />
                    <div className="p-4">
                        <button
                            className="btn btn-success btn-md ml-auto p-3 mb-3 russo-one-regular"
                            type="submit"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
