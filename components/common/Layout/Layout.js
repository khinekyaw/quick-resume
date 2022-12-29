import Head from 'next/head'
import React, { Fragment } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header'

const Layout = ({ title, children, headerVariant, showNav = true }) => {
  return (
    <Fragment>
      <Head>
        <title>{title ? title + ' | Resumera' : 'Resumera'}</title>
        <meta name='description' content='Quick resume editor' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col justify-between'>
        {showNav && <Header variant={headerVariant} />}
        <main className='min-h-screen mt-16'>{children}</main>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Layout
