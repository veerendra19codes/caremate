import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClientProfile() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [location, setLocation] = useState({ lat: null, lon: null });

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setSetPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;

            const token = localStorage.getItem("usertoken");
            console.log("locaiton:", location);

            const res = await axios({
                url: `${apiUrl}/api/user/profile/client`,
                method: "PUT",
                data: {
                    name,
                    surname,
                    gender,
                    age,
                    phoneNumber,
                    address,
                    lat: location.lat,
                    lon: location.lon
                },
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
            console.log("res: ", res);
        } catch (error) {
            console.log("error in submitting: ", error);
        }
    };

    // Fetch suggestions from Nominatim based on query
    const fetchSuggestions = async (searchTerm) => {
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: searchTerm,
                    format: "json",
                    addressdetails: 1,
                    limit: 5,
                },
            });
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Handle input changes to search
    const handleAddress = (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 2) {
            fetchSuggestions(searchTerm);
        } else {
            setResults([]);
        }
    };


    // Handle place selection and show lat/lon
    const handlePlaceSelect = (place) => {
        setLocation({ lat: place.lat, lon: place.lon });
        setQuery(`${place.display_name}`);
        setResults([]); // Clear results after selecting
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

    console.log("role: ", role);



    // health expert
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        age: '',
        phoneNumber: '',
        address: '',
        highestQualification: '',
        qualificationDocument: null,
        speciality: '',
        yearsOfExperience: ''
    });
    const [profileImage, setProfileImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'qualificationDocument' && files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmitHealth = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        console.log('Profile image:', profileImage);
        alert("Form Submitted: Your professional information has been successfully submitted.");
    };


    const handleSubmitCareTaker = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('phoneNumber', phoneNumber);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('address', address);


        if (file) {
            formData.append('photo', file);
            // setFormData.photo = file,
        }

        console.log("FormDataFields: ", formData);

        // alert('Form Submitted: Your form has been successfully submitted.');

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;

            const token = localStorage.getItem("usertoken");

            const res = await axios({
                url: `${apiUrl}/api/user/profile/client`,
                method: "POST",
                data: {
                    name,
                    surname,
                    gender,
                    age,
                    phoneNumber,
                    address,
                    lat: location.lat,
                    lon: location.lon
                },
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
            console.log("res: ", res);
        } catch (error) {
            console.log("error in submitting: ", error);
        }
    };


    return (
        <>
            {role == "client" &&
                <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-gray-100 text-black p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">


                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="name" className="text-gray-800">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-gray-200 border border-gray-600 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="surname" className="text-gray-800">
                                        Surname <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Enter surname"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="gender" className="text-gray-800">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="gender"
                                        placeholder="Enter gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="bg-gray-200 border border-gray-600 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="age" className="text-gray-800">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Enter age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="bg-gray-200 border border-gray-100 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="phoneNumber" className="text-gray-800">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setSetPhoneNumber(e.target.value)}
                                    className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="address" className="text-gray-800">
                                    Address <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Search for a place..."
                                    value={query}
                                    onChange={(e) => handleAddress(e)}
                                    className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                // style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                                />
                                {results.length > 0 && (
                                    <ul
                                        style={{
                                            border: "1px solid #ccc",
                                            listStyle: "none",
                                            padding: "10px",
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        {results.map((result) => (
                                            <li
                                                key={result.place_id}
                                                style={{ cursor: "pointer", padding: "5px 0" }}
                                                onClick={() => handlePlaceSelect(result)}
                                            >
                                                {result.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}



                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            }

            {role == "health expert" &&
                <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-gray-200 text-gray-100 p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmitHealth} className="space-y-4 py-8">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="name" className="text-black">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="surname" className="text-black">
                                        Surname <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        placeholder="Enter surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="gender" className="text-black">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="gender"
                                        name="gender"
                                        type="text"
                                        placeholder="Enter gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="age" className="text-black">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="Enter age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="phoneNumber" className="text-black">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="address" className="text-black">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="highestQualification" className="text-black">
                                    Highest Qualification <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="highestQualification"
                                    name="highestQualification"
                                    type="text"
                                    placeholder="Enter highest qualification"
                                    value={formData.highestQualification}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="qualificationDocument" className="text-black">
                                    Qualification Related Document <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="qualificationDocument"
                                    name="qualificationDocument"
                                    type="file"
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="speciality" className="text-black">
                                    Speciality <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="speciality"
                                    name="speciality"
                                    type="text"
                                    placeholder="Enter speciality"
                                    value={formData.speciality}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="yearsOfExperience" className="text-black">
                                    Years of Experience <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    type="number"
                                    placeholder="Enter years of experience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border border-gray-600 text-gray-100 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            }

            {role == "caretaker" &&
                <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-gray-200 text-black p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmitCareTaker} className="space-y-4 py-4">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="name" className="text-gray-800">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-gray-200 border border-gray-600 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="surname" className="text-gray-800">
                                        Surname <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Enter surname"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="gender" className="text-gray-800">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="gender"
                                        placeholder="Enter gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="bg-gray-200 border border-gray-600 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="age" className="text-gray-800">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Enter age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="bg-gray-200 border border-gray-100 text-gray-800 p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="phoneNumber" className="text-gray-800">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setSetPhoneNumber(e.target.value)}
                                    className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="address" className="text-gray-800">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="bg-gray-200 border border-gray-300 text-gray-800 p-2 rounded-md"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}
