import React,{useEffect,useState} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PopOver from '../components/PopOver'
function Layout() {
    const [shopPop,setShowPop] = useState(true)
  const handlePop = () =>{
    setShowPop(prev=>!prev)
  }
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
<>
    <div className='flex flex-col text-black font-Montserrat min-h-[100vh] justify-between'>
        <div className="header"><Navbar/></div>
        <div className="body"><Outlet/></div>
        <div className="footer">
          <Footer/>
        </div>
    </div>
<PopOver isOpen={shopPop} triggerClose={handlePop}>
           <div className={`relative bg-[#1d50c3] glowing-shadow xsm:h-[200px] xsm:w-[100%]  md:h-[600px] md:w-[70%] m-auto`}>
           <iframe className="h-100 w-100" width="560" height="315" src="https://www.youtube.com/embed/3VZiSYs7oKo?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>    </div>
           </PopOver>
</>
  )
}

export default Layout