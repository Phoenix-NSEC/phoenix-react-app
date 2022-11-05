import React from 'react'
import Introbg from '../../static/img/intro-bg.png'
function Home() {
  return (
    <div className='flex'>
      <div  className="Intro">
          <img src={Introbg} alt="" className='w-full h-90'/>
      </div>
    </div>
  )
}

export default Home