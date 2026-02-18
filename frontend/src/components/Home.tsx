
import { useSelector } from 'react-redux'
import CategoryCarousel from './CategoryCarousel.tsx'
import Footer from './Footer.tsx'
import HeroSection from './HeroSection.tsx'

import LatestJobs from './LatestJobs.tsx'
import Navbar from './shared/Navbar.tsx'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import useGetAlljobs from './hooks/useGetAlljobs.tsx'

const Home = () => {
  useGetAlljobs()
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role=="recruiter"){
      navigate("/admin/companies")
    }
  },[])

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>

    </div>
  )
}

export default Home