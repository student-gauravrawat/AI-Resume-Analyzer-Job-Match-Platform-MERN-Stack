import React from 'react'

function HeroSection() {
  return (
    <section className='bg-[linear-gradient(180deg,#0B14414D_0%,#181920FF_100%)]  pt-38 pl-18 flex items-start w-full'>
       {/* project Detailes */}
        <div className='ml-5'>
           
           <h1 className=' text-[#F9F9FBFF] font-bold text-7xl '>
            Landing Your 
            <span className='block'>Dream Job</span>
            <span className='block text-[#798BE7FF]'>Starts with </span>
            <span className='block'>Science.</span>
           </h1>
           
           <p className=' text-[#BEC0CAFF] text-xl w-[45%]  pt-10'>
            Instantly analyze your resume against job descriptions. Our AI extracts key skills, calculates match scores, and provides actionable suggestions to beat the ATS.
           </p>

          
          <div className=' flex content-center items-center gap-4 mt-3 text-[#BEC0CAFF]'>
             <p className='text-sm font-medium'>Trusted by top talent at:</p>
             <ul className='flex content-between items-center gap-3 font-semibold text-md'>
               <li>Google</li>
               <li>Meta</li>
               <li>Airbnb</li>
             </ul>
          </div>
        </div>

        {/* graph logo */}
        <div>
           <img 
             src="/score.jpeg" 
             alt="image" 
             className='w-179.5 h-110.5 -ml-40.75' 
             />
        </div>

    </section>
  )
}

export default HeroSection
 