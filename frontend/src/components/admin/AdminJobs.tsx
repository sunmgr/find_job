import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import { Search, Plus, Briefcase } from 'lucide-react';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';
import {setSearchJobByText} from '@/redux/jobSlice';


const AdminJobs = () => {
    useGetAllAdminJobs(); 
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Re-enable this so the table can filter the results
    useEffect(() => {
        dispatch(setSearchJobByText(filterText));
    }, [filterText]);

    return (
        <div className='min-h-screen bg-[#f8fafc]'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-12 px-6'>
                <div className='bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-10'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <div className='p-2 bg-indigo-50 rounded-lg'>
                                    <Briefcase className='w-5 h-5 text-indigo-600' />
                                </div>
                                <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>
                                    Job Management
                                </h1>
                            </div>
                            <p className='text-slate-500 text-sm'>
                                Create, edit, and track your active job listings and their applicants.
                            </p>
                        </div>
                        
                        <div className='flex items-center gap-4'>
                            <div className='relative group'>
                                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors' />
                                <Input
                                    className="pl-11 pr-4 py-6 w-[280px] lg:w-[350px] bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-indigo-100 transition-all font-medium"
                                    placeholder="Filter by title, role or company..."
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                            </div>
                            <Button 
                                onClick={() => navigate("/admin/jobs/create")}
                                className="bg-[#0f172a] hover:bg-slate-800 text-white rounded-2xl px-6 py-6 h-auto flex items-center gap-2 shadow-lg shadow-slate-200 transition-all active:scale-95"
                            >
                                <Plus className='w-5 h-5' />
                                <span className='font-bold'>Post New Job</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-20'>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;