import React from 'react'

function AboutProject() {
  return (
    <section className='mt-20 '>
       <main className='bg-[#798BE7FF] w-296 h-111 rounded-2xl grid grid-cols-2 mx-auto'>
          <div className=' space-y-2 p-5 ml-10'>
          <img src="lock.png" alt="img" className='-ml-7'/>
          <h4 className=' text-5xl font-bold text-[#181920FF] '>Your Data, Securely Protected.</h4>
          <p className='text-lg text-[#181920FF]'>MatchMinds is built using the high-performance MERN stack (MongoDB, Express, React, Node.js) with end-to-end encryption. We never share your resume without permission.</p>
       </div>

       <div className='flex flex-col items-center place-content-start border-l border-amber-50'>
          <img src="/view.png" alt="img" />
          <img src="/btn.png" alt="img" className='-mt-38 -ml-50'/>
       </div>

       </main>
    </section>
  )
}

export default AboutProject
