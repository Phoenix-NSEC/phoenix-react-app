import React from "react";
import img1 from "../../static/images/home1.jpg";
import img2 from "../../static/images/phoenix-pic2.jpg";
import img3 from "../../static/images/avenir-21.jpg";
import IntroGroupImage from "../../static/images/avenir-14.jpg";
import "./Home.css";
import { Button } from "@chakra-ui/react";
import ZigBox from "../../components/ZigBox";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const data = [
    {
      image: img1,
      title: "Who are we ?",
      description:
        "PHOENIX is the official tech club of Netaji Subhash Engineering College. A club which looks into the overall development of the students of this college. It was founded by a group of like-minded people in January 2006 with the aim of inculcating values of friendship, teamwork and leadership as well as increases the technical skills like coding and robotics of a student. PHOENIX plays a crucial role in bridging the gap between the college and corporate life. A club which provides each individual a stage to shine.",
    },
    {
      image: img2,
      title: "What Phoenix has to offer?",
      description:
        "PHOENIX is instrumental in conducting several weekly forums which helps in the overall development of a student. There are domain-specific forums that are free and open to anyone who wants to learn. Various clubs responsible for different activities are functional under PHOENIX. These are:ELOQUENSE: The language club which is responsible for conducting events like debates and open mics.ROBONIX: The robotics club introduces newly made engineers to the world of creating objects from scratch-an RC car, a drone or maybe the next iron man suit.CYBERNIX: Keeping up with the need of the hours, a club solely bases for IT-based aced activities and coding. NIRMAAN: Mainly for the students of the Civil and Mechanical department, As the the name suggests a club which deals with building things.",
    },
    {
      image: img3,
      title: "What else ?",
      description:
        "Apart from these different workshops and seminar for students on a daily basis, in the association with institutions like TIME, Erudite, career launcher, NIIT and organization like TCS etc. are organized for students to enhance their and knowledge and develop their personality. Phoenix also takes credit in organizing the annual inter college and intra college tech fests, namely Avenir and Aavahan and various other events like quizzes and hackathons throughout the year.",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="intro flex gap-12 justify-center items-center  z-1 flex-col md:flex-row px-5 overflow-hidden">
        {/* <img src={Introbg} alt="" className='w-full h-90'/> */}
        <img
          src={IntroGroupImage}
          alt=""
          className=" md:w-[400px] md:h-[300px] order-3 md:order-none"
        />
        <div className="w-full md:w-40 text-white flex justify-center flex-col">
          <p className="text-[3rem] md:text-[3rem] font-[800] text-center">
            PHOENIX
          </p>
          <p className="text-[1rem] md:text-[3rem] text-center">
            Come Let's Rise
          </p>
          <Button
            className="bg-blue-600 mt-[2.5rem] max-w-[300px] mx-auto hover:bg-blue-500"
            px="10"
            borderRadius="3xl"
            variant="outline"
          >
            <a href="#readmore" className="no-underline">
              {" "}
              Read More
            </a>
          </Button>
        </div>
      </div>
      <div className="my-5" id="readmore">
        <ZigBox
          title="Phoenix"
          id="readmore"
          description="The official Tech club of nsec"
          data={data}
        />
      </div>
    </div>
  );
}

export default Home;
