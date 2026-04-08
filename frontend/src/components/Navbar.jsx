import React, { useState } from "react";
import { Link } from "react-scroll";
import { Login, Register } from "../pages/index";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const lists = [
    {
      no: 1,
      title: "How it Works",
      to: "aboutwork",
    },
    {
      no: 1,
      title: "Features",
      to: "features",
    },
    {
      no: 1,
      title: "About Project",
      to: "aboutproject",
    },
  ];

  const handleLoginOpen = () => {
    setLogin(true);
    setRegister(false); 
  };

  const handleRegisterOpen = () => {
    setRegister(true);
    setLogin(false); 
  };

  return (
    <nav className="flex content-center items-center lg:gap-[45%] w-full fixed mb-20 bg-[#181920CC]">
      <section className="flex content-center items-center gap-20">
        {/* logo with name */}
        <div className=" flex content-center items-center">
          <img
            src="/logo.png"
            alt="web_logo"
            className="w-23 h-23 rounded-full mr-2 mt-2"
          />
          <h1 className=" text-[#798BE7FF] text-[20px] font-bold">
            AI Resume Analyzer
          </h1>
        </div>

        {/* Links */}
        <div>
          <ul className=" flex justify-center items-center gap-6">
            {lists.map((item) => (
              <li
                className=" text-[#BEC0CAFF] text-md cursor-pointer font-semibold"
                key={item.no}
              >
                <Link
                  activeClass="text-blue-500 font-bold"
                  spy={true}
                  to={item.to}
                  offset={-30}
                  smooth={true}
                  duration={500}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Button Section */}
      <section className=" flex content-center items-center gap-7 ">
        <button
          className="text-[#BEC0CAFF] cursor-pointer text-lg"
           onClick={handleLoginOpen}
        >
          Login
        </button>
        <button
          className=" bg-[#798BE7FF] hover:bg-[#aeb7e6] text-[#181920FF] font-semibold w-30 h-10 cursor-pointer rounded-lg"
          onClick={handleRegisterOpen}
        >
          Sign Up Free
        </button>
      </section>

      <Login open={login} openRegister={handleRegisterOpen} onClose={() => setLogin(false)}/>
      <Register open={register} openLogin={handleLoginOpen} onClose={() => setRegister(false)}/>
    </nav>
  );
}

export default Navbar;
