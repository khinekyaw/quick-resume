import React, { useEffect, useRef, useState } from 'react'

const IFRAME_WIDTH = 720

const ResumePreview = ({ id }) => {
  const wrapperRef = useRef()
  const iframeRef = useRef()
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [iframeHeight, setIframeHeight] = useState(0)
  const iframe_scale = (wrapperWidth / IFRAME_WIDTH).toPrecision(4)
  // console.log(iframe_scale)

  const onLoad = () => {
    setWrapperWidth(wrapperRef.current.offsetWidth + 'px')
    setIframeHeight(
      iframeRef.current.contentWindow.document.body.scrollHeight + 'px'
    )
    console.log(
      'IRF:',
      iframeRef.current.contentWindow.document.body.scrollHeight
    )
  }

  // console.log('ww:', wrapperWidth)
  // console.log('ih:', iframeHeight)

  return (
    <div ref={wrapperRef} className='relative border border-black h-96'>
      <iframe
        onLoad={onLoad}
        ref={iframeRef}
        // To change hard-coded url
        src={`http://localhost:3000/resume/preview/${id}`}
        title='Preview'
        className='absolute left-0 top-0 border origin-top-left border-blue-500'
        style={{
          width: IFRAME_WIDTH,
          // height: iframeHeight,
          transform: `scale(${iframe_scale})`,
        }}
      />
    </div>
  )
}

export default ResumePreview
