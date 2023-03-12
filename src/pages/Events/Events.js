import React, { useState, useEffect } from 'react'
import ZigBox from '../../components/ZigBox'
import { db } from '../../firebase-config'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../../static/img/avenir.jpeg'
import img2 from '../../static/img/brainstormer.jpeg'
import img3 from '../../static/img/aavahan.jpeg'
import {
  getDocs,
  collection
} from 'firebase/firestore'
import moment from 'moment/moment'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Events() {
  const [eventList, setEventList] = useState([])
  const eventsRef = collection(db, "events");

  const getEventList = async () => {
    try {
      const data = await getDocs(eventsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventList(filteredData);
      console.log(eventList)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getEventList();
  }, []);

  const mainEvents = [
    {
      image: img1,
      title: 'Avenir',
      description: 'Avenir,the Annual Tech Fest of NSEC, stands amongst the top technical fests in the city with enthusiastic participation from students of premier institutes in and around the state. The three day spectacular event yeilds a football of more than 5000 students , thus making it a perfect platform to explore the realm of technical innovation and to witness the best minds striving for excellence. The idea of Avenir unravels the big aspirations hidden inside a creative mind and promises the ultimate platform to showcase talent.',
    },
    {
      image: img2,
      title: 'Brainstormer',
      description: 'Nobody and nothing can deter you from achieving the goal if you try your best .By crossing all the snag with grit and perseverance .Brain, intellect and wit are the three fundamental of a quiz warrior and to bring out these abilities from talented PHOENIX organises BRAINSTORMER an inter college/school QUIZ competition inorder to help you to chase your dreams.',
    },
    {
      image: img3,
      title: 'Aavahan',
      description: 'Avaahan stands with the society and intends to establish a broader platform for our technology and innovations with the younger generation acting as the tower of strength. Avaahan is intra college tech fest Organised by PHOENIX inorder to encourage our juiniors and enthusiast to help them upgrade and implement their knowledge to match with best in future. ',
    },
  ]

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
      <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800]">Our Events</p>
        </div>
      </div>
      <ZigBox data={mainEvents} />
      <div className="flex flex-col justify-center items-center">
        <h2 className="mt-5 text-[1.5rem] md:text-[2rem] font-[800]">Upcoming events</h2>
        <div className='gd-carousel-wrapper mt-5 mb-5 flex justify-center space-x-9 md:w-[650px] w-[300px]' >
          <Carousel responsive={responsive}
            showDots={false}
            containerClass={`w-full`}
            itemClass={`flex justify-center items-center px-2`}
            infinite={true}
            className="gd-carousel"
            dotListClass="custom-dot-list-style"
            autoPlay={true}
            focusOnSelect={true}
            autoPlaySpeed={2000}
          >
            {eventList.map((event) => {
              if (event.isUpcoming)
                return (<div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow shadow-black md:w-[300px] w-[200px] h-[196px] rounded-xl flex flex-col justify-center content-start p-3" >
                  <div>
                    <h1 className='text-[1.2rem] md:text-[1.5rem] font-[700] text-white'>{event.title}</h1>
                    <p className='text-white'>{event.description.slice(0, 25)}...</p>
                  </div>
                  <div className='mt-9'>
                    <div className="flex flex-row items-center justify-start mt-3 text-gray-700">
                      <i className="fa-light fa-solid fa-calendar-days text-white"></i>
                      <p className='ml-2 font-[800] text-white'>{event.date}</p>
                    </div>
                    <p className='text-sm font-light'><span className='text-white text-transparent bg-clip-text'>{moment(event.date, "DDMMYYYY").fromNow()}</span></p>
                  </div>
                </div>)
            })}
          </Carousel>
        </div>
      </div >
      <div className="flex flex-col justify-center items-center">
        <h2 className="mt-[90px] mb-4 text-[1.5rem] md:text-[2rem] font-[800]">Other events</h2>
        <ZigBox data={eventList} />
      </div>
    </>
  )
}

export default Events