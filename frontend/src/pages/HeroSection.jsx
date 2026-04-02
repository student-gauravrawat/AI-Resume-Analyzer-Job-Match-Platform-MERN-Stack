import React from 'react'

function HeroSection() {
  return (
    <section className='bg-[linear-gradient(180deg,#0B14414D_0%,#181920FF_100%)] h-150 lg:pt-15 lg:pl-18 flex content-center items-start'>
       {/* project Detailes */}
        <div className=''>
           
           <h1 className=' text-[#F9F9FBFF] font-bold text-7xl'>
            Landing Your 
            <span className='block'>Dream Job</span>
            <span className='block text-[#798BE7FF]'>Starts with </span>
            <span className='block'>Science.</span>
           </h1>
           
           <p className=' text-[#BEC0CAFF] text-xl w-[32%]  pt-10'>
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
           <h1>hello</h1>
        </div>

    </section>
  )
}

export default HeroSection
 