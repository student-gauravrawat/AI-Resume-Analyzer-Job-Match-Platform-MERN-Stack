import React from 'react'
import {Link} from "react-scroll"

function Navbar() {

  const lists = [
    {
      no: 1,
      title: "How it Works",
      to: "aboutwork"
    },
    {
      no: 1,
      title: "Features",
      to: "features"
    },
    { 
      no: 1,
      title: "About Project",
      to: "aboutproject"
    },
  ]

  return (
    <nav className='flex content-center items-center lg:gap-[45%] '>
       <section className='flex content-center items-center gap-20'>
          {/* logo with name */}
          <div className=' flex content-center items-center'>
             <img 
                src="/logo.png" 
                alt="web_logo" 
                className='w-23 h-23 rounded-full mr-2 mt-2'  
                />
             <h1 className=' text-[#798BE7FF] text-[20px] font-bold'>AI Resume Analyzer</h1>
          </div>

          {/* Links */}
          <div>
               <ul className=' flex justify-center items-center gap-6'>
                  {lists.map((item)=>(
                     <li
                      className=' text-[#BEC0CAFF] text-md cursor-pointer font-semibold' 
                      key={item.no}
                     >
                       <Link to={item.to} smooth={true} duration={500}>{item.title}</Link>
                     </li>
                  ))}
               </ul>
          </div>
       </section> 

       {/* Button Section */}
       <section className=' flex content-center items-center gap-7 '>
         <button className='text-[#BEC0CAFF] cursor-pointer text-lg'>Login</button>
         <button className=' bg-[#798BE7FF] hover:bg-[#aeb7e6] text-[#181920FF] font-semibold w-30 h-10 cursor-pointer rounded-lg'>Sign Up Free</button>
       </section> 

    </nav>
  )
}

export default Navbar
