import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
function layout() {

  return (

    <div className='flex flex-col text-black font-Montserrat min-h-[100vh] justify-between'>
        <div className="header"><Navbar/></div>
        <div className="body"><Outlet/></div>
        <div className="footer">
          <Footer/>
        </div>
    </div>

  )
}

export default layout