import Image from 'next/image'
import React from 'react'

const ResumePreview = () => {
  return (
    <div className='box p-6'>
      <p className='mb-8 text-lg text-center'>Coming Soon</p>
      <Image
        // src='/images/template.png'
        src='/person-info.svg'
        width={300}
        height={300}
        alt='resume preview'
      />
    </div>
  )
}

export default ResumePreview
