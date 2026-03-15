import React from 'react'

const Herosection = () => {
  return (
    <div className='bg-[#273444] grid h-screen w-full justify-center items-center grid-cols md:grid-cols-2 gap-4 px-10'>
      <div className='items-start'>
        <h1 className='text-4xl font-bold text-white'>Welcome to AnotherSet</h1>
        <p className='text-white mt-4 text-lg'>Your one-stop destination for all your fitness needs. Join us today and start your journey towards a healthier, stronger you!</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
      <div>
        <img src="./gympicture.jpg" alt="" />
      </div>
    </div>
  )
}

export default Herosection
