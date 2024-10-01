import { useEffect, useState } from 'react';
import elderlyLocation from './locationElderly';
import caretakerLocation from './locationCaretaker';

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

export default function ElderlyPage() {
    const [closestElderly, setClosestElderly] = useState([]);

    useEffect(() => {
        if (elderlyLocation.length > 0 && caretakerLocation.length > 0) {
            const allDistances = [];
            caretakerLocation.forEach(caretaker => {
                elderlyLocation.forEach(elderly => {
                    const distance = calculateDistance(caretaker.lat, caretaker.lng, elderly.lat, elderly.lng);
                    allDistances.push({
                        caretakerName: caretaker.name,
                        elderlyName: elderly.name,
                        elderlyAge: elderly.age,
                        elderlyPhone: elderly.phone,
                        elderlyDescription: elderly.description,
                        distance,
                    });
                });
            });

            const sortedDistances = allDistances.sort((a, b) => a.distance - b.distance);
            const closestFive = sortedDistances.slice(0, 5); // You can adjust this to find more or fewer closest elderly people
            setClosestElderly(closestFive);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
                    Closest Elderly Near You
                </h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {closestElderly.map((elderly, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-3xl font-semibold mb-4 text-blue-700">{elderly.elderlyName}</h2>
                            <div className="space-y-4">
                                <div className="text-xl text-gray-600">Age: {elderly.elderlyAge}</div>
                                <div className="text-xl text-gray-600">Phone: {elderly.elderlyPhone}</div>
                                <div className="text-xl text-gray-600">Description: {elderly.elderlyDescription}</div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-2xl">{elderly.distance.toFixed(2)} km </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}