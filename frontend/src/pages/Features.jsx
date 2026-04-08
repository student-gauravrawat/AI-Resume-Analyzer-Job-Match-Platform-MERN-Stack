import React from 'react'

function Features() {

  const data = [
    {
      no: 1,
      img: "/first.png",
      title: "Intelligent Skills Extraction",
      para: "Our NLP engine identifies hard skills, soft skills, and industry-specific tools hidden in your work history."
    },
    {
      no: 2,
      img: "/second.png",
      title: "Real-time Match Scoring",
      para: "See exactly how you stack up against the job requirements with a weighted percentage score"
    },
    {
      no: 3,
      img: "third.png",
      title: "Tailored AI Suggestions",
      para: "Get contextual rewrite suggestions for your bullet points using industry-standard power verbs."
    },
    {
      no: 4,
      img: "fourth.png",
      title: "Secure Auth & Privacy",
      para: "Built on the MERN stack with military-grade encryption. Your data is yours, and we never sell to third parties."
    },
    {
      no: 5,
      img: "fiveth.png",
      title: "Export & Download",
      para: "Perfect your resume and export it in ATS-friendly PDF format, optimized for major application systems."
    },
    {
      no: 6,
      img: "sixth.png",
      title: "Job Tracking Dashboard",
      para: "Save your matches and track your application progress across different companies in one place"
    },
  ]


  return (
    <section className='mt-25 space-y-15'>
        <div className=' felx flex-row text-center space-y-2.5'>
           <button className=' w-48 p-0.5 bg-[#8294e90d]  rounded-xl text-[#7e91bb]'>Platform Capabilities</button>
           <h3 className='text-4xl text-[#F9F9FBFF] font-medium'>Advanced Features for Power Users</h3>
           <p className='text-[#BEC0CAFF] text-lg mt-1 '>Everything you need to navigate the modern job market with confidence and precision.</p>
        </div>

        <div className='grid grid-cols-3 gap-2 p-2 m-5 ml-20'>
           {data.map((item)=>(
            <div key={item.no} className='bg-[#181920FF]  '>
                <img src={item.img} alt="img" className='-ml-6'/>
                <h4 className='text-[#F9F9FBFF] font-medium text-lg'>{item.title}</h4>
                <p className='w-90'>{item.para}</p>
            </div>
           ))}
        </div>
    </section>
  )
}

export default Features
 