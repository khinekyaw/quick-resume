import Head from 'next/head'
import React, { Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ title, children }) => {
  return (
    <Fragment>
      <Head>
        <title>{title ? title + ' | Quick Resume' : 'Quick Resume'}</title>
        <meta name='description' content='Quick resume editor' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col justify-between'>
        <Header />
        <main className='min-h-screen mt-16'>{children}</main>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Layout
