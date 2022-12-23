import React, { useEffect, useRef, useState } from 'react'

const IFRAME_WIDTH = 720

const ResumePreview = ({ id, content }) => {
  const wrapperRef = useRef()
  const iframeRef = useRef()
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [iframeHeight, setIframeHeight] = useState(800)
  const iframe_scale = (wrapperWidth / IFRAME_WIDTH).toPrecision(4)
  const [iframeKey, setIframeKey] = useState(0)
  // console.log(iframe_scale)

  useEffect(() => {
    setWrapperWidth(wrapperRef.current.offsetWidth)
  }, [])

  // if content changed, reload the page
  useEffect(() => {
    console.log('Content changed')
    const timer = setTimeout(() => {
      console.log('Iframe refresh')
      setIframeKey(prev => prev + 1)
    }, 500)
    return () => clearTimeout(timer)
  }, [content])

  const onLoad = () => {
    const timer = setTimeout(() => {
      setIframeHeight(
        iframeRef.current.contentWindow.document.body.scrollHeight
      )
    }, 50)
    return () => clearTimeout(timer)
  }

  return (
    <div ref={wrapperRef} className='relative'>
      <iframe
        key={iframeKey}
        onLoad={onLoad}
        ref={iframeRef}
        // To change hard-coded url
        src={`http://localhost:3000/resume/preview/${id}`}
        title='Preview'
        className='absolute bg-white left-0 top-0 origin-top-left overflow-hidden rounded-xl shadow-lg'
        style={{
          width: IFRAME_WIDTH + 'px',
          height: iframeHeight + 'px',
          transform: `scale(${iframe_scale})`,
        }}
      />
    </div>
  )
}

export default ResumePreview
