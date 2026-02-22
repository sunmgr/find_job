import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import { Trophy, Zap, Crown, Star, ScrollText, User, ShieldCheck, Search, X } from 'lucide-react';
import { Badge } from './ui/badge';
import useGetLeaderboard from './hooks/useGetLeaderboard';
import { Link } from 'react-router-dom';

const Heroes = () => {
  useGetLeaderboard();
  
  // Kept as store.auth per your request
  const { heroes, vanguards } = useSelector((store) => store.auth);
  
  const [activeTab, setActiveTab] = useState('heroes'); 
  const [searchTerm, setSearchTerm] = useState("");

  const rawData = activeTab === 'heroes' ? heroes : vanguards;
  
  // Loading check: if rawData is null or empty while hook is running
  const isLoading = !rawData || rawData.length === 0 && searchTerm === "";

  const filteredData = rawData?.filter(user => 
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-codedex-cream font-mono text-black pb-20'>
      <Navbar />
      
      <div className='max-w-6xl mx-auto px-6 py-12'>
        
        {/* --- HEADER --- */}
        <div className='text-center mb-16 space-y-6'>
          <div className='inline-block bg-black text-white px-4 py-1 border-2 border-black rotate-1 shadow-[4px_4px_0px_0px_rgba(110,68,255,1)]'>
             <span className='font-black uppercase tracking-[0.3em] text-[10px]'>Hall_Of_Fame.v1</span>
          </div>
          <h1 className='text-7xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-none'>
            The <span className='text-codedex-purple underline decoration-black underline-offset-8'>Elite</span>
          </h1>
          
          <div className='flex justify-center gap-0 border-[4px] border-black w-fit mx-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white'>
            <button 
              onClick={() => {setActiveTab('heroes'); setSearchTerm("");}}
              className={`px-10 py-5 font-[1000] uppercase text-sm transition-all flex items-center gap-2 ${activeTab === 'heroes' ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}
            >
              <Zap size={20} className={activeTab === 'heroes' ? "text-yellow-400 fill-yellow-400" : ""} />
              Heroes
            </button>
            <button 
              onClick={() => {setActiveTab('recruiters'); setSearchTerm("");}}
              className={`px-10 py-5 font-[1000] uppercase text-sm border-l-[4px] border-black transition-all flex items-center gap-2 ${activeTab === 'recruiters' ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}
            >
              <ScrollText size={20} className={activeTab === 'recruiters' ? "text-codedex-purple" : ""} />
              Quest Givers
            </button>
          </div>
        </div>

        {/* --- SEARCH --- */}
        <div className='max-w-4xl mx-auto mb-16'>
            <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-black'>
                    <Search size={24} strokeWidth={4} />
                </div>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`FIND A ${activeTab === 'heroes' ? 'LEGEND' : 'BENEFACTOR'}...`}
                    className='w-full bg-white border-[4px] border-black py-6 pl-16 pr-16 font-[1000] uppercase tracking-wider text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 outline-none transition-all placeholder:text-slate-300'
                />
            </div>
        </div>

        {/* --- PODIUM SECTION --- */}
        {!searchTerm && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-24 items-end pt-12'>
                {isLoading ? (
                    // Render 3 Podium Skeletons
                    [1, 2, 3].map((i) => <PodiumSkeleton key={i} rank={i-1} />)
                ) : (
                    filteredData?.slice(0, 3).map((user, idx) => (
                        <PodiumCard key={user._id} user={user} rank={idx} type={activeTab} />
                    ))
                )}
            </div>
        )}

        {/* --- LIST SECTION --- */}
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between mb-8 border-b-4 border-black pb-4'>
            <h2 className='font-[1000] uppercase italic text-2xl flex items-center gap-2'>
              <Star size={28} className='fill-black' /> 
              {searchTerm ? "Search Results" : "Global Rankings"}
            </h2>
          </div>

          <div className='grid gap-6'>
            {isLoading ? (
                // Render 5 List Skeletons
                [1, 2, 3, 4, 5].map((i) => <ListSkeleton key={i} />)
            ) : (
                (searchTerm ? filteredData : filteredData?.slice(3))?.map((user, idx) => (
                    <ListRow key={user._id} user={user} rank={searchTerm ? null : idx + 4} type={activeTab} />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SKELETON COMPONENTS ---

const PodiumSkeleton = ({ rank }) => (
  <div className={`h-[400px] bg-white border-[6px] border-dashed border-slate-300 p-8 flex flex-col items-center justify-center space-y-4 animate-pulse ${rank === 0 ? 'md:order-2 scale-110' : rank === 1 ? 'md:order-1' : 'md:order-3'}`}>
    <div className='w-24 h-24 bg-slate-200 border-4 border-black' />
    <div className='w-3/4 h-8 bg-slate-200 border-2 border-black' />
    <div className='w-1/2 h-12 bg-slate-200 border-2 border-black' />
  </div>
);

const ListSkeleton = () => (
  <div className='h-24 bg-white border-[4px] border-dashed border-slate-300 p-5 flex items-center justify-between animate-pulse'>
    <div className='flex items-center gap-6'>
        <div className='w-12 h-12 bg-slate-200' />
        <div className='space-y-2'>
            <div className='w-48 h-6 bg-slate-200 border-2 border-black' />
            <div className='w-32 h-3 bg-slate-200' />
        </div>
    </div>
    <div className='w-20 h-10 bg-slate-200 border-2 border-black' />
  </div>
);

// --- PODIUM CARD & LIST ROW (Including the Profile Links) ---

const PodiumCard = ({ user, rank, type }) => {
  const rankConfig = [
    { border: "border-codedex-purple", shadow: "shadow-[15px_15px_0px_0px_rgba(110,68,255,1)]", order: "md:order-2 scale-110 z-10", icon: <Crown size={54} className='text-codedex-yellow fill-current -top-12 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]' /> },
    { border: "border-black", shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", order: "md:order-1", icon: <Trophy size={36} className='text-slate-400 -top-10' /> },
    { border: "border-black", shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", order: "md:order-3", icon: <Trophy size={36} className='text-orange-600 -top-10' /> },
  ];

  return (
    <div className={`relative bg-white border-[6px] p-8 text-center ${rankConfig[rank].border} ${rankConfig[rank].shadow} ${rankConfig[rank].order} group`}>
      <div className='absolute left-1/2 -translate-x-1/2 z-20'>{rankConfig[rank].icon}</div>
      <Link to={`/profile/${user._id}`}>
        <div className='w-28 h-28 mx-auto mb-6 mt-6 border-[6px] border-black bg-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer'>
          {user.profile?.profilePhoto ? <img src={user.profile.profilePhoto} className='w-full h-full object-cover' /> : <span className='text-4xl font-[1000]'>{user.fullname[0]}</span>}
        </div>
      </Link>
      <Link to={`/profile/${user._id}`}>
        <h3 className='text-3xl font-[1000] uppercase italic tracking-tighter mb-4 line-clamp-1 hover:text-codedex-purple transition-colors cursor-pointer'>{user.fullname}</h3>
      </Link>
      <div className='bg-black text-white p-3 border-4 border-black'>
        <p className='text-[10px] font-black uppercase tracking-widest mb-1'>{type === 'heroes' ? 'Quests Won' : 'Bounty Paid'}</p>
        <p className='text-3xl font-[1000] leading-none'>{type === 'heroes' ? user.completedCount || 0 : `रू ${user.totalBountyPaid || 0}`}</p>
      </div>
    </div>
  );
};

const ListRow = ({ user, rank, type }) => (
  <div className='group bg-white border-[4px] border-black p-5 flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all'>
    <div className='flex items-center gap-6'>
      <span className='font-[1000] text-3xl italic w-12 text-slate-200 group-hover:text-black'>
        {rank ? `#${rank}` : <Star size={24} className="fill-codedex-yellow text-black" />}
      </span>
      <Link to={`/profile/${user._id}`}>
        <div className='w-14 h-14 border-4 border-black bg-slate-100 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all overflow-hidden'>
          {user.profile?.profilePhoto ? <img src={user.profile.profilePhoto} className='w-full h-full object-cover' /> : <User size={28} strokeWidth={3} />}
        </div>
      </Link>
      <div>
        <Link to={`/profile/${user._id}`}>
            <h4 className='font-[1000] uppercase text-xl leading-none hover:text-codedex-purple cursor-pointer'>{user.fullname}</h4>
        </Link>
        <p className='text-[10px] font-bold text-slate-400 uppercase mt-2'>{type === 'heroes' ? 'Specialist' : 'Quest Giver'}</p>
      </div>
    </div>
    <div className='text-right'>
      <p className='font-[1000] text-codedex-purple text-2xl leading-none'>{type === 'heroes' ? user.completedCount || 0 : `रू ${user.totalBountyPaid || 0}`}</p>
    </div>
  </div>
);

export default Heroes;