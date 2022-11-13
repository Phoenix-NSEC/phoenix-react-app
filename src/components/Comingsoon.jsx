import React from 'react'
import { useNavigate } from 'react-router-dom'
// import commingsoon from '../static/comming-soon.gif'
import underconstruction from '../static/under-construction.gif'
function Comingsoon() {
const navigate = useNavigate()
  return (
    <>
    <div className='flex flex-col w-full justify-center items-center'>
        <img src={underconstruction} alt="animated_comming_soon" />
    <button className='bg-blue-500 w-30 md:hidden py-2 rounded-[20px] text-white' onClick={()=>navigate('/home')}>Home</button>
    </div>
    </>
  )
}

export default Comingsoon