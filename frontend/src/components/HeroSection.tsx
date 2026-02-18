import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setSearchedQuery} from "@/redux/jobSlice"

const HeroSection = () => {

  const[query,setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler= ()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }


  return (
    <div className='text-center py-20 bg-white'>
      <div className='flex flex-col gap-6'>
        
        {/* Sub-badge: Soft Navy/Bronze feel */}
        <span className='mx-auto px-6 py-2 rounded-full bg-[#f5f1ee] text-[#4a3728] font-bold text-xs uppercase tracking-[0.2em] border border-[#4a3728]/10'>
          Nepal's Premier Job Network
        </span>

        {/* Main Heading: Navy with Brown accent */}
        <h1 className='text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1]'>
          Search, Apply &<br /> 
          <span className='text-[#4a3728]'>Elevate Your Career</span>
        </h1>

        {/* Description: Muted Slate */}
        <p className='text-slate-500 font-medium text-lg max-w-2xl mx-auto'>
          Connecting the finest talent with the most prestigious companies. 
          Your next executive milestone starts here.
        </p>

        {/* Search Bar: Refined with Shadow and transitions */}
        <div className="w-full flex justify-center mt-8"> 
          <div className='flex w-full max-w-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-2 pl-6 rounded-2xl items-center gap-4 transition-all focus-within:ring-2 focus-within:ring-[#4a3728]/20'>
            <Search className='h-5 w-5 text-slate-400 shrink-0'/>
            <input 
              type="text" 
              onChange={(e)=>setQuery(e.target.value)}
              placeholder='Search by title, skill, or company...'
              className='outline-none border-none w-full bg-transparent text-[#0f172a] font-medium placeholder:text-slate-400'
            />
            {/* Action Button: Brown Theme */}
            <Button onClick={searchJobHandler} className='rounded-xl bg-[#4a3728] hover:bg-[#36281d] text-white px-8 h-12 font-bold shadow-lg shadow-[#4a3728]/30 transition-all active:scale-95'>
              Find Jobs
            </Button>
          </div>
        </div>

        {/* Trust Factor (Small detail for Premium feel) */}
        <div className='mt-10 flex items-center justify-center gap-8 opacity-40 grayscale'>
          <p className='text-xs font-bold text-slate-500 uppercase tracking-widest'>Trusted by leading firms in Kathmandu</p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection