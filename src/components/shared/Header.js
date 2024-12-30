import React, { useState, useContext } from 'react'
import { MdMenu } from 'react-icons/md'
import { IoLogOutOutline } from "react-icons/io5";
import { MdMenuOpen } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../utils/accountContext';

const Header = ({ ToggleClick }) => {
  const [toggleClass, settoggleClass] = useState(false)
  const navigate = useNavigate();
  const { setLogin, setUserData } = useContext(AccountContext);
  const toggleonClick = () => {
    settoggleClass(!toggleClass)
  }
  const handleLogout = () => {
    setLogin(false);
    setUserData(null);
    localStorage.removeItem("login");
    navigate("/");
  }
  return (
    <header className={` bg-[#edf2f6] text-[#171718] sm:p-[30px] p-[20px] flex justify-between items-center sticky top-0 right-0 ${toggleClass ? '' : 'max-lg:before:content max-lg:before:absolute max-lg:before:top-0 max-lg:before:left-0 max-lg:before:h-full max-lg:before:w-full max-lg:before:bg-[#e7e7e7]'}`}>
      <div
        className='relative z-30'
        onClick={() => {
          ToggleClick()
          toggleonClick()
        }}
      >
        {toggleClass ? (
          <MdMenu className='text-[28px] cursor-pointer' />
        ) : (
          <MdMenuOpen className='text-[28px] cursor-pointer' />
        )}
      </div>
      <div>
        <button><p className='flex items-center text-[18px] bg-red-700 text-white py-1 px-2 rounded-[3px]' onClick={handleLogout}><IoLogOutOutline />Logout</p></button>
      </div>
    </header>
  )
}
export default Header
