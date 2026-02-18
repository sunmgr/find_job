import React, { useEffect, useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableCell 
} from '../ui/table';
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '../ui/popover';
import { 
    Edit2, 
    MoreHorizontal, 
    Eye, 
    Calendar, 
    Briefcase, 
    MapPin,
    ArrowUpRight,
    UserCircle,
    Type
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminJobsTable = () => {
    // 1. Safe State Access
    const { allAdminJobs = [], searchJobByText = "" } = useSelector(store => store.job || {});
    const navigate = useNavigate();

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    // 2. Refined Filtering Logic (Filters by Title, Company, and Role)
    useEffect(() => {
        const filtered = allAdminJobs?.filter((job) => {
            if (!searchJobByText) return true;
            
            const searchText = searchJobByText.toLowerCase();
            return (
                job?.title?.toLowerCase().includes(searchText) || 
                job?.jobTitle?.toLowerCase().includes(searchText) || // Added jobTitle check
                job?.company?.name?.toLowerCase().includes(searchText) ||
                job?.role?.toLowerCase().includes(searchText)
            );
        });
        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className='p-6'>
            <Table>
                <TableCaption className='pb-6 text-slate-400 font-medium italic'>
                    A comprehensive overview of your published professional opportunities.
                </TableCaption>
                <TableHeader className='bg-slate-50/80 backdrop-blur-sm'>
                    <TableRow className='hover:bg-transparent border-none'>
                        <TableHead className='font-bold text-slate-800 py-6 pl-10'>Organization</TableHead>
                        <TableHead className='font-bold text-slate-800 py-6'>Job Title</TableHead> {/* Dedicated Title Column */}
                        <TableHead className='font-bold text-slate-800 py-6'>Role</TableHead> 
                        <TableHead className='font-bold text-slate-800 py-6'>Category</TableHead>
                        <TableHead className='font-bold text-slate-800 py-6'>Date Published</TableHead>
                        <TableHead className='text-right font-bold text-slate-800 py-6 pr-10'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className='text-center py-32'>
                                <div className='flex flex-col items-center justify-center gap-3'>
                                    <div className='p-4 bg-slate-50 rounded-full'>
                                        <Briefcase className='w-8 h-8 text-slate-300' />
                                    </div>
                                    <p className='text-slate-500 font-semibold text-lg'>No jobs found matching "{searchJobByText}"</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow 
                                key={job?._id} 
                                className='group border-slate-50 hover:bg-indigo-50/30 transition-all duration-300'
                            >
                                {/* Company Identity */}
                                <TableCell className='py-8 pl-10'>
                                    <div className='flex items-center gap-5'>
                                        <div className='w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300'>
                                            {job?.company?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='font-bold text-slate-900 text-base tracking-tight'>{job?.company?.name}</span>
                                            <span className='text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium'>
                                                <MapPin className='w-3 h-3' /> {job?.location || "Remote"}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* JOB TITLE COLUMN */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-2'>
                                        <Type className='w-4 h-4 text-slate-400' />
                                        <span className='font-bold text-slate-800'>{job?.title || job?.jobTitle || "Untitled Position"}</span>
                                    </div>
                                </TableCell>

                                {/* ROLE COLUMN */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-2'>
                                        <UserCircle className='w-4 h-4 text-indigo-400' />
                                        <span className='font-semibold text-slate-600 text-sm'>{job?.role || "Specialist"}</span>
                                    </div>
                                </TableCell>

                                {/* Job Details / Category */}
                                <TableCell className='py-8'>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <span className='px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100/50'>
                                                {job?.jobType || "Full-Time"}
                                            </span>
                                        </div>
                                        <span className='text-slate-400 text-xs font-semibold mt-2'>{job?.salary || "Competitive"} Salary</span>
                                    </div>
                                </TableCell>

                                {/* Post Date */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-3 text-slate-500 font-bold text-sm'>
                                        <div className='p-2 bg-slate-100 rounded-xl group-hover:bg-white transition-colors'>
                                            <Calendar className='w-4 h-4 text-slate-500' />
                                        </div>
                                        {job?.createdAt?.split("T")[0]}
                                    </div>
                                </TableCell>

                                {/* Actions Menu */}
                                <TableCell className='text-right py-8 pr-10'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className='p-3 hover:bg-white hover:shadow-xl rounded-2xl transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-100 active:scale-90'>
                                                <MoreHorizontal className='w-6 h-6' />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-56 p-2 rounded-[1.8rem] shadow-2xl border-slate-100 mt-2 animate-in fade-in zoom-in-95' align='end'>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job?._id}/edit`)} 
                                                className='flex items-center justify-between px-4 py-4 hover:bg-indigo-50 rounded-2xl cursor-pointer transition-colors group/item'
                                            >
                                                <div className='flex items-center gap-3'>
                                                    <Edit2 className='w-4 h-4 text-slate-400 group-hover/item:text-indigo-600' />
                                                    <span className='text-sm font-bold text-slate-700'>Modify Listing</span>
                                                </div>
                                                <ArrowUpRight className='w-3 h-3 text-slate-300 group-hover/item:text-indigo-400 transition-all opacity-0 group-hover/item:opacity-100' />
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} 
                                                className='flex items-center justify-between px-4 py-4 hover:bg-emerald-50 rounded-2xl cursor-pointer transition-colors group/item mt-1'
                                            >
                                                <div className='flex items-center gap-3' onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                                                    <Eye className='w-4 h-4 text-slate-400 group-hover/item:text-emerald-600' />
                                                    <span className='text-sm font-bold text-slate-700'>View Applicants</span>
                                                </div>
                                                <div className='bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase'>
                                                    {job?.applications?.length || 0}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;