import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminAssignmentsTable from './AdminAssignmentsTable';
import { Search, Plus, Swords, Zap, ShieldAlert } from 'lucide-react';
import useGetAllAdminAssignments from '../hooks/useGetAllAdminAssignments';
import { setSearchAssignmentByText } from '@/redux/assignmentSlice';


const AdminAssignments = () => {
    useGetAllAdminAssignments(); 
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchAssignmentByText(filterText));
    }, [filterText]);

    return (
        <div className='min-h-screen bg-codedex-cream font-mono'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-12 px-6'>
                
                {/* Header Control Panel */}
                <div className='bg-white border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-10'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-8'>
                        <div>
                            <div className='flex items-center gap-4 mb-3'>
                                <div className='p-3 bg-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(110,68,255,1)]'>
                                    <Swords className='w-6 h-6 text-white' />
                                </div>
                                <h1 className='text-4xl font-[1000] text-black tracking-tighter uppercase italic'>
                                    Quest_Manifest
                                </h1>
                            </div>
                            <div className='flex items-center gap-2'>
                                <ShieldAlert className='w-4 h-4 text-codedex-purple' />
                                <p className='text-black font-bold text-xs uppercase tracking-widest'>
                                    Status: Overseeing Active Missions and Hero Enrollments.
                                </p>
                            </div>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row items-center gap-6'>
                            {/* Search Terminal */}
                            <div className='relative w-full sm:w-auto group'>
                                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-codedex-purple transition-colors z-10' strokeWidth={3} />
                                <Input
                                    className="pl-12 pr-4 py-7 w-full sm:w-[300px] lg:w-[400px] bg-white border-[3px] border-black rounded-none focus-visible:ring-0 focus-visible:border-codedex-purple transition-all font-black uppercase text-sm placeholder:text-slate-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    placeholder="Search by mission title or domain..."
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                            </div>

                            {/* Action Button */}
                            <Button 
                                onClick={() => navigate("/admin/assignments/create")}
                                className="w-full sm:w-auto bg-codedex-yellow hover:bg-black hover:text-white text-black border-[4px] border-black rounded-none px-8 py-7 h-auto flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                            >
                                <Plus className='w-6 h-6' strokeWidth={4} />
                                <span className='font-[1000] uppercase italic text-lg'>Deploy Quest</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Data Terminal */}
                <div className='relative mb-20'>
                    {/* Decorative Corner Tab */}
                    <div className='absolute -top-6 left-10 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] border-2 border-black z-10 shadow-[4px_4px_0px_0px_rgba(255,255,0,1)]'>
                        Active_Records
                    </div>
                    
                    <div className='bg-white border-[4px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                        <AdminAssignmentsTable />
                    </div>
                    
                    {/* Footer Legend */}
                    <div className='mt-6 flex items-center gap-4 text-[10px] font-black uppercase text-slate-500 italic'>
                        <Zap className='w-3 h-3 text-codedex-yellow fill-current' />
                        <span>Vanguard Protocol v2.0 // Terminal Secured</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAssignments;