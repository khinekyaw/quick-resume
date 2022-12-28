import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/common/Layout'

export default function Home() {
  return (
    <Layout>
      <div className='bg-white'>
        {/* Hero */}
        <div className='section py-12'>
          <div className='w-full grid gap-4 grid-cols-2'>
            <div className='col-span-1'>
              <h1 className='text-5xl font-semibold mb-8'>
                Quick and easy online resume builder
              </h1>
              <p className='text-gray-600 text-lg mb-8'>
                Create a polished resume in minutes, it’s free!
              </p>
              <Link href='/dashboard' className='btn btn-primary'>
                Build by resume
              </Link>
            </div>
            <div className='col-span-1 flex justify-center'>
              <Image
                width={256}
                height={256}
                src='/hero.svg'
                className='h-72 w-auto'
              />
            </div>
          </div>
        </div>
        {/* Hero - End */}
      </div>
    </Layout>
  )
}
