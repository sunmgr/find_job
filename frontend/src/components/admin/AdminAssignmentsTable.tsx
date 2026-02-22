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
    Swords, 
    MapPin,
    ArrowRight,
    Zap,
    ScrollText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminAssignmentsTable = () => {
    const { allAdminAssignments = [], searchAssignmentByText = "" } = useSelector(store => store.assignment || {});
    const navigate = useNavigate();
    const [filterAssignments, setFilterAssignments] = useState(allAdminAssignments);

    useEffect(() => {
        const filtered = allAdminAssignments?.filter((assignment) => {
            if (!searchAssignmentByText) return true;
            const searchText = searchAssignmentByText.toLowerCase();
            return (
                assignment?.title?.toLowerCase().includes(searchText) || 
                assignment?.subject?.name?.toLowerCase().includes(searchText) ||
                assignment?.requirement?.some(req => req.toLowerCase().includes(searchText))
            );
        });
        setFilterAssignments(filtered);
    }, [allAdminAssignments, searchAssignmentByText]);

    return (
        <div className='p-0 bg-white font-mono'>
            <Table>
                <TableCaption className='pb-6 text-black font-black uppercase italic text-[10px] tracking-[0.2em] border-t-[4px] border-black pt-4 bg-slate-50'>
                    ARCHIVE_LOG: MISSION_HISTORY_ENCRYPTED
                </TableCaption>
                <TableHeader className='bg-black'>
                    <TableRow className='hover:bg-transparent border-b-[4px] border-black'>
                        <TableHead className='font-[1000] text-white py-6 pl-10 uppercase tracking-widest text-[11px]'>Domain/Origin</TableHead>
                        <TableHead className='font-[1000] text-white py-6 uppercase tracking-widest text-[11px]'>Mission Title</TableHead>
                        <TableHead className='font-[1000] text-white py-6 uppercase tracking-widest text-[11px]'>Rank/Status</TableHead>
                        <TableHead className='font-[1000] text-white py-6 uppercase tracking-widest text-[11px]'>Capacity</TableHead>
                        <TableHead className='font-[1000] text-white py-6 uppercase tracking-widest text-[11px]'>Manifest Date</TableHead>
                        <TableHead className='text-right font-[1000] text-white py-6 pr-10 uppercase tracking-widest text-[11px]'>Commands</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterAssignments?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className='text-center py-32'>
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <div className='p-5 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                                        <ScrollText className='w-12 h-12 text-black' strokeWidth={3} />
                                    </div>
                                    <p className='text-black font-black uppercase italic tracking-tighter text-xl'>
                                        No Quests found in the directory.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterAssignments?.map((assignment) => (
                            <TableRow 
                                key={assignment?._id} 
                                className='group border-b-[3px] border-black hover:bg-slate-50 transition-colors'
                            >
                                {/* Domain/Origin - SUBJECT BASED AVATAR */}
                                <TableCell className='py-8 pl-10'>
                                    <div className='flex items-center gap-5'>
                                        {/* Avatar shows first letter of Subject Name */}
                                        <div className='w-14 h-14 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black font-[1000] text-2xl group-hover:bg-codedex-yellow transition-all uppercase'>
                                            {assignment?.subject?.name?.charAt(0) || "M"}
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='font-[1000] text-black text-lg uppercase italic leading-none'>
                                                {assignment?.subject?.name || "Classified"}
                                            </span>
                                            <span className='text-[10px] text-codedex-purple font-black uppercase flex items-center gap-1 mt-1'>
                                                <MapPin className='w-3 h-3' strokeWidth={3} /> Sector-Global
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Mission Title */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-2'>
                                        <Zap className='w-4 h-4 text-codedex-yellow fill-current' />
                                        <span className='font-[1000] text-black uppercase text-sm italic'>{assignment?.title}</span>
                                    </div>
                                </TableCell>

                                {/* Rank/Status (Bounty in Rupee) */}
                                <TableCell className='py-8'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='w-fit px-3 py-1 bg-black text-white text-[9px] font-[1000] uppercase tracking-tighter italic border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(110,68,255,1)]'>
                                            Active_Quest
                                        </span>
                                        <span className='text-black text-[10px] font-black uppercase mt-1 italic'>
                                            Bounty: रू {assignment?.budget}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Capacity */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-2'>
                                        <Swords className='w-4 h-4 text-black' strokeWidth={3} />
                                        <span className='font-black text-slate-600 text-[11px] uppercase'>{assignment?.position} Slots</span>
                                    </div>
                                </TableCell>

                                {/* Manifest Date */}
                                <TableCell className='py-8'>
                                    <div className='flex items-center gap-2 text-black font-black text-xs uppercase italic'>
                                        <Calendar className='w-4 h-4 text-codedex-purple' strokeWidth={3} />
                                        {assignment?.createdAt?.split("T")[0]}
                                    </div>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className='text-right py-8 pr-10'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className='p-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95'>
                                                <MoreHorizontal className='w-6 h-6' strokeWidth={3} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent 
                                            className='w-60 p-0 rounded-none border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden' 
                                            align='end'
                                        >
                                            <div className="bg-black text-white p-3 text-[10px] font-[1000] uppercase tracking-widest flex items-center gap-2">
                                                <Zap size={14} className="text-codedex-yellow fill-current" />
                                                Active_Commands
                                            </div>
                                            <div className="p-2 space-y-2">
                                                <div 
                                                    onClick={() => navigate(`/admin/assignments/${assignment?._id}/edit`)} 
                                                    className='flex items-center justify-between p-3 border-[3px] border-black hover:bg-codedex-purple hover:text-white cursor-pointer transition-all font-[1000] uppercase text-[11px] italic group/item'
                                                >
                                                    <div className='flex items-center gap-3'>
                                                        <Edit2 className='w-4 h-4' strokeWidth={3} />
                                                        <span>Modify_Quest</span>
                                                    </div>
                                                    <ArrowRight className='w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity' />
                                                </div>

                                                <div 
                                                    onClick={() => navigate(`/admin/assignments/${assignment?._id}/applicants`)} 
                                                    className='flex items-center justify-between p-3 border-[3px] border-black hover:bg-emerald-400 hover:text-black cursor-pointer transition-all font-[1000] uppercase text-[11px] italic group/item'
                                                >
                                                    <div className='flex items-center gap-3'>
                                                        <Eye className='w-4 h-4' strokeWidth={3} />
                                                        <span>Inspect_Heroes</span>
                                                    </div>
                                                    <div className='bg-black text-white text-[9px] px-2 py-0.5 border-2 border-black font-black'>
                                                        {assignment?.applications?.length || 0}
                                                    </div>
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

export default AdminAssignmentsTable;