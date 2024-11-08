import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import axios from 'axios';

export default function Sos() {
    // const [showAlert, setShowAlert] = useState(false)
    const [role, setRole] = useState("");

    const handleSOS = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/send-sos`
            const response = await axios.post(apiUrl);

            if (response.data.success) {
                alert('SOS sent successfully!');
            } else {
                alert('Failed to send SOS');
            }
        } catch (error) {
            console.error('Error sending SOS:', error);
            alert('An error occurred while sending SOS');
        }
    };

    useEffect(() => {
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
                setRole(res.data.role);
            } catch (error) {
                console.log("error in getting user details: ", error);
            }
        }
        getUserDetails();
    }, [])

    return (
        <>
            {role == "client" &&

                <div className="relative bg-gray-100">
                    {/* Main content area */}
                    {/* <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">Emergency Response System</h1>
                        <p className="text-gray-600">This is a demo page. The SOS button is located at the bottom left corner.</p>
                    </div> */}

                    {/* SOS Button */}
                    <button
                        onClick={handleSOS}
                        className="fixed bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 z-50"
                        aria-label="SOS Emergency Button"
                    >
                        <span className="flex items-center justify-center">
                            <AlertTriangle className="mr-2" size={30} />
                            SOS
                        </span>
                    </button>

                    {/* Alert Modal */}
                    {/* {showAlert && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold text-red-600 flex items-center">
                                            <AlertTriangle className="mr-2" size={28} />
                                            Emergency Alert
                                        </h2>
                                        <button
                                            onClick={() => setShowAlert(false)}
                                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded"
                                            aria-label="Close alert"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <p className="text-gray-700 font-semibold">
                                        Please stay calm. Help is on the way.
                                    </p>
                                </div>
                                <div className="bg-gray-100 px-6 py-4 rounded-b-lg">
                                    <button
                                        onClick={() => setShowAlert(false)}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                                    >
                                        Close Alert
                                    </button>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            }
        </>
    )
}