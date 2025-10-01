import React from 'react'
import ChatAnimation from './ChatAnimation'

const EmptyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden'>
      <ChatAnimation />
    </div>
  )
}

export default EmptyChatContainer
