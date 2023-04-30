import React,{useEffect} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
function Layout() {
  const navigate = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(()=>{
  if(currentPath==="/")
  {
    navigate("/home")
  }
  },[])
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

export default Layout