import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t bg-white'>
      <div className='section py-8'>
        <div className='grid gap-6 w-full grid-cols-2 md:grid-cols-4'>
          <div className='space-y-2'>
            <h5 className='font-simibold text-xl mb-5'>Resumera</h5>
            <p>
              <Link href='#'>Build a Resume</Link>
            </p>
            <p>
              <Link href='#'>Samples</Link>
            </p>
            <p>
              <Link href='#'>Cover Letter Samples</Link>
            </p>
          </div>
          <div className='space-y-2'>
            <h5 className='font-simibold text-xl mb-5'>Resources</h5>
            <p>
              <Link href='#'>Resumes</Link>
            </p>
            <p>
              <Link href='#'>Getting a Job</Link>
            </p>
            <p>
              <Link href='#'>Career Advice</Link>
            </p>
          </div>
          <div className='space-y-2'>
            <h5 className='font-simibold text-xl mb-5'>Need Help?</h5>
            <p>
              <Link href='#'>How it works</Link>
            </p>
            <p>
              <Link href='#'>About Us</Link>
            </p>
            <p>
              <Link href='#'>Sitemap</Link>
            </p>
          </div>
          <div className='space-y-2'>
            <h5 className='font-simibold text-xl mb-5'>FAQ</h5>
            <p>
              <Link href='#'>Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
      <div className='bg-gray-50'>
        <div className='section py-4'>Copyright © Resumera 2022</div>
      </div>
    </div>
  )
}

export default Footer
