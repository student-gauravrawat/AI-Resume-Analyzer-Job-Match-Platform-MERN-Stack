import React from 'react'

function Review() {

  const data= [
    {
      no: 1,
      img: "/star.png",
      para: "MatchMinds helped me identify that I was missing the 'Kubernetes' keyword which was critical for the role. I updated it and got the interview the next day!"
    },
    {
      no: 2,
      img: "/star.png",
      para: "The AI suggestions for my bullet points were incredible. It transformed my passive descriptions into high-impact achievement statements."
    },
    {
      no: 3,
      img: "/star.png",
      para: "I was skeptical at first, but the match score was spot on. It saved me hours of manually tweaking my resume for different applications"
    },
  ]

  const person = [
    {
      no: 1,
      name: "Sarah Jenkins",
      img: "/person.png",
      title: "Senior DevOps Engineer at CloudScale"
    },
    {
      no: 2,
      name: "Marcus Chen",
      img: "/person2.png",
      title: "Product Manager at InnovateTech"
    },
    {
      no: 3,
      name: "Elena Rodriguez",
      img: "/person3.png",
      title: "Marketing Director at Global Brands"

    }
  ]

  return (
    <section className=' mt-25'>
         <div className=' felx flex-row text-center space-y-2'>
           <button className=' w-28 bg-[#8294e90d]  rounded-lg text-[#7e91bb]'>Testimonials</button>
           <h3 className='text-4xl text-[#F9F9FBFF] font-medium'>Success Stories</h3>
           <p className='text-[#BEC0CAFF] text-lg mt-1 '>Join thousands of job seekers who secured interviews at world-class companies using our AI tools.</p>
         </div>

         <div className='mt-10'>

            <div className='flex flex-cols-3 gap-5 place-content-evenly '>
              {data.map((item)=>(
                <div key={item.no}>
                  <img src={item.img} alt="img" className='-ml-6'/>
                  <p className='w-80'>{item.para}</p>
                </div>
              ))}
            </div>

            <div className='flex items-center place-content-evenly -ml-10'>
                {person.map((item)=>(
                  <div key={item.no} className='flex items-center content-center'>
                     <img src={item.img} alt="img" />
                     <div className='mt-5'>
                        <h4 className=' text-[#F9F9FBFF] font-medium text-sm'>{item.name}</h4>
                        <p className=' text-[#BEC0CAFF] font-medium text-sm'>{item.title}</p>
                     </div>
                  </div>
                ))}
            </div>

         </div>
    </section>
  )
}

export default Review
 