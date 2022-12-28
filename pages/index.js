import Image from 'next/image'
import Link from 'next/link'
import { TbCheck } from 'react-icons/tb'

import Layout from '../components/common/Layout'

const HIW_STEPS = [
  {
    title: 'Write your content',
    detail: 'Start filling you resume details',
  },
  {
    title: 'Pick a style',
    detail: 'Fine tune formatting and try out various styles',
  },
  {
    title: 'Download you resume',
    detail: 'Download your resume instantly and make changes afterwards',
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <div id='hero' className='bg-white'>
        <div className='section py-12'>
          <div className='w-full grid gap-4 grid-cols-1 md:grid-cols-2'>
            <div className='col-span-1'>
              <h1 className='text-5xl md:text-6xl font-semibold mb-8'>
                Quick and easy online resume builder
              </h1>
              <p className='text-gray-600 text-lg mb-8'>
                Create a polished resume in minutes, it’s free!
              </p>
              <Link href='/dashboard' className='btn btn-primary'>
                Build my resume
              </Link>
            </div>
            <div className='col-span-1 flex justify-center'>
              <Image
                width={256}
                height={256}
                src='/hero.svg'
                className='w-4/5 mt-10 md:mt-0 md:h-72 md:w-auto'
                alt='hero'
              />
            </div>
          </div>
        </div>
      </div>
      {/* Hero - End */}
      {/* How it works */}
      <div id='how-it-works' className='section py-10 flex-col'>
        <h2 className='text-2xl font-semibold mb-6 border-b-2 border-dashed border-indigo-500'>
          How it works
        </h2>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-3 w-full'>
          {HIW_STEPS.map(({ title, detail }, index) => (
            <div key={index} className='flex flex-col box px-4 py-4 shadow-sm'>
              <div>
                <h3 className='text-indigo-500 font-bold text-2xl mr-2'>
                  {index + 1}.
                </h3>
                <h4 className='font-semibold mb-1'>{title}</h4>
              </div>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <Image
          width={256}
          height={256}
          src='/how-it-works.svg'
          className=' h-56 w-auto my-8'
          alt='How it works'
        />
      </div>
      {/* How it works - End */}
      <div id='pricing' className='bg-white'>
        <div className='section py-10 flex-col'>
          <h2 className='text-2xl font-semibold mb-6 border-b-2 border-dashed border-indigo-500'>
            Pricing
          </h2>
          <p className='mb-12'>One price, all features and unlimited use.</p>
          <div className='card p-10 flex flex-col items-center'>
            <h5 className='font-bold text-4xl mb-6'>Free</h5>
            <div className='mb-8'>
              {[
                'Create professional CV',
                'Write impressive cover letters',
                'Access to relevent jobs',
              ].map(i => (
                <p key={i} className='mb-2'>
                  <TbCheck className='inline-block text-xl text-indigo-500 mr-2' />
                  {i}
                </p>
              ))}
            </div>
            <div>
              <Link href='/dashboard' className='btn btn-primary'>
                Try now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
