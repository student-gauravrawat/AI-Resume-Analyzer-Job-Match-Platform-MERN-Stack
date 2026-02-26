import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import {useDispatch, useSelector} from "react-redux"
import {clearAuthUser} from "../../redux/authSlice"


function SideBar() {
  const navigate = useNavigate();
  const {authUser} = useSelector(state=> state.user)
  const dispatch = useDispatch()

  const handleLogout = async() => {
     await logout()
     dispatch(clearAuthUser())
     navigate("/login")
  };

  return (
    <div className="md:flex flex-col w-64 bg-gray-100 border-r h-full p-4 hidden">
      {/* Top Section: Profile and Menu */}
     {authUser
     ?( <div className="grow ">
        {/* Profile */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={authUser?.profilePhoto} 
            className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-medium text-md">{authUser?.username}</p>
            <Link to="/profile" className="text-sm text-green-600">
              ● <span className=" hover:underline">Profile</span>
            </Link>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-2 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white scale-105 active:scale-95" : ""}flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ease-in-out rounded-lg`
            }
          >
            My Resumes
          </NavLink>

          <NavLink
            to="/jobmatch"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white scale-105 active:scale-95" : ""}flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ease-in-out rounded-lg`
            }
          >
            Job Match
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white scale-105 active:scale-95" : ""}flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ease-in-out rounded-lg`
            }
          >
            History
          </NavLink>
        </nav>
      </div>)
     : (
      <p className="text-gray-500 font-medium">loading...</p>
     )
     }

      {/* Bottom Section: Logout */}
      <div  className="">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600  font-medium hover:bg-red-500 hover:text-white rounded-lg transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
