// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [loggedIn, setLoggedIn] = useState(true);
//     const [user, setUser] = useState({});
//     const [role, setRole] = useState("");

//     const showNavbar = !(location.pathname === '/login' || location.pathname === '/register');

//     useEffect(() => {
//         const checkLoggedIn = () => {
//             if (localStorage.getItem("usertoken")) setLoggedIn(true);
//             else setLoggedIn(false);
//         }
//         checkLoggedIn();
//     }, []);

//     const linksclient = [
//         {
//             id: 1,
//             name: "Home",
//             path: "/",
//         },
//         {
//             id: 2,
//             name: "Tasks",
//             path: "/todo",
//         },
//         {
//             id: 3,
//             name: "Profile",
//             path: "/profile",
//         },
//         {
//             id: 4,
//             name: "Health",
//             path: "/health",
//         },
//         {
//             id: 5,
//             name: "Food",
//             path: "/food",
//         },
//         {
//             id: 6,
//             name: "Caretaker",
//             path: "/caretaker",
//         },
//         {
//             id: 7,
//             name: "Lobby",
//             path: "/lobby",
//         },
//     ]

//     const linkscaretaker = [
//         {
//             id: 1,
//             name: "Home",
//             path: "/",
//         },
//         {
//             id: 3,
//             name: "Profile",
//             path: "/profile",
//         },
//         {
//             id: 4,
//             name: "Elderly",
//             path: "/elderly"
//         }
//     ]

//     const linkshealth = [
//         {
//             id: 1,
//             name: "Home",
//             path: "/",
//         },
//         {
//             id: 3,
//             name: "Profile",
//             path: "/profile",
//         },
//         {
//             id: 4,
//             name: "lobby",
//             path: "/lobby"
//         }
//     ]



//     useEffect(() => {
//         const token = localStorage.getItem("usertoken");

//         const getUserDetails = async () => {
//             try {
//                 const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

//                 const res = await axios({
//                     url: apiUrl,
//                     method: "GET",
//                     headers: {
//                         "Authorization": "Bearer " + token
//                     }
//                 })
//                 // console.log("res: ", res);
//                 setRole(res.data.role);
//             } catch (error) {
//                 console.log("error in getting user details: ", error);
//             }
//         }
//         if (token) getUserDetails();
//     }, [])

//     useEffect(() => {
//         const token = localStorage.getItem("usertoken");

//         const getUserDetails = async () => {
//             try {
//                 const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

//                 const res = await axios({
//                     url: apiUrl,
//                     method: "GET",
//                     headers: {
//                         "Authorization": "Bearer " + token
//                     }
//                 })
//                 // console.log("res: ", res);
//                 setUser(res.data);
//             } catch (error) {
//                 console.log("error in getting user details: ", error);
//             }
//         }
//         if (token) getUserDetails();
//     }, [navigate])

//     return (
//         <>
//             {showNavbar ?
//                 <div className="w-full h-16 top-0 shadow-2xl flex justify-between items-center p-2 bg-blue-500 text-white z-50">
//                     <a href='/' className="logo cursor-pointer font-extrabold ml-8 text-3xl">CareMate</a>

//                     <div className="links flex gap-4 justify-center items-center">
//                         {role && role == "client" &&

//                             linksclient.map((l) => (
//                                 <Link key={l.id} to={l.path} className="hover:underline text-gray-100 text-2xl font-semibold">{l.name}</Link>
//                             ))}

//                         {role && role == "caretaker" && linkscaretaker.map((l) => (
//                             <Link key={l.id} to={l.path} className="hover:underline text-gray-100 text-2xl font-semibold">{l.name}</Link>
//                         ))}

//                         {role && role == "health expert" && linkshealth.map((l) => (
//                             <Link key={l.id} to={l.path} className="hover:underline text-gray-100 text-2xl font-semibold">{l.name}</Link>
//                         ))}

//                         {/* {role && role == "client" && <Link href="http://localhost:3001" className="hover:underline text-blue-500 text-2xl font-semibold" >Pricing</Link>} */}
//                     </div>



//                     <div className='login/signout flex gap-4 justify-center items-center mr-8'>
//                         <div className="font-bold text-lg">{user && user?.username} ( {user?.role} )</div>
//                         {showNavbar ?
//                             <a href='/login' className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xl font-semibold" onClick={() => localStorage.removeItem("usertoken")}>Signout</a>
//                             :
//                             <a href='/login' className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-xl font-bold" >Login</a>
//                         }
//                     </div>
//                 </div>
//                 :

//                 <></>
//             }
//         </>
//     )
// }

// export default Navbar


import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Assuming you're using react-icons for icons
import { FiMenu, FiX, FiLogIn, FiLogOut } from 'react-icons/fi';
import axios from 'axios';

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

// This would typically come from your authentication context
// const isLoggedIn = true;
// const username = "JohnDoe";

export default function Navbar() {
    const navigate = useNavigate();
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
                // console.log("res: ", res);
                setRole(res.data.role);
            } catch (error) {
                console.log("error in getting user details: ", error);
            }
        }
        if (token) getUserDetails();
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
        if (token) getUserDetails();
    }, [navigate])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const NavItems = ({ mobile }) => (
        <>
            {role && role == "client" &&

                linksclient.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`text-gray-200 hover:text-white dark:text-gray-200 dark:hover:text-white ${mobile ? 'block py-2' : 'text-lg font-medium'
                            }`}
                        onClick={mobile ? closeSidebar : undefined}
                    >
                        {item.name}
                    </Link>
                ))

            }
            {role && role == "caretaker" &&

                linkscaretaker.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${mobile ? 'block py-2' : 'text-lg font-medium'
                            }`}
                        onClick={mobile ? closeSidebar : undefined}
                    >
                        {item.name}
                    </Link>
                ))

            }
            {role && role == "health expert" &&

                linkshealth.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${mobile ? 'block py-2' : 'text-lg font-medium'
                            }`}
                        onClick={mobile ? closeSidebar : undefined}
                    >
                        {item.name}
                    </Link>
                ))

            }
        </>
    );

    const UserSection = ({ mobile }) => (
        <div className={`flex ${mobile ? 'flex-col items-start' : 'items-center space-x-4'}`}>
            {loggedIn ? (
                <>
                    <span className="text-md font-medium text-white dark:text-gray-200">{user.username || ""}</span>
                    {/* <button
                        onClick={() => console.log('Sign out')}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white flex items-center"
                    >
                        <FiLogOut className="mr-2" />
                        Sign out
                    </button> */}
                    <a href='/login' className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-lg font-semibold" onClick={() => localStorage.removeItem("usertoken")}>Signout</a>
                </>
            ) : (
                <a href='/login' className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-xl font-semibold" >Sign In</a>

            )}
        </div>
    );

    return (
        <>
            {showNavbar &&
                <nav className="bg-blue-500 dark:bg-gray-800 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Logo Section */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-2xl font-bold text-white dark:text-white">
                                    Caremate
                                </Link>
                            </div>

                            {/* Desktop Menu Items */}
                            <div className="hidden md:flex items-center space-x-4">
                                <NavItems />
                            </div>

                            {/* Desktop User Section */}
                            <div className="hidden md:flex items-center">
                                <UserSection />
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={toggleSidebar}
                                    className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                                >
                                    <FiMenu className="h-6 w-6 text-white" />
                                    <span className="sr-only">Open menu</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Sidebar */}
                    <div
                        className={`fixed inset-y-0 right-0 z-50 w-64 bg-blue-500 dark:bg-gray-800 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                            } transition-transform duration-300 ease-in-out md:hidden`}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
                                <button
                                    onClick={closeSidebar}
                                    className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                                >
                                    <FiX className="h-6 w-6 " />
                                    <span className="sr-only">Close menu</span>
                                </button>
                            </div>
                            <div className="flex flex-col space-y-1 p-4">
                                <NavItems mobile />
                            </div>
                            <div className="mt-auto space-y-2 p-4 border-t dark:border-gray-700">
                                <UserSection mobile />
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </>
    );

}