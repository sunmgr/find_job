import React from 'react';
import LatestAssignmentCards from "./LatestAssigmentCards"; // Note: Ensure the filename spelling matches (Assigment vs Assignment)
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sparkles, Zap } from 'lucide-react';

const LatestAssignments = () => {
  const { allAssignments } = useSelector((store: any) => store.assignment);
  const displayData = allAssignments?.length > 0 ? allAssignments : [];
  return (
    <div className='max-w-7xl mx-auto px-6 my-24'>
      {/* Section Header: Codédex Adventure Style */}
      <div className='text-center mb-16 space-y-4'>
        <div className='flex items-center justify-center gap-3 mb-2'>
          <div className='bg-codedex-yellow border-2 border-black p-1 rotate-3'>
            <Zap size={16} fill="black" />
          </div>
          <span className='text-[11px] font-[900] uppercase tracking-[0.3em] text-black'>
            Live Bounty Board
          </span>
        </div>
        
        <h1 className='text-5xl md:text-7xl font-[900] italic tracking-tighter uppercase leading-none'>
          Active <span className='text-codedex-purple'>Quests</span>
        </h1>
        
        <p className='text-slate-600 font-bold text-lg max-w-xl mx-auto leading-relaxed'>
          Accept a challenge, submit your solutions, and earn rewards. 
          The higher the difficulty, the bigger the bounty.
        </p>
      </div>

      {/* Grid: Neo-Brutalist Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          displayData?.length <= 0 ? (
            <div className="col-span-full border-4 border-dashed border-slate-300 py-20 text-center">
               <span className="text-slate-400 font-black uppercase tracking-widest text-2xl italic">
                No Quests Found in This Realm
              </span>
            </div>
          ) : (
            displayData?.slice(0, 6).map((assignment, index) => (
              <div 
                key={assignment._id}
                className="hover:translate-y-[-5px] transition-transform duration-300"
              >
                <LatestAssignmentCards assignment={assignment} />
              </div>
            ))
          )
        }
      </div>

      {/* Action: Brutalist Button */}
      <div className='mt-20 text-center'>
        <Link to="/browse">
          <button className='bg-black text-white px-12 py-5 font-black uppercase italic tracking-widest text-sm border-[3px] border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer'>
            <div className="flex items-center gap-2">
               View All Bounties <Sparkles size={18} fill="white" />
            </div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LatestAssignments;