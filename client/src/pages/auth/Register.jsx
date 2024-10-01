import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("client");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    firstName,
                    surname,
                    password,
                    confirmPassword,
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
        <div className='w-full min-h-screen flex justify-center items-center bg-gray-400'>
            <form className='bg-gray-200 shadow-lg p-4 rounded-lg flex flex-col justify-center items-center gap-2  lg:gap-4 min-w-[250px]  lg:min-w-[400px] min-h-[500px]' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold text-black'>Register</h1>

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
                    <label className='text-black'>First Name</label>

                    <input placeholder='firstname' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-black' />
                </div>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-black'>Surname</label>

                    <input placeholder='surname' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-black' />
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

                <div className="inputfield flex flex-col w-full ">
                    <label className='text-black'>Confirm Password</label>

                    <div className='flex justify-center items-center border-[1px] border-gray-600 rounded-lg p-2'>
                        <input placeholder='confirm password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className='bg-transparent outline-none text-black w-full'
                            type={showConfirmPassword ? "text" : "password"} />
                        {showConfirmPassword ? <FaEyeSlash className='font-bold text-xl text-black cursor-pointer'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <IoEyeSharp className='font-bold text-xl text-black cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
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
