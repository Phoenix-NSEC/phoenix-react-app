import React from 'react'

const Cards = (props) => {
  const divStyles = {
    boxShadow: ' 5px 5px 5px lightblue'
  }
  return (

    <div style={divStyles} className={`p-4 rounded-xl mt-5 flex flex-col-reverse md:${props.index % 2 ? 'flex-row-reverse' : 'flex-row'} justify-end items-center gap-4  md:w-[380px] min-h-[152px] sm:w-[20px]  border border-blue-600`}>
      <div className={`flex flex-col gap-1.5 md:${props.index % 2 ? 'text-left' : 'text-right'}`}>
        <h1 className='w-[150px] md:w-[200px] md:text-[25px] text-md text-blue-700'>{props.name}</h1>
        <p className='text-sm'>{props.designation}</p>
      </div>
      <img src={props.photo} alt='profile' className='w-28 h-28 object-cover object-center rounded-full' />
    </div>
  )
}

export default Cards