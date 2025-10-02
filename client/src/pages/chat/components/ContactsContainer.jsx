import React from 'react'
import Flxwhite from '@/assets/Flxwhite.svg'

const ContactsContainer = () => {
  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className='flex text-white text-center items-center font-bold p-4 text-3xl font-poppins'>
        {/* <img src={Flxwhite} alt='Logo' className='h-20 m-4'/> */}
        Flux.
      </div>
      <div className='my-5'>
          <div className="flex items-center justify-between pr-10">
            <Title text='Direct Messages' />

          </div>
      </div>
      <div className='my-5'>
          <div className="flex items-center justify-between pr-10">
            <Title text='Channels' />

          </div>
      </div>
    </div>
  )
}

export default ContactsContainer



const Title = ({text}) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400/90 pl-10 font-light text-sm'>{text}</h6>
  )
}