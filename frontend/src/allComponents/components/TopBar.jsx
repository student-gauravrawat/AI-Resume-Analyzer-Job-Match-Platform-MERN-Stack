import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import { useDispatch } from 'react-redux';
import {clearAuthUser} from "../../redux/authSlice"

function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = async () => {
    await logout()
         dispatch(clearAuthUser())
         navigate("/login")
   
  };

  const navLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'My Resume', path: '/' },
    { name: 'Job Match', path: '/jobmatch' },
    { name: 'History', path: '/history' },
  ];

  return (

    <div className='relative flex items-center bg-gray-100 border-b justify-between w-full z-50'>
      <div className="flex items-center px-2">
        <img 
          className="w-15 h-15 rounded-full mr-2" 
          src='/logo.png'  
          alt='logo'
        />
        <h1 className="text-xl font-semibold text-gray-800 mb-2">AI Resume Analyzer</h1>
      </div>

      <button 
        onClick={toggleMenu}
        className='p-4 focus:outline-none sm:hidden'
        aria-label="Toggle menu"
      >
        <TiThMenu className='text-2xl text-gray-800'/>
      </button>

      {isOpen && (
        <div className='absolute top-15 right-0 w-48 bg-white border border-gray-200 shadow-xl z-100 rounded-bl-lg sm:hidden'>
          <ul className='flex flex-col py-2'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-b border-gray-50"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}   
    </div>
  )
}

export default TopBar;