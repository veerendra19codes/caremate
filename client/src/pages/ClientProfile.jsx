import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

// Sample initial data
const initialProfile = {
    username: "elder_john",
    name: "John Doe",
    phoneNumber: "5551234567",
    address: "123 Elder St",
    city: "Safetown",
    profileImage: "/placeholder.svg?height=100&width=100",
    guardian: {
        name: "Jane Smith",
        phoneNumber: "5559876543",
        address: "456 Guardian Ave",
        city: "Careville",
        profileImage: "/placeholder.svg?height=100&width=100"
    }
}

export default function ElderlyProfile() {
    const [profile, setProfile] = useState(initialProfile)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const validateForm = (formData) => {
        const errors = []

        // Check for empty fields
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`)
            }
        }

        // Validate phone numbers
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(formData.get('phoneNumber'))) {
            errors.push('Phone number must be 10 digits')
        }
        if (!phoneRegex.test(formData.get('guardianPhoneNumber'))) {
            errors.push('Guardian phone number must be 10 digits')
        }

        // Validate username
        const usernameRegex = /^[a-zA-Z0-9_.]{3,15}$/
        if (!usernameRegex.test(formData.get('username'))) {
            errors.push('Username must be 3-15 characters and can only include letters, numbers, underscores, and periods')
        }

        return errors
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const errors = validateForm(formData)

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error))
            return
        }

        setProfile(prevProfile => ({
            ...prevProfile,
            username: formData.get('username'),
            name: formData.get('name'),
            phoneNumber: formData.get('phoneNumber'),
            address: formData.get('address'),
            city: formData.get('city'),
            guardian: {
                ...prevProfile.guardian,
                name: formData.get('guardianName'),
                phoneNumber: formData.get('guardianPhoneNumber'),
                address: formData.get('guardianAddress'),
                city: formData.get('guardianCity'),
            }
        }))
        setIsDialogOpen(false)
        toast.success('Profile updated successfully')
    }

    return (
        <div className="container mx-auto p-4 lg:px-[20%] xl:px-[30%]">
            <Toaster position="top-right" />
            <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <img src={profile.profileImage} alt={profile.name} className="h-20 w-20 rounded-full" />
                            <div>
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                <p className="text-sm text-gray-500">@{profile.username}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{profile.phoneNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{profile.address}, {profile.city}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-4">Guardian Information</h3>
                    <div className="flex items-center space-x-4 mb-4">
                        <img src={profile.guardian.profileImage} alt={profile.guardian.name} className="h-16 w-16 rounded-full" />
                        <div>
                            <h4 className="text-lg font-semibold">{profile.guardian.name}</h4>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{profile.guardian.phoneNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{profile.guardian.address}, {profile.guardian.city}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4 h-[500px] overflow-y-auto px-2">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" id="username" name="username" defaultValue={profile.username} className="mt-1 w-full rounded-md border-[2px]  border-gray-300 shadow-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" defaultValue={profile.name} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" defaultValue={profile.phoneNumber} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" defaultValue={profile.address} className="mt-1 block w-full shadow-sm rounded-md border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" id="city" name="city" defaultValue={profile.city} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Guardian Name</label>
                                <input type="text" id="guardianName" name="guardianName" defaultValue={profile.guardian.name} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="guardianPhoneNumber" className="block text-sm font-medium text-gray-700">Guardian Phone Number</label>
                                <input type="tel" id="guardianPhoneNumber" name="guardianPhoneNumber" defaultValue={profile.guardian.phoneNumber} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="guardianAddress" className="block text-sm font-medium text-gray-700">Guardian Address</label>
                                <input type="text" id="guardianAddress" name="guardianAddress" defaultValue={profile.guardian.address} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div>
                                <label htmlFor="guardianCity" className="block text-sm font-medium text-gray-700">Guardian City</label>
                                <input type="text" id="guardianCity" name="guardianCity" defaultValue={profile.guardian.city} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}