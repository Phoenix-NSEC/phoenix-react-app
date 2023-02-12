import React, { useEffect, useState } from "react";
import img1 from "../../static/images/home1.jpg";
import img2 from "../../static/images/phoenix-pic2.JPG";
import img3 from "../../static/images/avenir-21.jpg";
import IntroGroupImage from "../../static/images/avenir-14.JPG";
import "./Home.css";
import { Button } from "@chakra-ui/react";
import ZigBox from "../../components/ZigBox";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cards_1 from "../../components/Cards_1";

function Home() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let date = new Date();

  const [yearList, setYearList] = useState([]);
  const membersCollectionRef = collection(db, "core-team");

  const getMemberList = async () => {
    try {
      const data = await getDocs(membersCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData)

      let lastYearData = filteredData.filter(
        (element) =>
          parseInt(element.year.split("-")[0]) + 1 === date.getFullYear()
      );
      setYearList(lastYearData);

      console.log(lastYearData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, []);

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
    <>
      <style>
        {`
          .gd-carousel-wrapper {
            position:unset;
          }
        
          .gd-carousel {
            position:unset;
            width: 100%;

            .react-multi-carousel-list{
              position: unset !important;
            }

            .react-multiple-carousel__arrow {
                position:absolute;
            }
            
            .react-multiple-carousel__arrow--left {
              left: calc(2% + 1px)
            }
        
            .react-multiple-carousel__arrow--right {
                right: calc(2% + 1px)
            }
          }
        `}
      </style>
      <div className="flex flex-col justify-center items-center">
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

        <div className="flex flex-column justify-center items-center  w-full bg-[#bde0fe] h-full ">
          <h1 className="text-[20px] text-blue-900 font-normal text-center mt-5 md:text-[40px] md:font-light">OUR CORE MEMBERS</h1>
          <div className="gd-carousel-wrapper mt-5 mb-5 flex justify-center space-x-9 w-[200px] md:w-[650px]">
            <Carousel
              responsive={responsive}
              showDots={true}
              containerClass={`w-full`}
              itemClass={`flex justify-center items-center px-2`}
              infinite={true}
              className="gd-carousel"
              dotListClass="custom-dot-list-style"
              autoPlay={false}
              focusOnSelect={true}
              autoPlaySpeed={2000}
            >
              {yearList.map((element) => {
                return element.members.map((e, index) => {
                  // console.log(element.year);
                  return (
                    <Cards_1
                      name={e.name}
                      designation={e.designation}
                      photo={e.photo}
                      index={index}
                      year={element.year}
                    />
                  );
                  // <div>

                  // </div>
                });
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
