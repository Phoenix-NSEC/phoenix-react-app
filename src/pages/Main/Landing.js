import React from "react";
import Lottie from 'react-lottie';
import { useNavigate } from "react-router-dom";
import animationData from '../../static/landing_animation.json';

function Main() {
  const navigate = useNavigate()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return <div className="flex items-start bg-[#EEEEEF] h-[100vh] w-[100vw]">
   <Lottie 
	    options={defaultOptions}
        className="h-full w-full"
      />
      <div className=" absolute bottom-0 w-full h-20 flex justify-center items-start">
        <button className="animate-bounce text-xl font-[500] duration-500 shadow-md bg-yellow-500  px-5 py-2 rounded-md" onClick={()=>navigate('/home')}> Let's Start</button>
      </div>
  </div>;
}

export default Main;
