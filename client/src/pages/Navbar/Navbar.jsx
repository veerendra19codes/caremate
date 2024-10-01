import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");

    const showNavbar = !(location.pathname === '/login' || location.pathname === '/register');

    useEffect(() => {
        const checkLoggedIn = () => {
            if (localStorage.getItem("usertoken")) setLoggedIn(true);
            else setLoggedIn(false);
        }
        checkLoggedIn();
    }, []);

    const linksclient = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "Tasks",
            path: "/todo",
        },
        {
            id: 3,
            name: "Profile",
            path: "/profile",
        },
        {
            id: 4,
            name: "Health",
            path: "/health",
        },
        {
            id: 5,
            name: "Food",
            path: "/food",
        },
        {
            id: 6,
            name: "Caretaker",
            path: "/caretaker",
        },
        {
            id: 7,
            name: "Lobby",
            path: "/lobby",
        },
    ]

    const linkscaretaker = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 3,
            name: "Profile",
            path: "/profile",
        },
        {
            id: 4,
            name: "Elderly",
            path: "/elderly"
        }
    ]

    const linkshealth = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 3,
            name: "Profile",
            path: "/profile",
        },
        {
            id: 4,
            name: "lobby",
            path: "/lobby"
        }
    ]



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
                // console.log("res: ", res);
                setUser(res.data);
            } catch (error) {
                console.log("error in getting user details: ", error);
            }
        }
        getUserDetails();
    }, [])

    return (
        <>
            {showNavbar ?
                <div className="w-full h-16 top-0 shadow-xl flex justify-between items-center p-2">
                    <a href='/' className="logo cursor-pointer font-extrabold ml-8 text-3xl">CareMate</a>

                    <div className="links flex gap-4 justify-center items-center">
                        {role && role == "client" &&

                            linksclient.map((l) => (
                                <Link key={l.id} to={l.path} className="hover:underline text-blue-500 text-2xl font-semibold">{l.name}</Link>
                            ))}

                        {role && role == "caretaker" && linkscaretaker.map((l) => (
                            <Link key={l.id} to={l.path} className="hover:underline text-blue-500 text-2xl font-semibold">{l.name}</Link>
                        ))}

                        {role && role == "health expert" && linkshealth.map((l) => (
                            <Link key={l.id} to={l.path} className="hover:underline text-blue-500 text-2xl font-semibold">{l.name}</Link>
                        ))}

                        {/* {role && role == "client" && <Link href="http://localhost:3001" className="hover:underline text-blue-500 text-2xl font-semibold" >Pricing</Link>} */}
                    </div>



                    <div className='login/signout flex gap-4 justify-center items-center mr-8'>
                        <div className="font-bold text-2xl">{user && user?.firstName} ( {user?.role} )</div>
                        {showNavbar ?
                            <a href='/login' className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white " onClick={() => localStorage.removeItem("usertoken")}>Signout</a>
                            :
                            <a href='/login' className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white" >Login</a>
                        }
                    </div>
                </div>
                :

                <></>
            }
        </>
    )
}

export default Navbar
