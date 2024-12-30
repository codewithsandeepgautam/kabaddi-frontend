import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateEmail, validatePhone } from '../utils/formValidation';
import { PostRequest } from '../utils/requests';
import { AccountContext } from '../utils/accountContext';
import { useNavigate, Link } from 'react-router-dom';
function Signup() {
    const { types } = useContext(AccountContext);
    const { navigate } = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        type: "",
        phoneNumber: "",
    })
    const [error, setError] = useState({
        email: false,
        msg: false,
        phoneNumber: false,
        message: "",
        success: false,
    });
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const fullNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z\s]/g, '');
        if (alphaValue.length <= 30) {
            setFormData(prevState => ({ ...prevState, fullname: alphaValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };
    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, "");
        if (numericValue.length <= 10) {
            setFormData((prevState) => ({ ...prevState, phoneNumber: numericValue }));
            setError((prevState) => ({ ...prevState, phoneNumber: false, message: "" }));
        }
    };
    const handleEmailInputChange = (e) => {
        const inputValue = e.target.value;
        const val = inputValue.replace(" ", "");
        setFormData((prevState) => ({ ...prevState, email: val }));
        setError((prevState) => ({ ...prevState, email: false, message: "" }));
    };
    function handleSubmitData(e) {
        setError((prevState) => ({ ...prevState, message: "" }));
        if (!formData.fullname || !formData.email || !formData.phoneNumber || !formData.password || !formData.type) {
            setError((prevState) => ({
                ...prevState,
                success: false,
                message: "Fields must not be empty!",
            }));
        } else if (!validateEmail(formData.email)) {
            setError((prevState) => ({
                ...prevState,
                email: true,
                message: "Email is invalid!",
            }));
        } else if (!validatePhone(formData.phoneNumber)) {
            setError((prevState) => ({
                ...prevState,
                phoneNumber: true,
                message: "Phone number is invalid!",
            }));
        } else {
            PostRequest(`${process.env.REACT_APP_URL}/users/register`, {
                fullname: formData.fullname,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                type: formData.type,
                password: formData.password,
            })
                .then((response) => {
                    setError((prevState) => ({ ...prevState, success: true }));
                    setFormData((prevState) => ({
                        ...prevState,
                        fullname: "",
                        email: "",
                        password: "",
                        phoneNumber: "",
                        type: "",
                    }));
                    navigate("/dashboard");
                })
                .catch((err) => {
                    setError((prevState) => ({
                        ...prevState,
                        message: err?.data
                            ? err.data.error
                            : "Something went wrong. Try again later!",
                    }));
                });
        }
    }
    console.log("formdata<<", formData);
    return (
        <div className="loginbg min-w-screen min-h-screen bg-img flex items-center justify-center px-5 py-5 bg-cover bg-center">
            <div className="bg-white rounded-lg shadow-xl w-full overflow-hidden" style={{ maxWidth: "980px" }}>
                <div className="md:flex w-full items-center">
                    <div className="hidden md:block w-1/2 py-12 px-12">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="w-full md:w-1/2 py-12 px-12 md:px-10 border-[#0e1b6b] border-l">
                        <div className="text-center pb-7">
                            <h1 className="text-[28px]  font-normal text-[#2C226D]">Sign Up</h1>
                            <p className="text-[20px] text-black">Please enter your account information</p>
                        </div>
                        <div>
                            <p className={` mb-[10px] text-[#fd5901] font-medium ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="fullname" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Full Name</label>
                                    <div className="flex">
                                        <input type="text" id="fullname" className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black  border-[1px] border-solid border-[#0e1b6b]" placeholder="johndoe" value={formData.fullname} onChange={fullNameHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="email" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Email Address</label>
                                    <div className="flex">
                                        <input type="email" id="email" className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black  border-[1px] border-solid border-[#0e1b6b]" value={formData.email} onChange={handleEmailInputChange} placeholder="johndoe@gmail.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="number" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Phone Number</label>
                                    <div className="flex">
                                        <input type="number" id="number" className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black  border-[1px] border-solid border-[#0e1b6b]" value={formData.phoneNumber} onChange={handlePhoneInputChange} placeholder="(+91) 696 88 77 55" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label htmlFor="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select id="types" class="bg-gray-50 border-[1px] border-solid border-[#0e1b6b] text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
                                        setFormData(formData => ({
                                            ...formData,
                                            type: e.target.value
                                        }));
                                    }}>
                                        <option>Choose category</option>
                                        {types?.map((item, index) => (
                                            <option value={item?._id} key={index}>
                                                {item?.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label htmlFor="password" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Password</label>
                                    <div className="relative flex">
                                        <input type={showPassword ? 'text' : 'password'} className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black  border-[1px] border-solid border-[#0e1b6b]" value={formData.password} onChange={(e) => {
                                            setFormData(formData => ({
                                                ...formData,
                                                password: e.target.value
                                            }));
                                        }} placeholder="****************" />
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2" >
                                            {showPassword ? (
                                                <FaEyeSlash className="text-black" size={16} />
                                            ) : (
                                                <FaEye className="text-black" size={16} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] bg-[#0D99FF] font-normal text-white rounded-[4px] flex items-center justify-center text-[20px] hover:bg-black transition-all focus:outline-none" onClick={handleSubmitData}>
                            Sign Up <MdOutlineArrowRightAlt className=" text-[20px] h-[32px] w-[32px] pt-[4px]" />
                        </button>
                        <div className='text-center mt-3'><Link className="hover:text-[#0D99FF]" to='/'>Login</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup
