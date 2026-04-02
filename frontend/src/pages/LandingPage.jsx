import React from 'react'
import {Navbar, Footer} from "../components/index"
import {HeroSection, AboutWork} from "./index"

function LandingPage() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <AboutWork/>
    </>
  )
}

export default LandingPage
