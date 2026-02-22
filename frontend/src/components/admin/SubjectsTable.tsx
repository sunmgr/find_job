import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
    Edit2, 
    MoreHorizontal, 
    Calendar, 
    Swords, 
    ShieldCheck, 
    Zap, 
    ArrowRight,
    Gamepad2 // Added for default icon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

const SubjectsTable = () => {
    const navigate = useNavigate();
    const { subjects, searchSubjectByText } = useSelector(store => store.subject);
    const [filterSubject, setFilterSubject] = useState(subjects);

    useEffect(() => {
        const filtered = subjects.length >= 0 && subjects.filter((s) => {
            if (!searchSubjectByText) return true;
            return s?.name?.toLowerCase().includes(searchSubjectByText.toLowerCase());
        });
        setFilterSubject(filtered);
    }, [subjects, searchSubjectByText]);

    return (
        <div className='bg-white border-[4px] border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono'>
            <Table>
                <TableHeader className="bg-black">
                    <TableRow className="hover:bg-transparent border-b-[4px] border-black">
                        <TableHead className="py-6 pl-8 font-[1000] text-white uppercase tracking-[0.2em] text-[11px]">Domain Name</TableHead>
                        <TableHead className="py-6 font-[1000] text-white uppercase tracking-[0.2em] text-[11px]">Security Status</TableHead>
                        <TableHead className="py-6 font-[1000] text-white uppercase tracking-[0.2em] text-[11px]">Manifested Date</TableHead>
                        <TableHead className="py-6 text-right pr-8 font-[1000] text-white uppercase tracking-[0.2em] text-[11px]">Command</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterSubject.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-20 text-slate-400 font-black uppercase italic tracking-widest">
                                No domains registered in the archives.
                            </TableCell>
                        </TableRow>
                    ) : filterSubject.map((subject) => (
                        <TableRow 
                            key={subject._id} 
                            className="group hover:bg-codedex-cream/50 transition-colors border-b-[3px] border-black"
                        >
                            <TableCell className="py-6 pl-8">
                                <div className='flex items-center gap-5'>
                                    {/* --- LOGO / DEFAULT ICON LOGIC --- */}
                                    <div className='p-1 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all'>
                                        <Avatar className="h-12 w-12 rounded-none bg-codedex-cream flex items-center justify-center">
                                            {subject.logo ? (
                                                <AvatarImage src={subject.logo} className="object-cover" />
                                            ) : (
                                                <Gamepad2 className="w-8 h-8 text-black" strokeWidth={2.5} />
                                            )}
                                        </Avatar>
                                    </div>
                                    
                                    <div className='flex flex-col'>
                                        <span className='font-[1000] text-black text-xl uppercase italic leading-none'>{subject.name}</span>
                                        <span className='text-[10px] font-black text-codedex-purple uppercase tracking-tighter mt-1 flex items-center gap-1'>
                                            <Swords className='w-3 h-3' /> Specialist Branch: {subject.industry || "General"}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge className="bg-emerald-400 text-black border-[2px] border-black rounded-none px-3 py-1 text-[10px] font-black uppercase italic flex items-center gap-1 w-fit shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <ShieldCheck className="w-3 h-3" strokeWidth={3} /> Verified Domain
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <div className='flex items-center gap-2 text-black font-[1000] text-sm uppercase italic'>
                                    <Calendar className='w-4 h-4 text-codedex-purple' strokeWidth={3} />
                                    {subject.createdAt?.split("T")[0]}
                                </div>
                            </TableCell>

                            <TableCell className="text-right pr-8">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='p-2 border-[3px] border-black bg-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(110,68,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 group/trigger'>
                                            <MoreHorizontal className='w-6 h-6 group-hover/trigger:scale-125 transition-transform' strokeWidth={3} />
                                        </button>
                                    </PopoverTrigger>
                                    
                                    <PopoverContent 
                                        side="left"
                                        align="center"
                                        className="w-64 p-0 rounded-none border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                                    >
                                        <div className="bg-black text-white p-3 text-[10px] font-[1000] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Zap size={14} className="text-codedex-yellow fill-current" />
                                            Active Commands
                                        </div>

                                        <div className="p-2 space-y-2 bg-white">
                                            <button 
                                                onClick={() => navigate(`/admin/subjects/${subject._id}`)}
                                                className='w-full flex items-center justify-between p-4 bg-white border-[3px] border-black hover:bg-codedex-purple hover:text-white transition-all group/item shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Edit2 size={18} strokeWidth={3} />
                                                    <span className='font-[1000] text-sm uppercase italic'>Modify Domain</span>
                                                </div>
                                                <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                            </button>

                                            <button 
                                                className='w-full flex items-center justify-between p-4 bg-codedex-yellow border-[3px] border-black text-black hover:bg-black hover:text-white transition-all group/deploy shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Zap size={18} strokeWidth={3} />
                                                    <span className='font-[1000] text-sm uppercase italic'>Deploy Quest</span>
                                                </div>
                                                <ArrowRight size={16} className="opacity-0 group-hover/deploy:opacity-100 transition-opacity" />
                                            </button>
                                        </div>
                                        
                                        <div className="bg-codedex-cream border-t-[3px] border-black p-2 text-center">
                                            <span className="text-[9px] font-black uppercase text-slate-500">ID: {subject._id.slice(-8)}</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubjectsTable;