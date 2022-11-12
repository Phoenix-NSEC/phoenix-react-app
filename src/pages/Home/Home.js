import React from "react";
import img1 from '../../static/images/home1.jpg'
import img2 from '../../static/images/phoenix-pic2.JPG'
import img3 from '../../static/images/avenir-21.jpg'
import IntroGroupImage from "../../static/images/avenir-14.JPG";
import "./Home.css";
import { Button, useColorMode } from "@chakra-ui/react";
import ZigBox from "../../components/ZigBox";
function Home() {

  const { colorMode, toggleColorMode } = useColorMode();
  const data = [
    {
      image: img1,
      question: 'Who we are ?',
      answer: 'PHOENIX is the official tech club of Netaji Subhash Engineering College. A club which looks into the overall development of the students of this college. It was founded by a group of like-minded people in January 2006 with the aim of inculcating values of friendship, teamwork and leadership as well as increases the technical skills like coding and robotics of a student. PHOENIX plays a crucial role in bridging the gap between the college and corporate life. A club which provides each individual a stage to shine.'
    },
    {
      image:img2,
      question: 'What Phoenix has to offer?',
      answer: 'PHOENIX is instrumental in conducting several weekly forums which helps in the overall development of a student. There are domain-specific forums that are free and open to anyone who wants to learn. Various clubs responsible for different activities are functional under PHOENIX. These are:ELOQUENSE: The language club which is responsible for conducting events like debates and open mics.ROBONIX: The robotics club introduces newly made engineers to the world of creating objects from scratch-an RC car, a drone or maybe the next iron man suit.CYBERNIX: Keeping up with the need of the hours, a club solely bases for IT-based aced activities and coding. NIRMAAN: Mainly for the students of the Civil and Mechanical department, As the the name suggests a club which deals with building things.'
    },
    {
      image:img3,
      question: 'Bonus ?',
      answer: 'Apart from these different workshops and seminar for students on a daily basis, in the association with institutions like TIME, Erudite, career launcher, NIIT and organization like TCS etc. are organized for students to enhance their and knowledge and develop their personality. Phoenix also takes credit in organizing the annual inter college and intra college tech fests, namely Avenir and Aavahan and various other events like quizzes and hackathons throughout the year.'
    }
  ]
  return (
    <div className="flex flex-col">
      <div className="intro flex gap-12 justify-center items-center  z-1 flex-col md:flex-row px-5 ">
        {/* <img src={Introbg} alt="" className='w-full h-90'/> */}
        <img src={IntroGroupImage} alt="" className="md:w-30 md:h-90 order-3 md:order-none" />
        <div className="w-full md:w-40 text-white">
          <p className="text-[1rem] md:text-[3rem] font-[800]">PHOENIX</p>
          <p className="text-[1rem] md:text-[3rem]">Come Let's Rise</p>
          <Button className="bg-blue-600 mt-[2.5rem] mx-2" px="10" borderRadius="3xl" variant="outline">
            Read More
          </Button>
          {/* <Button onClick={() => toggleColorMode()}  className="bg-blue-600 mt-[2.5rem] mx-2" px="10" borderRadius="3xl" variant="outline">
            {colorMode === "dark" ? <p>Light</p> : <p>Dark</p>}
          </Button> */}
        </div>
      </div>
      <div className="my-5">
      <ZigBox title="Phoenix" description="The official Tech club of nsec" data={data}/>
      </div>
    </div>
  );
}

export default Home;
