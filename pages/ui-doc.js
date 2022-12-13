import React from 'react'

const UI = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Peach UI</h1>
      <div className='card my-4'>
        <div className='card-body'>
          <h1 className='mb-4 font-bold'>Buttons</h1>
          <div className='mb-8'>
            <button className='btn mr-4'>Button</button>
            <button className='btn btn-primary mr-4'>Button Primary</button>
            <button className='btn btn-success mr-4'>Button Success</button>
            <button className='btn btn-ghost'>Button Ghost</button>
          </div>
          <hr></hr>
          <h1 className='mt-4 mb-4 font-bold'>Text Input</h1>
          <input className='input mb-4' placeholder='Text input' />
          <br></br>
          <input
            className='input input-primary'
            placeholder='Primary text input'
          />
        </div>
      </div>
    </div>
  )
}

export default UI
