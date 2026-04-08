import React from 'react'

function AboutWork() {

  const steps = [
    {
      no: 1,
      path: "/upload.png",
      title: "Upload Resume",
      para: "Drop your PDF or DOCX file. Our engine parses your history with 99.9% accuracy across all formats."
    },
    {
      no: 2,
      path: "/analyze.png",
      title: "Analyze & Match",
      para: "Paste the job description. Our AI compares requirements against your profile to find critical gaps."
    },
    {
      no: 3,
      path: "/aisuggest.png",
      title: "Get AI Suggestions",
      para: "Receive specific bullet-point optimizations and missing keywords to maximize your interview chances."
    },
  ]

  return (
    <section className=' mt-20 mb-5 px-4'>

        <div className=' felx flex-row text-center space-y-3 '>
          <button className=' w-18 bg-[#8294e90d]  rounded-lg text-[#7e91bb]'>Process</button>
          <h2 className='text-4xl text-[#F9F9FBFF] font-medium'>Optimize Your Application in Minutes</h2>
          <p className='text-[#BEC0CAFF] text-lg mt-1 '>Stop shouting into the void. Our data-driven process ensures your resume <span className='block'>speaks the language hiring managers are looking for.</span></p>
        </div>


        <div className=' flex content-center items-center text-center mt-15'>
           {steps.map((step)=>(
             <div key={step.no} className="flex-1 flex flex-col items-center">
                  <img src={step.path} alt="logo" />
                  <h3 className=' text-[#F9F9FBFF] text-xl font-semibold'>{step.title}</h3>
                  <p className=' text-[ #BEC0CAFF] text-md w-[90%]'>{step.para}</p>
             </div>
           ))}
        </div>

    </section>
  )
}

export default AboutWork
