import React from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sword, ShieldCheck, Timer, XCircle, Trophy, Zap, Eye, Terminal } from 'lucide-react';
import { Badge } from './ui/badge';
import useGetAppliedAssignments from './hooks/useGetAppliedAssignments';

const Battles = () => {
  useGetAppliedAssignments(); 
  const { allAppliedAssignments } = useSelector((store) => store.assignment);

  return (
    <div className='min-h-screen bg-codedex-cream font-mono text-black'>
      <Navbar />
      
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* --- HEADER SECTION --- */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-[6px] border-black pb-10'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3 text-codedex-purple bg-black w-fit px-3 py-1 border-2 border-black'>
              <Terminal size={20} strokeWidth={3} className="text-green-400" />
              <span className='font-black uppercase tracking-[0.4em] text-[10px] text-white'>Mission_Control.v1</span>
            </div>
            <h1 className='text-6xl font-[950] text-black italic uppercase tracking-tighter leading-none'>
              Active <span className='text-codedex-purple bg-white px-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>Battles</span>
            </h1>
          </div>

          <div className='flex gap-6'>
             <StatBox 
                label="Victories" 
                value={allAppliedAssignments?.filter(a => a.status === 'accepted').length || 0} 
                icon={<Trophy size={20} strokeWidth={3}/>} 
                color="bg-green-400" 
             />
             <StatBox 
                label="Ongoing" 
                value={allAppliedAssignments?.filter(a => a.status === 'pending' || a.status === 'preparing').length || 0} 
                icon={<Zap size={20} strokeWidth={3}/>} 
                color="bg-codedex-yellow" 
             />
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        {!allAppliedAssignments || allAppliedAssignments.length <= 0 ? (
          <div className='flex flex-col items-center justify-center py-32 bg-white border-[4px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center px-4'>
            <div className='bg-slate-100 p-8 border-[4px] border-black mb-8 -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]'>
               <ShieldCheck size={80} strokeWidth={1} className="text-slate-300" />
            </div>
            <h2 className='text-4xl font-[950] uppercase italic mb-4 tracking-tight'>No Active Conflicts</h2>
            <p className='text-slate-500 font-bold uppercase text-xs tracking-[0.3em] max-w-sm leading-relaxed'>
              Your combat log is empty. Deploy to a mission to begin your legacy.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-8'>
            {allAppliedAssignments.map((app, index) => (
              <BattleCard key={app._id} application={app} index={index} />
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes brutalPop {
          from { opacity: 0; transform: translateY(30px) rotate(-1deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
      `}} />
    </div>
  );
};

// --- STATBOX COMPONENT ---
const StatBox = ({ label, value, icon, color }) => (
  <div className={`${color} border-[4px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center min-w-[120px] transform hover:-translate-y-1 transition-transform`}>
    <div className='flex items-center gap-2 font-black text-[11px] uppercase mb-1 tracking-wider'>
      {icon} {label}
    </div>
    <span className='text-3xl font-[1000] italic leading-none'>{value}</span>
  </div>
);

// --- BATTLECARD COMPONENT ---
const BattleCard = ({ application, index }) => {
  const navigate = useNavigate();
  const status = application?.status?.toLowerCase() || "pending";
  
  const statusStyles = {
    pending: "bg-codedex-yellow",
    preparing: "bg-codedex-yellow",
    accepted: "bg-green-400",
    rejected: "bg-red-400 text-white"
  };

  const statusIcons = {
    pending: <Timer size={18} strokeWidth={3} />,
    preparing: <Timer size={18} strokeWidth={3} />,
    accepted: <Trophy size={18} strokeWidth={3} />,
    rejected: <XCircle size={18} strokeWidth={3} />
  };

  const handleViewDetails = () => {
    if (application?.assignment?._id) {
      navigate(`/description/${application.assignment._id}`);
    }
  };

  return (
    <div 
      className='group bg-white border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[8px] hover:translate-y-[8px] transition-all flex flex-col md:flex-row justify-between items-center gap-8'
      style={{ 
        animation: `brutalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${index * 150}ms`, 
        opacity: 0 
      }}
    >
      {/* Left side: Quest Data */}
      <div className='flex-1 space-y-4 w-full'>
        <div className='flex items-center gap-4'>
          <Badge className="bg-codedex-purple text-white border-[3px] border-black rounded-none uppercase text-xs font-[1000] px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {application?.assignment?.subject || "Quest"}
          </Badge>
          <div className='flex items-center gap-1 text-[11px] font-black text-slate-400 uppercase italic'>
            <Sword size={12} />
            Deployed: {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
        
        <h3 className='text-3xl font-[1000] uppercase italic tracking-tighter leading-tight group-hover:text-codedex-purple transition-colors'>
          {application?.assignment?.title || "Untitled Mission"}
        </h3>
        
        <div className='inline-block bg-slate-100 border-2 border-black px-3 py-1'>
          <p className='text-sm font-black uppercase tracking-tight'>
            Bounty: <span className='text-xl italic'>रू {application?.assignment?.budget || 0}</span>
          </p>
        </div>
      </div>

      {/* Right side: Actions & Status */}
      <div className='flex flex-col sm:flex-row items-stretch gap-5 w-full md:w-auto'>
        {/* THE "VIEW INTEL" BUTTON UPGRADE */}
        <button 
          onClick={handleViewDetails}
          className='
            flex items-center justify-center gap-3 
            px-8 py-4 
            bg-white text-black font-[1000] uppercase text-sm 
            border-[4px] border-black 
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
            hover:bg-black hover:text-white 
            hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] 
            active:bg-codedex-purple
            transition-all duration-100
          '
        >
          <Eye size={20} strokeWidth={3} />
          View Intel
        </button>

        {/* Status Badge */}
        <div className={`
          flex items-center justify-center gap-3 
          px-8 py-4 
          border-[4px] border-black font-[1000] uppercase text-sm 
          shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
          ${statusStyles[status] || "bg-slate-200"}
        `}>
          {statusIcons[status]}
          {status === 'pending' || status === 'preparing' ? 'Ongoing' : status}
        </div>
      </div>
    </div>
  );
};

export default Battles;