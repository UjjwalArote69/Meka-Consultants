import React, { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Loader from './components/layout/Loader'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

const LandingPage = lazy(() => import('./pages/Landing/LandingPage'))
const About = lazy(() => import('./pages/About/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  const [showLoader, setShowLoader] = useState(() => {
    const hasVisited = sessionStorage.getItem('siteLoaded');
    return !hasVisited;
  });

  const handleLoaderComplete = () => {
    setShowLoader(false);
    sessionStorage.setItem('siteLoaded', 'true');
  };

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/services' element={<Services />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/:slug' element={<BlogPost />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </>
  )
}

export default App
