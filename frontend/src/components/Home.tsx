
import { useSelector } from 'react-redux'
import CategoryCarousel from './CategoryCarousel.tsx'
import Footer from './Footer.tsx'
import HeroSection from './HeroSection.tsx'

import LatestAssignments from './LatestAssigments.tsx'
import Navbar from './shared/Navbar.tsx'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import useGetAllAssignments from './hooks/useGetAllAssignments.tsx'


const Home = () => {
  useGetAllAssignments()
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role=="recruiter"){
      navigate("/admin/subjects")
    }
  }, [user, navigate])

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestAssignments/>
        <Footer/>

    </div>
  )
};

export default Home