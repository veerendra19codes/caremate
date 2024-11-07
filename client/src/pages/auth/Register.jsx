import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("client");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;
            console.log("apiUrl: ", apiUrl);
            const res = await axios({
                method: "POST",
                url: apiUrl,
                data: {
                    phoneNumber,
                    username,
                    password,
                    role
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
            <form className='bg-gray-100 shadow-lg p-12 rounded-3xl flex flex-col justify-center items-center gap-2  lg:gap-4 min-w-[250px]  lg:min-w-[400px] min-h-[500px]' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-bold text-black'>Register</h1>
                <h4 className=' text-gray-500'>Enter your details to create an account</h4>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-black'>I am</label>

                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="border-[1px] border-gray-600 rounded-lg bg-transparent p-2 text-black">
                        {/* <options disabled >{role ? role : "Client"}</options> */}
                        <option className=' text-black' value="client">Client</option>
                        <option className=' text-black' value="caretaker">CareTaker</option>
                        <option className=' text-black' value="health expert">Health Expert</option>
                    </select>
                </div>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-black'>Username</label>

                    <input placeholder='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-black' />
                </div>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-black'>Phone Number</label>

                    <input type="number" placeholder='phone number' name='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-black' />
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

                <button type='submit' className='bg-blue-500 hover:bg-blue-500 rounded-lg px-4 py-2 cursor-pointer text-white w-[80%] mt-6'>
                    Register
                </button>

                <div className="w-full text-black text-center">Already have an account? <a href='/login' className='text-blue-500 hover:text-blue-400'>Login</a></div>
            </form >
        </div >
    )
}

export default Register
