import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Clock } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import {daysAgoFunction} from "../utils/daysAgoFunction.js"

const Job = ({job}) => {
  const navigate = useNavigate()



  return (
    <div className='group p-7 rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(15,_23,_42,_0.1)] transition-all duration-500 cursor-pointer'>
      
      {/* Top Section: Metadata & Save */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100'>
          <Clock className='w-3 h-3 text-slate-400' />
          <span className='text-[11px] font-bold uppercase tracking-wider text-slate-500'>{daysAgoFunction(job?.createdAt)==0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-slate-300 hover:text-[#1e293b] hover:bg-slate-50 transition-colors"
        >
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* Company Branding */}
      <div className='flex items-center gap-4 mb-6'>
        <div className="p-1 shadow-inner bg-slate-50 rounded-2xl border border-slate-100">
          <Avatar className="h-14 w-14 rounded-xl">
            <AvatarImage 
              src='https://imgs.search.brave.com/jIuM1-VwFgMGt8z6774_gHjMJBkEN9i9uWUfNWm_P2g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTcv/MzEwLzM5OS9zbWFs/bC9pbGx1c3RyYXRp/b24tb2YtZ3JlZW4t/cmVzaWRlbmNlLWdv/bGRlbi1sZWF2ZXMt/Z2FyZGVuLXBhbGFj/ZS1sb2dvcy1sZXR0/ZXItdHlwZS1pc29s/YXRlZC13aGl0ZS1i/YWNrZ3JvdW5kLWZv/ci1icmFuZGluZy1h/bmQtaWRlbnRpdHkt/ZGVzaWduLWNvcnBv/cmF0ZS1tYXJrLWxv/Z290eXBlLWNvbmNl/cHR1YWwtaWRlbnRp/dHktZGVzaWducy1j/b21wYW55LXZlY3Rv/ci5qcGc' 
              className="object-cover"
            />
          </Avatar>
        </div>
        
        <div>
          {/* Navy Blue for Company Name */}
          <h2 className='font-bold text-[#0f172a] text-xl leading-tight tracking-tight'>{job?.companyName}</h2>
          <div className='flex items-center gap-1 text-slate-400 mt-1'>
            <MapPin className='w-3 h-3' />
            <p className='text-xs font-semibold'>Kathmandu, Nepal</p>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className='space-y-3'>
        <h1 className='font-black text-2xl text-[#0f172a] tracking-tight group-hover:text-[#4a3728] transition-colors duration-300'>
          {job?.title}
        </h1>
        <p className='text-sm text-slate-500 leading-relaxed font-medium line-clamp-2'>
          {job?.description}
          </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-2 mt-8">
        <Badge className="px-4 py-1.5 text-[#0f172a] font-bold bg-slate-100 border-none rounded-lg" variant="secondary">
          {job?.position}&nbsp; Positions
        </Badge>
        <Badge className="px-4 py-1.5 text-[#4a3728] font-bold bg-[#f5f1ee] border-none rounded-lg" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="px-4 py-1.5 text-emerald-700 font-bold bg-emerald-50 border-none rounded-lg" variant="secondary">
          {job?.salary}&nbsp;K
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-4 mt-8'>
        <Button 
          variant="outline" 
          onClick={()=>{navigate(`/description/${job?._id}`)}}
          className='flex-1 h-12 rounded-2xl border-slate-200 text-[#0f172a] font-bold hover:bg-slate-50 hover:border-slate-300 transition-all'
        >
          Details
        </Button>
        {/* Rich Brown Primary Button */}
        <Button 
          className='flex-[1.5] h-12 rounded-2xl bg-[#4a3728] hover:bg-[#36281d] text-white font-bold shadow-lg shadow-[#4a3728]/20 transition-all active:scale-95'
        >
          Save for later
        </Button>
      </div>

    </div>
  );
};

export default Job;