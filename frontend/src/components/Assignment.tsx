import React from 'react';
import { Button } from './ui/button.js';
import { Bookmark, MapPin, Clock, ArrowRight, UserCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.js';
import { Badge } from './ui/badge.js';
import { useNavigate } from 'react-router-dom';
import { daysAgoFunction } from "../utils/daysAgoFunction.js";

const Assignment = ({ assignment }) => {
  const navigate = useNavigate();

  // Logic to get the first letter of the subject
  const firstLetter = assignment?.subject?.charAt(0).toUpperCase() || "Q";
  
  // Safely extract the commander name from populated backend data
  const commanderName = assignment?.created_by?.fullname ;

  return (
    <div className='group p-6 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer flex flex-col h-full font-mono'>
      
      {/* Top Section: Metadata & Bookmark */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2 px-3 py-1 bg-codedex-yellow border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
          <Clock className='w-3 h-3 text-black' strokeWidth={3} />
          <span className='text-[10px] font-black uppercase tracking-wider text-black'>
            {daysAgoFunction(assignment?.createdAt) === 0 ? "Just In" : `${daysAgoFunction(assignment?.createdAt)}D Ago`}
          </span>
        </div>
        <button 
          className="p-2 border-[2px] border-transparent hover:border-black hover:bg-codedex-cream transition-all rounded-none"
        >
          <Bookmark className="w-5 h-5 text-black" strokeWidth={2.5} />
        </button>
      </div>

      {/* Header: Commander & Subject */}
      <div className='flex items-center gap-4 mb-5'>
        <div className="p-1 border-[2px] border-black bg-white rotate-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Avatar className="h-12 w-12 rounded-none border-none">
            <AvatarImage 
              src={assignment?.company?.logo} 
              className="object-cover"
            />
            <AvatarFallback className="bg-codedex-purple text-white font-black rounded-none text-xl">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className='overflow-hidden'>
          <h2 className='font-black text-black text-xs uppercase tracking-tighter truncate flex items-center gap-1 opacity-80'>
            <UserCircle size={12} strokeWidth={3} className="text-codedex-purple" />
            {commanderName}
          </h2>
          <div className='flex items-center gap-1 text-black mt-0.5'>
            <p className='text-[10px] font-black uppercase tracking-widest text-slate-400 italic'>
               {assignment?.subject || "Mission"}
            </p>
          </div>
        </div>
      </div>

      {/* Content: The "Quest" Info */}
      <div className='flex-grow space-y-2'>
        <h1 className='font-[900] text-xl text-black italic uppercase leading-none tracking-tighter group-hover:text-codedex-purple transition-colors'>
          {assignment?.title}
        </h1>
        <p className='text-xs text-slate-600 font-bold leading-relaxed line-clamp-2'>
          {assignment?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <Badge className="rounded-none border-[2px] border-black bg-white text-black font-black text-[10px] uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {assignment?.position} Slots
        </Badge>
        <Badge className="rounded-none border-[2px] border-black bg-emerald-400 text-black font-black text-[10px] uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Rs. {assignment?.budget}
        </Badge>
      </div>

      {/* Footer Actions */}
      <div className='flex items-center gap-3 mt-8'>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/description/${assignment?._id}`)}
          className='flex-1 h-11 rounded-none border-[3px] border-black bg-white text-black font-black uppercase italic text-xs hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none'
        >
          Intel
        </Button>
        <Button 
          onClick={() => navigate(`/description/${assignment?._id}`)}
          className='flex-[1.5] h-11 rounded-none bg-codedex-purple border-[3px] border-black text-white font-black uppercase italic text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2'
        >
          Accept <ArrowRight size={14} strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default Assignment;