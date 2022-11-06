import React from "react";
import Introbg from "../../static/img/intro-bg.png";
import IntroGroupImage from "../../static/images/avenir-14.JPG";
import "./Home.css";
import { Button } from "@chakra-ui/react";
function Home() {
  return (
    <div className="flex">
      <div className="intro flex gap-12 justify-center z-1">
        {/* <img src={Introbg} alt="" className='w-full h-90'/> */}
        <img src={IntroGroupImage} alt="" className="w-30 h-90" />
        <div className="w-40 text-white">
          <p className="text-[3em] font-[800]">PHOENIX</p>
          <p className="text-[3em] font-[800]">Come Let's Rise</p>
          <Button className="bg-blue-600 mt-[2.5rem]" px="10" borderRadius="3xl" variant="outline">
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
