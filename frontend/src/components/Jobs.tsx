import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from 'react-redux';




const Jobs = () => {
  const {allJobs,searchedQuery} = useSelector(store=>store.job)
  const [filterJobs,setFilterJobs] = useState(allJobs)

  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.salary.toString().toLowerCase().includes(searchedQuery.toLowerCase()) 
       })
       setFilterJobs(filteredJobs)
    }else{
      setFilterJobs(allJobs)
    }
  },[allJobs,searchedQuery])


  return (
    // Background set to a very light slate to make the white cards pop
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          
          {/* LEFT SIDE: Filter Card (Fixed Width for precision) */}
          <div className="hidden md:block w-full md:w-[280px] shrink-0">
            <div className="sticky top-24">
               <FilterCard />
            </div>
          </div>

          {/* RIGHT SIDE: Jobs Listing (Flexible & Scrollable) */}
          <div className="flex-1">
            {/* Header section for the list */}
            <div className="flex items-center justify-between mb-6">
               <h1 className="text-[#0f172a] font-bold text-2xl tracking-tight">
                 Recommended Jobs <span className="text-sm font-medium text-slate-400 ml-2">({filterJobs?.length})</span>
               </h1>
            </div>

            <div className="h-[85vh] overflow-y-auto pr-2 pb-20 no-scrollbar">
              {filterJobs?.length <= 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <img src="/no-jobs.svg" alt="No jobs" className="w-32 mb-4 opacity-20" />
                  <span className="text-xl font-bold text-[#4a3728]">No Opportunities Found</span>
                  <p className="text-slate-400 text-sm">Try adjusting your filters to find more results.</p>
                </div>
              ) : (
                // Changed to 2 columns on large screens to keep cards wide and "Premium"
                // 3 columns often makes cards feel too cramped.
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filterJobs.map((job) => (
                    <div 
                      
                      className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out"
                      style={{ animationDelay: `${job?._id * 100}ms` }}
                    >
                      <Job key={job?._id}  job={job} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;