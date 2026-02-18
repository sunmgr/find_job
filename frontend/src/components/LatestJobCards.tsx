import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { MapPin, ArrowUpRight, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({job}) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate()
  const jobId = job?._id;

  return (
    <div className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] transition-all duration-500 cursor-pointer overflow-hidden">
      
      {/* 1. Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#4a3728] to-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 2. Top Header: Company Info + Bookmark + Action Icon */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-bold text-base text-slate-400 uppercase tracking-widest">
              {job?.company?.name}
            </h1>
          </div>
          <div className="flex items-center gap-1 text-[#4a3728]">
            <MapPin className="w-3 h-3" />
            <p className="text-xs font-bold uppercase tracking-tighter">Kathmandu • Remote</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* BOOKMARK BUTTON */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevents card click trigger
              setIsSaved(!isSaved);
            }}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isSaved 
              ? "bg-[#4a3728] border-[#4a3728] text-white shadow-lg" 
              : "bg-white border-slate-100 text-slate-400 hover:border-[#4a3728]/30 hover:text-[#4a3728]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>

          {/* ACTION ICON */}
          <Button onClick={()=>navigate(`/description/${jobId}`)} className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#0f172a] group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 3. Main Title & Description */}
      <div className="mb-8">
        <h2 className="font-black text-2xl text-[#0f172a] mb-3 leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-300">
          {job?.title}
        </h2>
        <p className="text-[15px] text-slate-500 line-clamp-2 leading-relaxed font-medium opacity-80 group-hover:opacity-100">
          {job?.description}  </p>
      </div>

      {/* 4. Luxury Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="text-[#0f172a] font-bold bg-slate-100/50 border border-slate-200/50 px-4 py-1.5 rounded-xl transition-colors" variant="secondary">
          {job?.position}&nbsp;Openings
        </Badge>
        <Badge className="text-[#4a3728] font-bold bg-[#f5f1ee] border border-[#4a3728]/10 px-4 py-1.5 rounded-xl transition-colors" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-xl transition-colors" variant="secondary">
          {job?.salary}&nbsp;K
        </Badge>
      </div>

      {/* 5. Background Glow */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#4a3728]/5 rounded-full blur-3xl group-hover:bg-[#4a3728]/10 transition-all duration-500" />
    </div>
  );
};

export default LatestJobCards;