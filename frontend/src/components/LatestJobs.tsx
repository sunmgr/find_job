import React from 'react';
import LatestJobCards from "./LatestJobCards";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';





const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className='max-w-7xl mx-auto px-4 my-24'>
      {/* Section Header */}
      <div className='text-center mb-16 space-y-4'>
        <div className='flex items-center justify-center gap-2 mb-2'>
          <span className='w-12 h-[2px] bg-[#4a3728] rounded-full'></span>
          <span className='text-[10px] font-black uppercase tracking-[0.4em] text-[#4a3728]'>
            Exclusive Opportunities
          </span>
          <span className='w-12 h-[2px] bg-[#4a3728] rounded-full'></span>
        </div>
        
        <h1 className='text-4xl md:text-6xl font-black tracking-tighter text-[#0f172a]'>
          Latest & <span className='text-[#4a3728]'>Top Openings</span>
        </h1>
        
        <p className='text-slate-400 font-medium text-lg max-w-xl mx-auto leading-relaxed'>
          Discover high-impact roles at Nepal's most prestigious organizations. 
          Your next executive milestone starts here.
        </p>
      </div>
{/* Job Grid: Clean 3-column layout */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {
    allJobs?.length <= 0 ? (
      <span className="col-span-full text-center text-slate-400 font-bold py-10 uppercase tracking-widest">
        No Jobs Available
      </span>
    ) : (
      allJobs?.slice(0, 6).map((job, index) => (
        <div 
          key={job._id} // <--- FIX 1: Key must be on the outermost wrapper
          className="animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out"
          style={{ animationDelay: `${index * 150}ms` }} // <--- FIX 2: Use index for delay math
        >
          <LatestJobCards job={job} />
        </div>
      ))
    )
  }
</div>

      {/* Luxury "View All" Action */}
      <div className='mt-16 text-center'>
        <button className='px-10 py-4 bg-[#0f172a] text-white font-bold rounded-2xl hover:bg-[#4a3728] transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95'>
          <Link to="/browse">Explore All Openings
</Link>        </button>
      </div>
    </div>
  )
}

export default LatestJobs;