import React, { useEffect, useState } from "react";
import img1 from "../../static/images/who_are_we.jpeg";
import img2 from "../../static/images/offer.jpeg";
import img3 from "../../static/images/what_else.jpeg";
import IntroGroupImage from "../../static/images/landing_page.jpeg";
import "./Home.css";
import "./glitch.css";
import { Button } from "@chakra-ui/react";
import ZigBox from "../../components/ZigBox";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardHome from "../../components/CardHome";

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
      breakpoint: { max: 1000, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1000, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let date = new Date();

  const [yearList, setYearList] = useState([]);
  const [centerCardIndex, setCenterCardIndex] = useState(0);
  const membersCollectionRef = collection(db, "core-team");

  const getMemberList = async () => {
    try {
      const data = await getDocs(membersCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let newFilteredData = filteredData.filter(
        (e) => parseInt(e.year.split("-")[1]) !== date.getFullYear(),
      );

      setYearList(newFilteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, []);

  // Initialize center card when members are loaded
  useEffect(() => {
    yearList.forEach((element) => {
      if (
        element.year === "2025-26" &&
        element.members &&
        element.members.length > 0
      ) {
        const itemsPerView =
          window.innerWidth >= 1024 ? 3 : window.innerWidth >= 464 ? 2 : 1;
        const centerOffset = Math.floor(itemsPerView / 2);
        setCenterCardIndex(centerOffset);
      }
    });
  }, [yearList]);

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
          .intro{
            height: 95vh;
          }
          .gd-carousel-wrapper {
            position:relative;
          }
        
          .gd-carousel {
            position:unset;
            width: 100%;
          }

          .gd-carousel2 {
            position:static;
            height: 400px;
            width: 884px;
            margin-left: 35px;
          }

            .react-multi-carousel-list{
              position: unset !important;
            }

            .react-multiple-carousel__arrow {
                position:absolute;
                font-size: 14px;
                min-width: 40px;
                min-height: 40px;
            }
            
            .react-multiple-carousel__arrow--left {
              left: calc(-3% + 1px) !important;
            }
        
            .react-multiple-carousel__arrow--right {
                right: calc(-3% + 1px) !important;
            }
           .custom-dot-list {
  position: absolute !important;
  bottom: -30px !important;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.custom-dot-list .react-multi-carousel-dot button {
  background: rgba(0, 255, 255, 0.3) !important;
  border: 2px solid rgba(0, 255, 255, 0.6) !important;
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  transition: all 0.3s ease !important;
}

.custom-dot-list .react-multi-carousel-dot--active button {
  background: rgba(0, 255, 255, 1) !important;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.5) !important;
  transform: scale(1.3) !important;
}

            
            /* Center card styling for Core Members carousel */
            .react-multi-carousel-item {
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .carousel-item-wrapper {
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), scale 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            /* Add neon glow to all visible cards */
            .react-multi-carousel-item[aria-hidden="false"] .neon-card-glow {
              box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2) !important;
              border-color: rgba(0, 255, 255, 0.6) !important;
              transition: box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            /* Make center card BIGGER and more visible - for desktop (3 items) */
            @media (min-width: 1024px) {
              /* Scale down non-center cards */
              .react-multi-carousel-item[aria-hidden="false"] .carousel-item-wrapper:not(:has(.center-card)) {
                transform: scale(0.85) !important;
                opacity: 0.7 !important;
              }
              
              /* Make center card much larger */
              .react-multi-carousel-item[aria-hidden="false"] .carousel-item-wrapper:has(.center-card) {
                transform: scale(1.3) !important;
                z-index: 10 !important;
                opacity: 1 !important;
              }
              
              /* Enhanced glow for center card */
              .center-card.neon-card-glow {
                box-shadow: 0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.4), 0 0 120px rgba(0, 255, 255, 0.2) !important;
                border-color: rgba(0, 255, 255, 1) !important;
                border-width: 3px !important;
              }
              
              /* Regular glow for non-center cards */
              .react-multi-carousel-item[aria-hidden="false"] .neon-card-glow:not(.center-card) {
                box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2) !important;
                border-color: rgba(0, 255, 255, 0.5) !important;
              }
            }
            
            /* For tablet (2 items) - make center card larger */
            @media (min-width: 464px) and (max-width: 1023px) {
              .react-multi-carousel-item[aria-hidden="false"] .carousel-item-wrapper:not(:has(.center-card)) {
                transform: scale(0.9) !important;
                opacity: 0.8 !important;
              }
              
              .react-multi-carousel-item[aria-hidden="false"] .carousel-item-wrapper:has(.center-card) {
                transform: scale(1.25) !important;
                z-index: 10 !important;
              }
              
              .center-card.neon-card-glow {
                box-shadow: 0 0 35px rgba(0, 255, 255, 0.5), 0 0 70px rgba(0, 255, 255, 0.3) !important;
                border-color: rgba(0, 255, 255, 0.9) !important;
              }
              
              .react-multi-carousel-item[aria-hidden="false"] .neon-card-glow:not(.center-card) {
                box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2) !important;
                border-color: rgba(0, 255, 255, 0.5) !important;
              }
            }
            
            /* For mobile (1 item) - make it center with glow */
            @media (max-width: 463px) {
              .react-multi-carousel-item[aria-hidden="false"] .carousel-item-wrapper {
                transform: scale(1.1) !important;
              }
              
              .react-multi-carousel-item[aria-hidden="false"] .neon-card-glow {
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3) !important;
                border-color: rgba(0, 255, 255, 0.8) !important;
              }
            }
            
            /* Fallback for browsers that don't support :has() */
            @supports not selector(:has(*)) {
              @media (min-width: 1024px) {
                .react-multi-carousel-item[aria-hidden="false"]:nth-of-type(2) .carousel-item-wrapper {
                  transform: scale(1.3) !important;
                  z-index: 10 !important;
                  opacity: 1 !important;
                }
                
                .react-multi-carousel-item[aria-hidden="false"]:not(:nth-of-type(2)) .carousel-item-wrapper {
                  transform: scale(0.85) !important;
                  opacity: 0.7 !important;
                }
              }
            }
            
          @media screen and (max-width: 500px){
              .react-multiple-carousel__arrow {
                min-width: 30px;
                min-height: 30px;
            }
            .react-multiple-carousel__arrow--left {
              left: calc(-16% + 1px) !important;
            }
        
            .react-multiple-carousel__arrow--right {
                right: calc(-16% + 1px) !important;
            }
            
            .popup-bounce {
              animation: bounce 2s infinite;
            }
            
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-10px);
              }
              60% {
                transform: translateY(-5px);
              }
            }
          
        `}
      </style>
      <div className="flex flex-col justify-center items-center">
        {/* Hero Section */}
        <div className="relative w-full h-screen pt-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${IntroGroupImage})`,
              backgroundAttachment: "fixed",
            }}
          >
            {/* Dark gradient overlay for readability - increased intensity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"></div>

            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent opacity-30"></div>
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center transition-all duration-1000 opacity-100">
            <div className="text-center z-10 px-4">
              {/* Main Heading with Glow */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text-glow">
                <span className="text-cyan-400">PHOENIX</span>
              </h1>

              <div className="mb-8 text-center">
                <p className="typewriter text-xl md:text-3xl font-semibold text-cyan-300 ">
                  Come Let's Rise
                </p>
              </div>

              {/* Subtext */}
              <p className="text-gray-300 text-base md:text-lg mb-12 max-w-2xl mx-auto">
                The official tech club of Netaji Subhash Engineering College
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="#readmore">
                  <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 neon-border-glow">
                    Read More
                  </button>
                </a>
                <a target="_blank"  href="https://avenir.phoenixnsec.in">
                  <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 neon-border-glow">
                    Avenir'26
                  </button>
                </a>
              </div>
            </div>

            {/* Animated scrolling indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce text-cyan-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="my-5 w-full" id="readmore">
          <ZigBox
            title="Phoenix"
            id="readmore"
            description="The official Tech club of NSEC"
            data={data}
          />
        </div>

        {/* Core Members Section */}
        <div className="relative w-full bg-black py-20 px-4 border-t border-cyan-500/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400 heading-glow">
              OUR CORE MEMBERS
            </h2>
            <div className="gd-carousel-wrapper mt-5 mb-5 flex justify-center space-x-9 ">
              <Carousel
                responsive={responsive}
                showDots={true}
                containerClass={`w-95`}
                renderButtonGroupOutside={true}
                itemClass={`flex justify-center items-center px-2 carousel-item-wrapper`}
                infinite={true}
                className="gd-carousel"
                dotListClass="custom-dot-list"
                autoPlay={true}
                focusOnSelect={true}
                autoPlaySpeed={2000}
                partialVisbile={true}
                centerMode={false}
                afterChange={(previousSlide, { currentSlide }) => {
                  // Calculate center card index based on visible items
                  // currentSlide is the index of the first visible item
                  const itemsPerView =
                    window.innerWidth >= 1024
                      ? 3
                      : window.innerWidth >= 464
                        ? 2
                        : 1;
                  const centerOffset = Math.floor(itemsPerView / 2);
                  // For 3 items: center is at index 1 (0, 1, 2)
                  // For 2 items: center is at index 1 (0, 1)
                  // For 1 item: center is at index 0
                  const calculatedCenterIndex = currentSlide + centerOffset;
                  setCenterCardIndex(calculatedCenterIndex);
                }}
                beforeChange={() => {
                  // Reset center card index before change for smooth transition
                  setCenterCardIndex(-1);
                }}
              >
                {yearList.map((element) => {
                  if (element.year === "2025-26") {
                    const cardHomeComponents = [];

                    element.members.forEach((member, index) => {
                      // Calculate if this member index is the center card
                      // Handle infinite scrolling by using modulo
                      const memberCount = element.members.length;
                      const normalizedCenterIndex =
                        centerCardIndex >= 0
                          ? centerCardIndex % memberCount
                          : -1;
                      const isCenter = normalizedCenterIndex === index;
                      cardHomeComponents.push(
                        <CardHome
                          key={index}
                          name={member.name}
                          designation={member.designation}
                          photo={member.photo}
                          index={index}
                          year={element.year}
                          media={member.socialMedia || {}}
                          isCenter={isCenter}
                        />,
                      );
                    });

                    return cardHomeComponents;
                  } else {
                    return null;
                  }
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      <div className="fixed bottom-4 right-4 bg-black text-cyan-400 p-4 rounded-lg border border-cyan-300 shadow-lg shadow-cyan-300 z-50 popup-bounce">
        Avenir'26 is coming soon 🔥
      </div>
    </>
  );
}

export default Home;
