import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const ToggleClick = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <>
      <div className='flex'>
        <div className={` duration-500 ${toggleMenu ? ' overflow-hidden invisible visibil sm:ml-[-300px] ml-[-260px]' : 'ml-0 overflow-visible visible visibil sm:w-[300px] w-[260px]' }`} >
          <Navbar />
        </div>

        <div className={` w-full duration-500 relative ${toggleMenu ? '' : 'max-lg:before:content max-lg:before:absolute max-lg:before:top-0 max-lg:before:left-0 max-lg:before:h-full max-lg:before:w-full max-lg:before:bg-[#e7e7e7]' }`}>
          <Header ToggleClick={ToggleClick} />
          <div className={` sm:p-[30px] p-[20px] ${toggleMenu ? '  ' : 'max-sm:hidden' }`}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout