import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { MapPin, ArrowUpRight, Bookmark, Coins, Timer,Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestAssignmentCards = ({ assignment }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const assignmentId = assignment?._id;

  return (
    <div 
      onClick={() => navigate(`/description/${assignmentId}`)}
      className="group relative p-6 bg-white border-[3px] border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 cursor-pointer overflow-hidden"
    >
      
      {/* 1. Category Tag (RPG Style) */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-codedex-yellow border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-black text-[10px] uppercase tracking-widest text-black">
            {assignment?.subject || "General Quest"}
          </span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className={`transition-all ${isSaved ? "text-red-500" : "text-black hover:scale-110"}`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} strokeWidth={3} />
        </button>
      </div>

      {/* 2. Quest Title */}
      <div className="mb-4">
        <h2 className="font-[900] text-2xl text-black leading-tight uppercase italic tracking-tighter group-hover:text-codedex-purple transition-colors">
          {assignment?.title}
        </h2>
        <p className="text-sm text-slate-600 font-bold line-clamp-2 mt-2 leading-snug">
          {assignment?.description}
        </p>
      </div>

      {/* 3. Quest Stats (Bounty & Info) */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-1 bg-emerald-100 border-2 border-black px-3 py-1">
          <Coins size={14} className="text-emerald-700" strokeWidth={3} />
          <span className="font-black text-xs text-emerald-700">{assignment?.budget} GOLD</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 border-2 border-black px-3 py-1">
          <Timer size={14} strokeWidth={3} />
          <span className="font-black text-xs uppercase">{assignment?.assignmentType || "Normal"}</span>
        </div>
      </div>

      {/* 4. Footer Action */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-black border-dashed">
        <div className="flex items-center gap-1 text-slate-500">
          <MapPin className="w-3 h-3" strokeWidth={3} />
          <p className="text-[10px] font-black uppercase tracking-tighter">Remote Nexus</p>
        </div>
        <div className="flex items-center gap-1 font-black text-[10px] uppercase text-codedex-purple group-hover:translate-x-1 transition-transform">
          View Details <ArrowUpRight size={14} strokeWidth={3} />
        </div>
      </div>

      {/* Background Decorative "Sticker" */}
      <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Zap size={100} fill="black" />
      </div>
    </div>
  );
};

export default LatestAssignmentCards;