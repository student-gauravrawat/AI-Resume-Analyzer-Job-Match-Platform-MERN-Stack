import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getUser} from "../../apis/auth"
import {setAuthUser} from "../../redux/authSlice"

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const data = await getUser()
        setUser(data)
        if(data) dispatch(setAuthUser(data.loggedUser))

      } catch (error) {
        console.error("Error", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  },[dispatch])

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-gray-700">
              Profile Loading...
            </h2>

            <p className="text-sm text-gray-500">
              Wait for for few second!
            </p>
          </div>
        </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-10">No profile data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-700 mb-6 border-b pb-4">
          My Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar Card */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-6 flex flex-col items-center border border-gray-200">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 mb-4">
              <img
                src={user?.loggedUser.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {user?.loggedUser.fullName}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              @{user?.loggedUser.username}
            </p>
            {/* Email Row */}
            <div className="space-y-3">
              {/* Email Row */}
              {/* Email & Role Section */}
              <div className="w-full mt-4 border-t pt-4">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  {/* Email Row */}
                  <span className="text-gray-500 font-semibold text-right">
                    Email:
                  </span>
                  <span className="text-gray-800 break-all">
                    {user?.loggedUser.email}
                  </span>

                  {/* Role Row */}
                  <span className="text-gray-500 font-semibold text-right">
                    Role:
                  </span>
                  <span className="text-gray-800 capitalize">
                    {user?.loggedUser.role}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors font-medium">
              <Link to="/changepassword">Change Password</Link>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium ">Full Name:</span>
                  <span className="text-gray-800 capitalize">
                    {user?.loggedUser.fullName}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">Username:</span>
                  <span className="text-gray-800">
                    {user?.loggedUser.username}
                  </span>
                </div>
                {/* Email Row */}
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-800 break-all lg:wrap-break-word">
                    {user?.loggedUser.email}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Account Status:
                  </span>
                  <span className="text-green-600 font-semibold">
                    {user?.loggedUser.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
                <h4 className="text-gray-500 font-medium mb-2 border-b pb-2">
                  Resumes Uploaded
                </h4>
                <p className="text-5xl font-bold text-slate-700">
                  {user?.resumeCount}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
                <h4 className="text-gray-500 font-medium mb-2 border-b pb-2">
                  Job Matches
                </h4>
                <p className="text-5xl font-bold text-slate-700">
                  {user?.jobMatchCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

  
