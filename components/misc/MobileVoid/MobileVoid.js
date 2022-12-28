import Image from 'next/image'
import React from 'react'

const MobileVoid = () => {
  return (
    <div className='flex md:hidden w-full h-full flex-col justify-center items-center'>
      <Image
        width={256}
        height={256}
        src='/void.svg'
        className='h-36 w-auto my-8'
        alt='How it works'
      />
      <h1 className='font-simibold text-4xl mb-4'>Oops!</h1>
      <p className='text-center'>
        Our app is not available for mobile yet! Thank you
      </p>
    </div>
  )
}

export default MobileVoid
