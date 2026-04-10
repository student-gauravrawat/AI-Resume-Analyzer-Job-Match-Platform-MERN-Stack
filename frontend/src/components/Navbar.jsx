import React, { useState } from "react";
import { Link } from "react-scroll";
import { Login, Register, EmailVerify } from "../pages/index";

function Navbar() {
  const [activeModal, setActiveModal] = useState(null);
  const [userEmail, setUserEmail] = useState("");
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

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");

  const openVerify = (email = "") => {
    if (email) setUserEmail(email);
    setActiveModal("verify");
  };

  const closeAll = () => {
    setActiveModal(null);
    setUserEmail("");
  };

  return (
    <nav className="flex items-center justify-between w-full fixed top-0 left-0 z-50 bg-[#181920CC] backdrop-blur-sm px-6 py-1.5 shadow-md">
      {/* Left Section - Logo + Links */}
      <div className="flex items-center gap-9">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="web_logo"
            className="w-15 h-15 rounded-full mr-2 mt-2"
          />
          <h1 className="text-[#798BE7FF] text-lg md:text-xl font-bold whitespace-nowrap">
            AI Resume Analyzer
          </h1>
        </div>

        {/* Navigation Links - Desktop only */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6">
            {lists.map((item) => (
              <li key={item.no}>
                <Link
                  activeClass="text-blue-500 font-bold"
                  spy={true}
                  to={item.to}
                  offset={-98}
                  smooth={true}
                  duration={500}
                  className="text-[#BEC0CAFF] text-md cursor-pointer font-semibold hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section - Buttons */}
      <div className="flex items-center gap-4">
        <button
          className="text-[#BEC0CAFF] cursor-pointer text-md font-medium hover:text-white transition-colors"
          onClick={openLogin}
        >
          Login
        </button>
        <button
          className="bg-[#798BE7FF] hover:bg-[#6575c9] text-[#181920FF] font-semibold px-5 py-2 cursor-pointer rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={openRegister}
        >
          Sign Up Free
        </button>
      </div>

      {/* Mobile Menu Button - Optional */}
      <button className="md:hidden text-white text-2xl">☰</button>

      <Login
        open={activeModal === "login"}
        onClose={closeAll}
        openRegister={openRegister}
        openVerify={() => openVerify()}
      />

      <Register
        open={activeModal === "register"}
        onClose={closeAll}
        openLogin={openLogin}
        onSuccess={(email) => openVerify(email)}
      />

      <EmailVerify
        open={activeModal === "verify"}
        email={userEmail}
        onClose={closeAll}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
      />
    </nav>
  );
}

export default Navbar;
