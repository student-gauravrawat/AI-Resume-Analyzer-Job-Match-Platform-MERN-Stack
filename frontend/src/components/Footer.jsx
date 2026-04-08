import React from "react";

function Footer() {
  const data = [
    {
      id: 1,
      title: "Product",
      count1: "Resume Analyzer",
      count2: "Match Score",
      count3: "Career Pathing",
      count4: "ATS Optimization",
    },
    {
      id: 2,
      title: "Resources",
      count1: "Career Blog",
      count2: "Resume Templates",
      count3: "ATS Guide 2024",
      count4: "Community",
    },
    {
      id: 3,
      title: "Legal",
      count1: "Privacy Policy",
      count2: "Terms of Service",
      count3: "Cookie Policy",
      count4: "Compliance",
    },
  ];

  return (
    <section className="mt-20 mb-5 border-t border-[#343642FF] space-y-5">

      <div className="flex items-center place-content-evenly">
        <div className=" flex flex-col item-start -space-y-2 mt-5">
          <div className=" flex content-center items-center -ml-7">
            <img
              src="/logo.png"
              alt="web_logo"
              className="w-14 h-14 rounded-full"
            />
            <h1 className=" text-[#798BE7FF] text-[17px] font-bold underline">
              AI Resume Analyzer
            </h1>
          </div>
          <p className="text-[#BEC0CAFF] text-md w-89">
            Empowering job seekers with enterprise-grade AI tools to optimize
            their careers and land dream roles at top companies.
          </p>

          <div className="flex -space-x-12 items-center content-start -ml-7">
            <img src="/world.png" alt="img" />
            <img src="chat.png" alt="img" />
            <img src="/thunder.png" alt="img" />
          </div>
        </div>

        {data.map((item) => (
          <div key={item.id} className="space-y-1">
            <h4 className="text-[#F9F9FBFF] text-lg font-medium">
              {item.title}
            </h4>
            <p className="text-md text-[#BEC0CAFF]">{item.count1}</p>
            <p className="text-md text-[#BEC0CAFF]">{item.count2}</p>
            <p className="text-md text-[#BEC0CAFF]">{item.count3}</p>
            <p className="text-md text-[#BEC0CAFF]">{item.count4}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-[#343642FF] w-[90%] mx-auto"/>
      <div className=" text-center p-3">
         <p className=" text-[#BEC0CAFF]">@2026 AI Resume Analyzer. All rights reserved. Built with precision.</p>
      </div>
    </section>
  );
}

export default Footer;
