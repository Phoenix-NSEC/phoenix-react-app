import React from 'react'

const Cards = (props) => {
  return (
    <div className={`p-6 rounded-lg bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-cyan-500/40 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/20 flex flex-col-reverse md:${props.index % 2 ? 'flex-row-reverse' : 'flex-row'} justify-end items-center gap-4 md:w-[380px] min-h-[152px] sm:w-full`}>
      <div className={`flex flex-col gap-1.5 md:${props.index % 2 ? 'text-left' : 'text-right'}`}>
        <h1 className='w-[150px] md:w-[200px] md:text-xl text-md text-cyan-300 font-bold'>{props.name}</h1>
        <p className='text-sm text-cyan-400'>{props.designation}</p>
      </div>
      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400/50 transition-all duration-300 hover:border-cyan-300">
        <img src={props.photo} alt='profile' className='w-full h-full object-cover object-center' />
      </div>
    </div>
  )
}

export default Cards