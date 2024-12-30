import React, { useState, useContext } from 'react'
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../assets/logo.png";
import { PostRequest } from '../utils/requests';
import { AccountContext } from '../utils/accountContext';
import { useNavigate,Link } from 'react-router-dom';
import { validateEmail, checkFormEmptyFields } from '../utils/formValidation';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setLogin, setUserData} = useContext(AccountContext);
    const [disabled, setDisabled] = useState(false);
    const [loginVal, setLoginVal] = useState({
        email: "",
        password: "",
    })
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e) => {
        setDisabled(true);
        if (checkFormEmptyFields(loginVal)) {
            setDisabled(false);
        } else if (!validateEmail(loginVal.email)) {
            setDisabled(false);
        } else {
            PostRequest(`${process.env.REACT_APP_URL}/users/login`, {
                email: loginVal.email,
                password: loginVal.password,
            })
                .then(response => {
                    localStorage.setItem("login", true);
                    setDisabled(false);
                    setLogin(true);
                    setUserData(response);
                    navigate('/dashboard');

                })
                .catch(err => {
                    setDisabled(false);
                });
        }
    };
    return (
        <div className="loginbg min-w-screen min-h-screen bg-img flex items-center justify-center px-5 py-5 bg-cover bg-center">
            <div className="bg-white rounded-[4px] shadow-xl w-full overflow-hidden" style={{ maxWidth: "980px" }}>
                <div className="md:flex w-full items-center">
                    <div className="hidden md:block w-1/2 py-12 px-12">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="w-full md:w-1/2 py-12 px-12 md:px-10 border-[#0e1b6b] border-l">
                        <div className="text-center pb-7">
                            <h1 className="text-[28px]  font-normal text-[#2C226D]">Login</h1>
                            <p className="text-[20px] text-black">Please enter your login information</p>
                        </div>
                        <div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="email" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Email</label>
                                    <div className="flex">
                                        <input type="email" id="email" className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black border-[1px] border-solid border-[#0e1b6b]" value={loginVal.email} onChange={(e) => {
                                            setLoginVal(prevState => ({ ...prevState, email: e.target.value }));
                                        }}          
                                    placeholder="johndoe@gmail.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label htmlFor="password" className="text-[16px] font-normal text-black px-1 inline-block mb-[4px]">Password</label>
                                    <div className="relative flex">
                                        <input type={showPassword ? 'text' : 'password'} className="w-full pt-[6px] pr-[10px] pb-[10px] pl-[14px] rounded-[4px] text-black border-[1px] border-solid border-[#0e1b6b]" value={loginVal.password}   onChange={(e) => {
                                                setLoginVal(prevState => ({ ...prevState, password: e.target.value }));
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
                            <button className="w-full pt-[5px] pr-[10px] pb-[10px] pl-[14px] bg-[#0D99FF] font-normal text-white rounded-[8px] flex items-center justify-center text-[20px] hover:bg-black transition-all focus:outline-none" onClick={handleSubmit}>
                                Log In <MdOutlineArrowRightAlt className=" text-[20px] h-[32px] w-[32px] pt-[4px]" />
                            </button>
                            <div className='text-center mt-3'><p className='text-[#000] text-[17px] inline-block mr-1'>Don't have an account?</p><Link className="hover:text-[#0D99FF]" to='/signup'>Create an account</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
