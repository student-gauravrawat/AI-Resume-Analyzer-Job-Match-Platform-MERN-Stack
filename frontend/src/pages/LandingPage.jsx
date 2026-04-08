import React from 'react'
import {Navbar, Footer} from "../components/index"
import {HeroSection, AboutWork, Features, Review, AboutProject} from "./index"
import {Element} from "react-scroll"

function LandingPage() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Element name='aboutwork'>
       <AboutWork/>
    </Element>
    <Element name='features'>
       <Features/>
    </Element>
      <Review/>
    <Element name='aboutproject'>
      <AboutProject/>
    </Element>
      <Footer/>
    </>
  )
}

export default LandingPage
