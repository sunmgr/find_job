import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Globe, User2, Sparkles, ShieldCheck, MessageSquare, Trophy, Crown, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedAssignmentTable from './AppliedAssignmentTable';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import useGetAppliedAssignments from './hooks/useGetAppliedAssignments';
import UpdateProfileDialog from './UpdateProfileDialog';

const Profile = () => {
  const params = useParams();
  const userIdFromUrl = params.id;

  // Pulling from store.auth as requested
  const { user: authUser, heroes, vanguards } = useSelector(store => store.auth);

  // Determine if viewing own profile
  const isOwner = !userIdFromUrl || userIdFromUrl === authUser?._id;

  // State Management
  const [user, setUser] = useState(isOwner ? authUser : null);
  const [loading, setLoading] = useState(!isOwner);
  const [open, setOpen] = useState(false);

  // Hook for mission history (only runs if owner)
  if (isOwner) {
    useGetAppliedAssignments();
  }

  // Fetch Logic for Public Profiles
  useEffect(() => {
    const fetchHeroProfile = async () => {
      if (isOwner) {
        setUser(authUser);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(`${USER_API_END_POINT}/profile/${userIdFromUrl}`, {
            withCredentials: true
          });
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error("Error fetching dossier:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchHeroProfile();
  }, [userIdFromUrl, authUser, isOwner]);

  // --- GLOBAL RANK CALCULATION ---
  // We check the heroes or vanguards array from store.auth to find this user's position
  const leaderboard = user?.role === 'student' ? heroes : vanguards;
  const globalRank = leaderboard ? leaderboard.findIndex(h => h._id === user?._id) + 1 : 0;

  const isResume = !!user?.profile?.resume;

  if (loading) {
    return (
      <div className='min-h-screen bg-codedex-cream font-mono flex flex-col items-center justify-center gap-4'>
        <Loader2 className='w-12 h-12 animate-spin text-codedex-purple' />
        <h1 className='text-xl font-black uppercase italic tracking-widest'>Accessing Classified Dossier...</h1>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-codedex-cream font-mono text-black'>
      <Navbar />
      
      <div className='max-w-4xl mx-auto px-6 py-12 pb-20'>
        
        {/* --- MAIN DOSSIER CARD --- */}
        <div className='bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative overflow-hidden'>
          
          {/* --- LIVE GLOBAL RANK BADGE --- */}
          {globalRank > 0 && (
            <div className={`absolute top-0 right-0 border-l-[4px] border-b-[4px] border-black px-6 py-2 font-[1000] uppercase italic flex items-center gap-2 z-20 
              ${globalRank === 1 ? 'bg-codedex-purple text-white' : 'bg-codedex-yellow text-black'}`}>
              {globalRank === 1 ? <Crown size={18} className="fill-white" /> : <Trophy size={18} />}
              Rank #{globalRank} Global
            </div>
          )}

          <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
              
              {/* Avatar Frame */}
              <div className="relative group">
                <div className={`absolute inset-0 translate-x-2 translate-y-2 border-[3px] border-black ${globalRank === 1 ? 'bg-codedex-purple' : 'bg-black'}`} />
                <Avatar className="h-32 w-32 rounded-none border-[3px] border-black bg-white relative z-10 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <AvatarImage 
                    src={user?.profile?.profilePhoto} 
                    className="object-cover" 
                  />
                  <AvatarFallback className="bg-slate-100 rounded-none">
                    <User2 className="text-black w-12 h-12" strokeWidth={3} />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className='space-y-3 text-center md:text-left'>
                <div>
                  <h1 className='font-[1000] text-5xl text-black italic uppercase tracking-tighter leading-none'>
                    {user?.fullname}
                  </h1>
                  <p className='text-slate-600 font-bold uppercase text-xs tracking-widest mt-2 bg-codedex-cream inline-block px-2 border border-black'>
                    {user?.profile?.bio || "Combatant Bio: Classified"}
                  </p>
                </div>
                
                <div className='flex items-center justify-center md:justify-start gap-3'>
                  <Badge className="bg-emerald-400 text-black border-[2px] border-black rounded-none font-black uppercase italic text-[10px] px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <ShieldCheck className="w-3 h-3 mr-1" strokeWidth={3}/> 
                    {user?.role === 'student' ? 'Operational Status: Ready' : 'Status: High Command'}
                  </Badge>
                  {globalRank <= 10 && globalRank > 0 && (
                     <Badge className="bg-black text-white border-[2px] border-black rounded-none font-black uppercase text-[10px] italic px-3 py-1">
                        Top 10 Elite
                     </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* CONDITIONAL ACTION BUTTON: OWNER vs PUBLIC */}
            {isOwner ? (
              <Button 
                onClick={() => setOpen(true)} 
                className="w-full md:w-auto rounded-none border-[3px] border-black bg-white text-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-codedex-yellow transition-all flex items-center gap-2"
              >
                <Pen className="w-4 h-4" /> 
                Edit Identity
              </Button>
            ) : (
              <Button 
                className="w-full md:w-auto rounded-none border-[3px] border-black bg-black text-white font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(110,68,255,1)] hover:bg-codedex-purple transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> 
                Communicate
              </Button>
            )}
          </div>

          {/* Contact Information Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-12'>
            <div className='flex items-center gap-4 p-4 border-[3px] border-black bg-codedex-cream'>
              <div className='p-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                <Mail className='w-4 h-4 text-black' strokeWidth={3} />
              </div>
              <span className='font-black uppercase text-[11px] truncate'>{user?.email}</span>
            </div>
            
            <div className='flex items-center gap-4 p-4 border-[3px] border-black bg-codedex-cream'>
              <div className='p-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                <Contact className='w-4 h-4 text-black' strokeWidth={3} />
              </div>
              <span className='font-black uppercase text-[11px]'>{user?.phoneNumber || "No Contact Link"}</span>
            </div>
          </div>

          {/* Abilities/Skills Section */}
          <div className='mt-12'>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-codedex-purple" strokeWidth={3} />
              <Label className="text-[12px] font-black uppercase tracking-[0.2em] text-black italic">Unlocked Abilities</Label>
            </div>
            <div className='flex flex-wrap gap-3'>
              {user?.profile?.skills?.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="bg-white text-black border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-xs font-black uppercase italic hover:bg-codedex-purple hover:text-white transition-all">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Inventory empty...</span>
              )}
            </div>
          </div>

          {/* Artifact/Resume Section */}
          <div className='mt-12 p-6 bg-black text-white border-[3px] border-black'>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-codedex-yellow font-black uppercase italic tracking-widest text-xs">Heroic Artifact (Resume)</Label>
              <Globe className='w-4 h-4 text-codedex-purple'/>
            </div>
            {isResume ? (
              <a 
                target='_blank' 
                rel="noopener noreferrer" 
                href={user?.profile?.resume} 
                className='inline-block text-white font-black text-sm hover:text-codedex-yellow underline decoration-codedex-purple decoration-[3px] underline-offset-8 transition-all'
              >
                VIEW_ARTIFACT: {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className='text-slate-500 text-[10px] font-black uppercase tracking-widest italic'>Artifact missing from inventory</span>
            )}
          </div>
        </div>

        {/* MISSION HISTORY - ONLY VISIBLE TO THE PROFILE OWNER */}
        {isOwner && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex items-center gap-3">
                 <div className="h-8 w-2 bg-black" />
                 <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter">Mission Log (Personal)</h2>
            </div>
            <AppliedAssignmentTable />
          </div>
        )}
      </div>
      
      {/* Update Dialog: Only accessible to owner */}
      {isOwner && <UpdateProfileDialog open={open} setOpen={setOpen}/>}
    </div>
  );
};

export default Profile;