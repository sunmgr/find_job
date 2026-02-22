import React from 'react';
import { Badge } from './ui/badge'; // Ensure you have your Badge component
import { Timer, Trophy, XCircle } from 'lucide-react';

const BattleCard = ({ application, index }) => {
    // 1. Get status and style accordingly
    const status = application?.status?.toLowerCase() || "pending";
    
    const statusStyles = {
        pending: "bg-codedex-yellow text-black",
        accepted: "bg-green-400 text-black",
        rejected: "bg-red-400 text-white"
    };

    const statusIcons = {
        pending: <Timer size={16} />,
        accepted: <Trophy size={16} />,
        rejected: <XCircle size={16} />
    };

    return (
        <div 
            className='group relative bg-white border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col md:flex-row justify-between items-center gap-6'
            style={{ 
                animation: `brutalPop 0.4s ease-out forwards ${index * 100}ms`, 
                opacity: 0 
            }}
        >
            {/* Left Side: Quest Info */}
            <div className='flex-1 space-y-2'>
                <div className='flex items-center gap-3'>
                    <Badge className="bg-codedex-purple text-white border-2 border-black rounded-none uppercase text-[10px] font-black px-2 py-0.5">
                        {application?.assignment?.subject || "General"}
                    </Badge>
                    <span className='text-[10px] font-black text-slate-400 uppercase italic'>
                        Deployed: {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "Unknown"}
                    </span>
                </div>
                
                <h3 className='text-2xl font-black uppercase italic tracking-tighter group-hover:text-codedex-purple transition-colors'>
                    {application?.assignment?.title || "Mission Title Missing"}
                </h3>
                
                <p className='text-sm font-bold text-slate-500'>
                    Bounty: <span className="text-black">रू {application?.assignment?.budget || "0"}</span>
                </p>
            </div>

            {/* Right Side: Status Badge */}
            <div className='flex items-center gap-6 w-full md:w-auto'>
                <div className={`flex items-center justify-center gap-2 w-full md:w-40 px-4 py-3 border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${statusStyles[status]}`}>
                    {statusIcons[status]}
                    {status === 'pending' ? 'Ongoing' : status}
                </div>
            </div>
        </div>
    );
};

export default BattleCard;