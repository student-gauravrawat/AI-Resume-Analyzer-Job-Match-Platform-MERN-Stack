import React from 'react'
import {TopBar, SideBar} from "../allComponents/index"
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
     <div className='flex flex-col h-screen overflow-hidden'>
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <SideBar/>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
