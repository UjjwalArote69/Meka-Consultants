import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials/>
      <Achievements />
    </>
  );
}