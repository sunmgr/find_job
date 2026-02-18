import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Globe, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDailog from './UpdateProfileDailog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from './hooks/useGetAppliedJobs';


const Profile = () => {
  useGetAppliedJobs()

    const [open,setOpen] = useState(false)

    const  {user} = useSelector(store=>store.auth)
    const isResume = !!user?.profile?.resume;


  return (
    <div className='min-h-screen bg-[#fcfcfd]'>
      <Navbar />
      
      <div className='max-w-4xl mx-auto px-4 mt-12 pb-20'>
        {/* Main Profile Header Card */}
        <div className='bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-6'>
              <Avatar className="h-28 w-28 border-4 border-[#f5f1ee] shadow-inner">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div className='space-y-1'>
                <h1 className='font-black text-3xl text-[#0f172a] tracking-tight'>{user?.fullname}</h1>
                <p className='text-slate-500 font-medium'>Fullstack Developer & Creative Architect</p>
                <div className='flex items-center gap-3 pt-2'>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-none font-bold px-3 py-1">
                    Available for Hire
                  </Badge>
                </div>
              </div>
            </div>
            <Button type="button" onClick={()=>setOpen(true)} variant="outline" className="rounded-xl border-slate-200 hover:bg-[#4a3728] hover:text-white transition-all group">
              <Pen className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> 
              Edit Profile
            </Button>
          </div>

          {/* Contact & Bio Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-10 border-t border-slate-50'>
            <div className='space-y-4'>
              <div className='flex items-center gap-4 text-slate-600 group'>
                <div className='p-2 rounded-lg bg-slate-50 group-hover:bg-[#f5f1ee] transition-colors'>
                  <Mail className='w-4 h-4 text-[#4a3728]' />
                </div>
                <span className='font-semibold text-sm'>{user?.email}</span>
              </div>
              <div className='flex items-center gap-4 text-slate-600 group'>
                <div className='p-2 rounded-lg bg-slate-50 group-hover:bg-[#f5f1ee] transition-colors'>
                  <Contact className='w-4 h-4 text-[#4a3728]' />
                </div>
                <span className='font-semibold text-sm'>{user?.phoneNumber}</span>
              </div>
            </div>
            
            <div className='space-y-2'>
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Professional Bio</Label>
                <p className='text-sm text-slate-500 leading-relaxed font-medium'>
                   {user?.profile?.bio}
                   </p>
            </div>
          </div>

          
          {/* Skills Section */}
<div className='mt-10'>
  <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Expertise</Label>
  <div className='flex flex-wrap gap-2 mt-4'>
    {/* Added the : null at the end of this block */}
    {user?.profile?.skills?.length !== 0 ? (
      user?.profile?.skills.map((item, index) => (
        <Badge key={index} className="bg-[#0f172a] text-white hover:bg-[#4a3728] transition-colors px-4 py-1.5 rounded-lg border-none text-xs font-bold">
          {item}
        </Badge>
      ))
    ) : (
      <span className="text-xs text-slate-400">No skills added</span>
    )}
  </div>
</div>

          {/* Resume Section */}
          <div className='mt-10 p-6 bg-[#fcfcfd] rounded-2xl border border-dashed border-slate-200'>
            <Label className="text-[#0f172a] font-bold text-sm block mb-3">Curriculum Vitae</Label>
            {isResume ? (
              <a target='_blank' href={user?.profile?.resume} className='text-[#4a3728] font-black text-sm hover:underline flex items-center gap-2'>
                <Globe className='w-4 h-4'/> {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className='text-slate-400 text-sm italic'>No resume uploaded yet</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section (Mini Dashboard) */}
        <AppliedJobTable/>
      </div>
        <UpdateProfileDailog open={open} setOpen={setOpen}/>


    </div>
  );
};

export default Profile;