import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
            console.log("apiUrl: ", apiUrl);
            const res = await axios({
                method: "POST",
                url: apiUrl,
                data: {
                    phoneNumber,
                    password,
                }
            });

            console.log("res:", res);
            localStorage.setItem("usertoken", res.data.token);
            navigate("/");
        } catch (error) {
            console.log("error:", error);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("usertoken")) {
                navigate('/');
            }
        }
        checkAuth();
    }, [navigate]);

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-gray-200'>
            <form className='bg-gray-100 shadow-lg p-8 rounded-lg flex flex-col justify-center items-center gap-4 w-[400px] h-[500px]' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-bold text-black'>Login</h1>
                <h4 className=' text-gray-500'>Enter your details to login</h4>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-black'>Username or Phone Number</label>

                    <input type="text" placeholder='username or phone number' name='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-black' />
                </div>

                <div className="inputfield flex flex-col w-full ">
                    <label className='text-black'>Password</label>

                    <div className='flex justify-center items-center border-[1px] border-gray-600 rounded-lg p-2'>
                        <input placeholder='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                            className='bg-transparent outline-none text-black w-full'
                            type={showPassword ? "text" : "password"} />
                        {showPassword ? <FaEyeSlash className='font-bold text-xl text-black cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp className='font-bold text-xl text-black cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
                    </div>
                </div>

                <button type='submit' className='bg-blue-500 hover:bg-blue-500 rounded-lg px-4 py-2 cursor-pointer text-black w-[80%] mt-6 text-white'>
                    Login
                </button>

                <div className="w-full text-black text-center">Don&apos;t have an account? <a href='/register' className='text-blue-500 hover:text-blue-400'>Register</a></div>
            </form >
        </div >
    )
}

export default Login
