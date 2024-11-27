import { useState, useRef, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { X } from 'lucide-react'
import axios from 'axios'

export default function ElderlyProfile() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const dialogRef = useRef(null)
    const [userDetails, setUserDetails] = useState({
        username: "No username",
        name: "No name",
        phoneNumber: "no phonenumber",
        address: "No address",
        city: "No city",
        guardianName: "No guardian name",
        guardianPhoneNumber: "No guardian phonenumber",
        guardianAddress: "No guardian address",
        guardianCity: "No guardian city",
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsDialogOpen(false)
            }
        }

        if (isDialogOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDialogOpen])

    const validateForm = (formData) => {
        const errors = []

        // Check for empty fields
        for (let [key, value] of Object.entries(formData)) {
            if (typeof value === 'string' && !value.trim()) {
                errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
            } else if (value == null || value === '') {
                errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
            }
        }


        // Validate phone numbers
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(formData.phoneNumber)) {
            errors.push('Phone number must be 10 digits')
        }
        if (!phoneRegex.test(formData.guardianPhoneNumber)) {
            errors.push('Guardian phone number must be 10 digits')
        }

        // // Validate username
        // const usernameRegex = /^[a-zA-Z0-9_.]{3,15}$/
        // if (!usernameRegex.test(formData.get('username'))) {
        //     errors.push('Username must be 3-15 characters and can only include letters, numbers, underscores, and periods')
        // }

        return errors
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        // const formData = new FormData(event.target)
        const errors = validateForm(userDetails)

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error))
            return
        }

        try {
            const userToken = localStorage.getItem("usertoken");
            const res = await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/client`,
                data: userDetails,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                }
            })
            console.log("res: ", res);
        } catch (error) {
            console.log("error in editing profile: ", error);
        }

        setIsDialogOpen(false)
        toast.success('Profile updated successfully')
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userToken = localStorage.getItem("usertoken");

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userToken}`,
                    }
                })
                console.log("res: ", res);
                setUserDetails((prev) => ({
                    ...prev,
                    username: res.data.username,
                    name: res.data.name,
                    phoneNumber: res.data.phoneNumber,
                    address: res.data.address,
                    city: res.data.city,
                    gaurdianName: res.data.gaurdianName,
                    guardianAddress: res.data.guardianAddress,
                    guardianCity: res.data.guardianCity,
                    guardianPhoneNumber: res.data.guardianPhoneNumber,
                }));
            } catch (error) {
                console.log("error: ", error);
            }
        }
        fetchUserDetails();
    }, [])

    return (
        <div className="container mx-auto p-4 lg:px-[20%] xl:px-[30%] bg-gray-100">
            <Toaster position="top-right" />
            <div className="bg-white shadow-xl rounded-lg mb-6">
                <div className="p-4">

                    {/* ----------------------------MY INFORMATION  ---------------------------------------------------------------------------------- */}
                    <h3 className="text-xl font-bold mb-4">My Information</h3>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            {/* <img src={profile.profileImage} alt={profile.name} className="h-20 w-20 rounded-full" /> */}
                            <div>
                                <h2 className="text-xl font-semibold text-black">{userDetails?.username}</h2>
                                <p className="text-sm text-gray-500">{userDetails?.name || "No name"}</p>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v2H8V9z" />
                            </svg>
                            <span>{userDetails?.bio || "No Bio"}</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{userDetails?.phoneNumber || "No phonenumber"}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{userDetails?.address || "No address"}, {userDetails?.city || "No city"}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                            </svg>
                            <span>{userDetails?.age || "No age"}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 22v-2a6 6 0 0112 0v2h-2v-2a4 4 0 00-8 0v2H4z" />
                            </svg>
                            <span>{userDetails?.gender || "No gender"}</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-lg mb-6">
                <div className="p-4">

                    {/* ----------------------------GUARDIAN INFORMATION  ---------------------------------------------------------------------------------- */}
                    <h3 className="text-xl font-bold mb-4">Guardian Information</h3>
                    <div className="flex items-center space-x-4 mb-4">
                        {/* <img src={profile.guardian.profileImage} alt={profile.guardian.name} className="h-16 w-16 rounded-full" /> */}
                        <div>
                            <h4 className="text-lg font-semibold">{userDetails?.guardianName || "No guardian name"}</h4>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{userDetails?.guardianPhoneNumber || "No guardian phonenumber"}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{userDetails?.guardianAddress || "No guardian address"}, {userDetails?.guardianCity || "No guardian city"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------DIALOG  ---------------------------------------------------------------------------------- */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div ref={dialogRef} className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            aria-label="Close dialog"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                        {/* FORM  */}
                        <form onSubmit={handleEditSubmit} className="space-y-4 h-[500px] overflow-y-auto px-2">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" defaultValue={userDetails?.name || "No name"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }} />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" defaultValue={userDetails?.phoneNumber || "No phonenumber"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        phoneNumber: e.target.value,
                                    }))
                                }} />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" defaultValue={userDetails?.address || "No address"} className="mt-1 block w-full shadow-sm rounded-md border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }} />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" id="city" name="city" defaultValue={userDetails?.city || "No city"
                                } className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        city: e.target.value,
                                    }))
                                }}
                                />
                            </div>
                            <div>
                                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Guardian Name</label>
                                <input type="text" id="guardianName" name="guardianName" defaultValue={userDetails?.guardianName || "No guardian name"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        guardianName: e.target.value,
                                    }))
                                }} />
                            </div>
                            <div>
                                <label htmlFor="guardianPhoneNumber" className="block text-sm font-medium text-gray-700">Guardian Phone Number</label>
                                <input type="tel" id="guardianPhoneNumber" name="guardianPhoneNumber" defaultValue={userDetails?.guardianPhoneNumber || "No guardian phonenumber"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        guardianPhoneNumber: e.target.value,
                                    }))
                                }} />
                            </div>
                            <div>
                                <label htmlFor="guardianAddress" className="block text-sm font-medium text-gray-700">Guardian Address</label>
                                <input type="text" id="guardianAddress" name="guardianAddress" defaultValue={userDetails?.guardianAddress || "No guardian address"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        guardianAddress: e.target.value,
                                    }))
                                }} />
                            </div>
                            <div>
                                <label htmlFor="guardianCity" className="block text-sm font-medium text-gray-700">Guardian City</label>
                                <input type="text" id="guardianCity" name="guardianCity" defaultValue={userDetails?.guardianCity || "No guardian city"} className="mt-1 block w-full rounded-md shadow-sm border-[2px]  border-gray-300 p-2" onChange={(e) => {
                                    setUserDetails((prev) => ({
                                        ...prev,
                                        guardianCity: e.target.value,
                                    }))
                                }} />
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