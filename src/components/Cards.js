import React from 'react'

const Cards = (props) => {
  const divStyles = {
    boxShadow: ' 5px 5px 5px lightblue'
  }
  return (
    
    <div style={divStyles} className={`rounded-xl space-x-4 mt-5 flex ${props.index % 2 ? 'flex-row-reverse' : 'flex-row'} justify-end items-center  md:w-[380px] h-[152px] sm:w-[20px]  border border-blue-600`}>

      <div className={`flex flex-col mr-4 ${props.index % 2 ? 'text-left' : 'text-right'}`}>
        <div className='w-[150px] md:w-[200px] '>
          {/* <div className="flex flex-row text-right  ">
            <h1 className='text-[25px] text-blue-700'>{props.name.charAt(0)}</h1>
            <h1 className='text-[25px]'>{props.name.slice(1)}</h1>
          </div> */}
          <h1 className='md:text-[25px] sm:text-[15px] text-blue-700'>{props.name}</h1>

        </div>

        <p className="mt-2">{props.designation}</p>
      </div>

      <div className="ml-2 mr-2 ">
        <img src={props.photo} className='rounded-full h-[80px] ' alt="" />
      </div>
    </div>
  )
}

export default Cards