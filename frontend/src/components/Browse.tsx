import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAlljobs from './hooks/useGetAlljobs';
import { setSearchedQuery } from '@/redux/jobSlice';



const Browse = () => {
  useGetAlljobs()
  const {allJobs} = useSelector((store)=>store.job)
  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])

  return (
    <div className='min-h-screen bg-[#fcfcfd]'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 my-12'>
        
        {/* Header Section */}
        <div className='flex flex-col gap-2 mb-10'>
          <h1 className='text-3xl font-black text-[#0f172a] tracking-tight'>
            Search Results
          </h1>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-1 bg-[#4a3728] rounded-full'></span>
            <p className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
              Found {allJobs.length} Premium Openings
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            allJobs.map((job) => {
              return (
                <div 
                  key={job._id}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out"
                  style={{ animationDelay: `${allJobs.indexOf(job) * 100}ms` }}
                >
                  <Job job={job}/>
                </div>
              )
            })
          }
        </div>

        {/* Empty State (Optional Logic) */}
        {allJobs.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200'>
             <p className='text-[#4a3728] font-bold text-xl'>No results found</p>
             <p className='text-slate-400'>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse;