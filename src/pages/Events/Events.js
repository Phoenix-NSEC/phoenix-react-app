import React, { useState, useEffect } from 'react'
import ZigBox from '../../components/ZigBox'
import { db } from '../../firebase-config'
import Carousel from 'react-elastic-carousel'
import {
  getDocs,
  collection
} from 'firebase/firestore'
import moment from 'moment/moment'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 900, itemsToShow: 4 },
];

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
  var day = moment('10-02-2023');
  console.log(day)

  // console.log(day);

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <>
      <style>
        {`
            .rec-dot_active {
              background-color: var(--blue) !important;
              box-shadow: 0 0 1px 3px var(--blue) !important;
          }
          .rec-dot:focus,
          .rec-dot:hover {
              box-shadow: 0 0 1px 3px var(--blue) !important;
          }
          .rec-dot_active:focus,
          .rec-dot_active:hover {
              background-color: var(--blue) !important;
              box-shadow: 0 0 1px 3px var(--blue) !important;
          }
          
          .rec-arrow {
              background-color: var(--blue) !important;
              transition: all 0.3s ease;
              font-size: 1.1rem !important;
              color: white !important;
              width: 1.7rem !important;
              height: 1.7rem !important;
              min-width: 1.7rem !important;
              line-height: 1.7rem !important;
          }
          
          .rec-arrow:hover:not(:disabled) {
              transform: scale(1.2);
          }
        `}
      </style>
      <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800]">Our Events</p>
        </div>
      </div>
      <ZigBox data={eventList} />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-[1.5rem] md:text-[2rem] font-[800]">Upcoming events</h2>
        <div className='mt-5 mb-5 flex justify-center space-x-9 md:w-[600px] w-[300px]' >
          <Carousel breakPoints={breakPoints} enableAutoPlay={true} infinite >
            {eventList.map((event) => {
              if (event.isUpcoming)
                return (<div className="bg-gradient-to-r from-cyan-500 to-blue-500 md:w-[400px] w-[200px] h-[196px] rounded-xl flex flex-col justify-center content-start p-3" >
                  <div>
                    <h1 className='text-[1.2rem] md:text-[1.5rem] font-[700] text-white'>{event.title}</h1>
                    <p className='text-white'>{event.description.slice(0, 25)}</p>
                  </div>
                  <div className='mt-9'>
                    <p className='font-[800] text-white'>{event.date}</p>
                    <p className='font-[500] text-sm font-light'><span className='text-white text-transparent bg-clip-text'>{moment(event.date, "DDMMYYYY").fromNow()}</span></p>
                  </div>
                </div>)
            })}
          </Carousel>
        </div>
      </div >
    </>
  )
}

export default Events