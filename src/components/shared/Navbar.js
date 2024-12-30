import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaGamepad, FaUserAlt, FaClipboardList } from 'react-icons/fa';
import { IoLogOutOutline } from "react-icons/io5";
import { AccountContext } from '../../utils/accountContext';
const Navbar = () => {
  const pathname = useLocation().pathname;
  const { setLogin, setUserData } = useContext(AccountContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLogin(false);
    setUserData(null);
    localStorage.removeItem("login");
    navigate("/");
  }
  return (
    <nav className='bg-[#13215c] flex flex-col justify-between h-[100vh] sm:w-[300px] w-[260px] sticky top-0 left-0 z-30'>
      <div>
        <div className='sm:p-[24px] p-[20px] bg-[#0e1b6b]'>
          <Link to='/Dashboard'>
            <h2 className='lg:text-[36px] md:text-[18px] text-[16px] font-bold mb-6 text-white'>Tournament</h2>
          </Link>
        </div>
        <ul className='sm:p-[6px] p-[20px]'>
          {navMenu.map((item, i) => (
            <li className='mb-[12px]' key={i}>
              <Link
                to={item.handle}
                className={`flex items-center lg:text-[18px] md:text-[14px] text-white 
                ${pathname === item.handle ? 'bg-[#b91c1c] text-white' : ''} 
                px-4 py-2 rounded-md transition-colors duration-200`}
              >
                <span className='mr-[10px]'>{item.icon}</span>
                <span>{item.link}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='sm:p-[30px] p-[20px]'>
        <ul>
          <li className='mb-[10px]'>
            <button onClick={handleLogout}><p className='flex items-center text-[18px] text-white py-1 px-2 rounded-[2px]'><IoLogOutOutline className='mr-1' />Logout</p></button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const navMenu = [
  {
    link: 'Dashboard',
    handle: '/dashboard',
    icon: <FaTachometerAlt />
  },
  {
    link: 'Manage Game',
    handle: '/managegame',
    icon: <FaGamepad />
  },
  {
    link: 'Edit Score Camera',
    handle: '/editscorecamera',
    icon: <FaUserAlt />
  },
  {
    link: 'Edit Score Opposite',
    handle: '/editscoreopposite',
    icon: <FaClipboardList />
  },
]

export default Navbar;
