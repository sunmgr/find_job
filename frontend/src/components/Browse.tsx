import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Assignment from './Assignment'; // Fixed spelling from 'Assigment'
import { useDispatch, useSelector } from 'react-redux';
import useGetAllAssignments from './hooks/useGetAllAssignments';
import { setSearchedQuery } from '@/redux/assignmentSlice';
import { Compass, Sword, Ghost } from 'lucide-react';
import FilterCard from './FilterCard';

const Browse = () => {
  useGetAllAssignments();
  const { allAssignments,searchedQuery } = useSelector((store) => store.assignment);
  const dispatch = useDispatch();
 
const [filterAssignments, setFilterAssignments] = useState(allAssignments);

useEffect(() => {
    // 1. Safety check: if no assignments yet, don't filter
    if (!allAssignments || allAssignments.length === 0) {
        setFilterAssignments([]);
        return;
    }

    // 2. If no query, show everything
    if (!searchedQuery || searchedQuery.trim() === "") {
        setFilterAssignments(allAssignments);
        return;
    }

    const query = searchedQuery.toLowerCase().trim();

    const filtered = allAssignments.filter((assignment) => {
        // Standardize your data fields to strings for comparison
        const title = (assignment?.title || "").toLowerCase();
        const description = (assignment?.description || "").toLowerCase();
        const subject = (assignment?.subject || "").toLowerCase();
        const budget = Number(assignment?.budget) || 0;

        // --- CATEGORY MATCHING (Subject) ---
        const isSubjectMatch = subject.includes(query);

        // --- TEXT MATCHING (Title/Desc) ---
        const isTextMatch = title.includes(query) || description.includes(query);

        // --- BUDGET RANGE MATCHING ---
        let isBudgetMatch = false;
        if (query === "under 500") {
            isBudgetMatch = budget < 500;
        } else if (query === "500-1000") {
            isBudgetMatch = budget >= 500 && budget <= 1000;
        } else if (query === "1000-5000") {
            isBudgetMatch = budget >= 1000 && budget <= 5000;
        } else if (query === "5000+") {
            isBudgetMatch = budget > 5000;
        } else {
            // If user types a number in search bar
            isBudgetMatch = budget.toString().includes(query);
        }

        return isSubjectMatch || isTextMatch || isBudgetMatch;
    });

    console.log(`Filtering for "${query}". Found ${filtered.length} results.`);
    setFilterAssignments(filtered);
}, [allAssignments, searchedQuery]);

  useEffect(() => {
  console.log("Welcome to Browse!");

  return () => {
    dispatch(setSearchedQuery("")); 
    console.log("Cleaned up search query!");
  };
}, [dispatch]);


 return (
  <div className='min-h-screen bg-codedex-cream font-mono'>
    <Navbar />
    
    <div className='max-w-7xl mx-auto px-6 py-12'>
      
      {/* Header Section */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-[4px] border-black pb-8'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-codedex-purple mb-2'>
            <Compass size={24} strokeWidth={3} className="animate-pulse" />
            <span className='font-black uppercase tracking-[0.3em] text-xs'>Discovery Mode</span>
          </div>
          <h1 className='text-5xl font-[900] text-black italic uppercase tracking-tighter'>
            Available <span className='text-codedex-purple'>Quests</span>
          </h1>
        </div>

        <div className='bg-codedex-yellow border-[3px] border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-sm font-black text-black uppercase tracking-widest flex items-center gap-3'>
            <Sword size={18} /> {filterAssignments.length} Active Bounties Found
          </p>
        </div>
      </div>

      {/* NEW: Grid Container for Filter and Results */}
      <div className='flex flex-col lg:flex-row gap-10'>
        
        {/* SIDEBAR: Filter Card Area */}
        <aside className='w-full lg:w-[300px] flex-shrink-0'>
          <div className='sticky top-24'> {/* Keeps filter visible while scrolling */}
            <FilterCard />
          </div>
        </aside>

        {/* MAIN: Results Grid */}
        <div className='flex-1'>
          {filterAssignments.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {filterAssignments.map((assignment, index) => (
                <div 
                  key={assignment._id}
                  className="hover:-translate-y-2 transition-transform duration-300"
                  style={{ 
                    animation: `brutalPop 0.5s ease-out forwards ${index * 100}ms`,
                    opacity: 0 
                  }}
                >
                  <Assignment assignment={assignment}/>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className='flex flex-col items-center justify-center py-24 bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center px-4'>
              <div className='bg-slate-100 p-6 border-[3px] border-black mb-6 rotate-3'>
                <Ghost size={64} className="text-slate-400" strokeWidth={2.5} />
              </div>
              <h2 className='text-3xl font-[900] uppercase italic mb-2'>The Board is Empty</h2>
              <p className='text-slate-500 font-bold uppercase text-xs tracking-widest max-w-md'>
                No heroes have posted bounites matching your criteria. Try changing your search!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes brutalPop {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `}} />
  </div>
);
}

export default Browse