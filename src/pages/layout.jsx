import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
function layout() {
  return (
    <div className='flex flex-col text-black font-Montserrat'>
        <div className="header"><Navbar/></div>
        <div className="body"><Outlet/></div>
        <div className="footer">Footer</div>
    </div>
  )
}

export default layout