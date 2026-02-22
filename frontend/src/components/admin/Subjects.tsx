import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ScrollText, Target, Coins, Users } from 'lucide-react';
import useGetAllSubjects from '../hooks/useGetAllStujects';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchSubjectByText } from '@/redux/subjectSlice';
import SubjectsTable from './SubjectsTable';

const Subjects = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // 1. Fetch data on mount
    useGetAllSubjects(); 

    // 2. Select dynamic data from Redux Store
    const { subjects } = useSelector(store => store.subject);
    const { heroes } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(setSearchSubjectByText(input));
    }, [input, dispatch]);

    // Calculate dynamic stats
    const totalDomains = subjects?.length || 0;
    const totalHeroes = heroes?.length || 0;

    return (
        <div className="min-h-screen bg-codedex-cream font-mono text-black pb-20">
            <Navbar />
            
            <div className='max-w-6xl mx-auto px-6 py-12'>
                
                {/* --- VANGUARD HEADER --- */}
                <div className='mb-16 space-y-4'>
                    <div className='inline-block bg-codedex-purple text-white px-4 py-1 border-2 border-black -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                        <span className='font-black uppercase tracking-[0.3em] text-[10px]'>Quest_Giver_Authorized</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className='text-6xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none'>
                                Guild <span className='text-codedex-purple underline decoration-black underline-offset-8'>Domains</span>
                            </h1>
                            <p className='text-slate-600 font-bold uppercase text-sm tracking-widest mt-6 flex items-center gap-2'>
                                <ScrollText className="w-5 h-5" /> Define the fields where heroes shall bleed for bounty.
                            </p>
                        </div>

                        <Button 
                            onClick={() => navigate("/admin/subjects/create")}
                            className="bg-codedex-yellow hover:bg-black hover:text-white text-black border-[4px] border-black rounded-none px-8 py-8 h-auto flex gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 group"
                        >
                            <Plus className='w-6 h-6 group-hover:rotate-90 transition-transform' strokeWidth={3} />
                            <span className="font-[1000] uppercase italic text-lg">Register New Domain</span>
                        </Button>
                    </div>
                </div>

                {/* --- SEARCH & DYNAMIC STATS --- */}
                <div className='bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 mb-12'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                        <div className='relative w-full'>
                            <div className='absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none'>
                                <Search className='text-black w-6 h-6' strokeWidth={3} />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-codedex-cream border-[3px] border-black py-5 pl-16 pr-6 font-black uppercase tracking-wider text-lg outline-none focus:bg-white transition-colors placeholder:text-slate-400"
                                placeholder="Scan existing domains (e.g. Physics,Computer,Drawing)..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        
                        {/* DYNAMIC AUTHORITY STATS */}
                        <div className="hidden lg:flex gap-4">
                            {/* Domains Count */}
                            <div className="border-[4px] border-black p-3 bg-codedex-purple text-white flex flex-col items-center min-w-[140px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-[9px] font-[1000] uppercase tracking-widest opacity-80">Domains_Controlled</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <Target size={18} className="text-codedex-yellow" />
                                    <span className="text-3xl font-[1000] italic leading-none">{totalDomains}</span>
                                </div>
                            </div>

                            {/* Global Hero Count */}
                            <div className="border-[4px] border-black p-3 bg-black text-white flex flex-col items-center min-w-[140px] shadow-[4px_4px_0px_0px_rgba(110,68,255,1)]">
                                <span className="text-[9px] font-[1000] uppercase tracking-widest text-codedex-purple">Available_Heroes</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <Users size={18} className="text-white" />
                                    <span className="text-3xl font-[1000] italic leading-none">{totalHeroes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* --- THE DOMAIN LIST --- */}
                <div className="relative">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
                    <div className="relative bg-white border-[4px] border-black p-2 min-h-[400px]">
                        <div className="bg-black text-white p-4 flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-codedex-yellow" />
                                <span className="font-black uppercase tracking-widest text-xs italic">Operational Territory Registry</span>
                            </div>
                            <span className="text-[10px] font-black opacity-50">Total_Records: {totalDomains}</span>
                        </div>
                        <SubjectsTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subjects;