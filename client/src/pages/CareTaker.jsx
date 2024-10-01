import { useEffect, useState } from 'react';
import elderlyLocation from './locationElderly';
import caretakerLocation from './locationCaretaker';
import axios from 'axios';

// Function to calculate distance between two lat/long points using Haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

export default function CareTaker() {
    const [closestCaretakers, setClosestCaretakers] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [user, setUser] = useState({});
    const [dashboard, setDashboard] = useState(false);

    useEffect(() => {
        if (elderlyLocation.length > 0 && caretakerLocation.length > 0) {
            const allDistances = [];
            elderlyLocation.forEach(elderly => {
                caretakerLocation.forEach(caretaker => {
                    const distance = calculateDistance(elderly.lat, elderly.lng, caretaker.lat, caretaker.lng);
                    allDistances.push({
                        elderlyName: elderly.name,
                        caretakerName: caretaker.name,

                        caretakerRating: caretaker.rating,
                        distance,
                    });
                });
            });

            const sortedDistances = allDistances.sort((a, b) => a.distance - b.distance);
            const closestFive = sortedDistances.slice(0, 5);
            setClosestCaretakers(closestFive);
        }
    }, []);

    const findCareDetailsUser = async (id) => {
        console.log("id: ", id);
        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/findCaretaker`;

            const response = await axios({
                url: apiUrl,
                method: "GET",
                data: {
                    id
                }
            });
            console.log("response: ", response);
        } catch (error) {
            console.log("error finding caretakerdetails: ", error);
        }
    }

    const token = localStorage.getItem("usertoken");

    const getUserDetails = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

            const res = await axios({
                url: apiUrl,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log("res: ", res);
            setUser(res.data);
            if (res.data.caretaker) {

                setDashboard(true);
                findCareDetailsUser(res.data.caretaker);
            }
        } catch (error) {
            console.log("error in getting user details: ", error);
        }
    }
    useEffect(() => {
        getUserDetails();
    }, [])

    const getCareTakers = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/caretakers`;

            const token = localStorage.getItem("usertoken");

            const res = await axios({
                url: apiUrl,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log('res from get caretakers ', res);
            setCaretakers(res.data);

        } catch (error) {
            console.log("error in getting all caretakers: ", error);
        }
    }

    const handleBookCareTake = async (caretaker) => {
        try {
            const token = localStorage.getItem("usertoken");
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/bookCareTaker`;
            const res = await axios({
                url: apiUrl,
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: {
                    id: caretaker._id
                }
            })
            console.log("res from booking caretaker: ", res);
            getUserDetails();
            alert("Booked");
        } catch (error) {
            console.log("error in booking a caretaker: ", error);
        }
    }

    useEffect(() => {
        getCareTakers();
    }, [])

    return (
        <>

            {
                dashboard == true ?
                    <div className='flex w-full min-h-screen bg-gray-300  justify-center items-center'>
                        <div className="flex flex-col justify-center items-center">
                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">FirstName</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">Last Name</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">Age</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">Gender</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">Address</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <label className="font-bold">Phone Number</label>
                                <div className="text-gray-800">Firstname</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
                        <div className="max-w-6xl mx-auto">
                            <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
                                Closest Caretakers Near You
                            </h1>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {caretakers?.map((caretaker, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                        <h2 className="text-3xl font-semibold mb-4 text-blue-700">{`${caretaker.firstName}`}</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                                <span className="text-2xl">{caretaker.caretakerRating || 0} / 5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-2xl">{caretaker.address || ""} </span>
                                                <button className='w-full bg-blue-500 items-center justify-center rounded-xl p-2 text-white' onClick={() => handleBookCareTake(caretaker)}>Book</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


            }
        </>
    );
}