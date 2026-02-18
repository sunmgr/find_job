import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';

import { useSelector } from 'react-redux';
import { useState } from 'react';



const CompaniesTable = () => {
    const navigate = useNavigate() 
    const { companies,searchCompanyByText  } = useSelector(store => store.company);
    const [filterCompany,setFilterCompany] = useState(companies)
    useEffect(()=>{
        const filterCompany = companies.length>=0 && companies.filter((company)=>{
            if(!searchCompanyByText) return true

            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filterCompany)
        
    },[companies,searchCompanyByText])



    return (
        <div className='bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden'>
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-b border-slate-100">
                        <TableHead className="py-6 pl-8 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Company Details</TableHead>
                        <TableHead className="py-6 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Status</TableHead>
                        <TableHead className="py-6 font-bold text-slate-900 uppercase tracking-widest text-[10px]"> Date</TableHead>
                        <TableHead className="py-6 text-right pr-8 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length <= 0 ? (
        <TableRow>
            <TableCell colSpan={4} className="text-center py-10 text-slate-500 font-medium">
                No companies found. Add one to get started!
            </TableCell>
        </TableRow>
    ) :filterCompany.map((company) => (
                        <TableRow 
                            key={company._id} 
                            className="group hover:bg-slate-50/80 transition-all duration-300 border-b border-slate-50"
                        >
                            <TableCell className="py-5 pl-8">
                                <div className='flex items-center gap-4'>
                                    {/* Logo Container with subtle pop effect */}
                                    <div className='p-2 bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:scale-110 group-hover:border-[#4a3728]/30 transition-all duration-300'>
                                        <Avatar className="h-10 w-10 rounded-xl">
                                            <AvatarImage src={company.logo} className="object-contain" />
                                        </Avatar>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-slate-800 text-base'>{company.name}</span>
                                        <span className='text-xs text-slate-400 flex items-center gap-1 font-medium'>
                                            <Building2 className='w-3 h-3' /> {company.industry}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 rounded-full px-3 py-0.5 text-[11px] font-bold flex items-center gap-1 w-fit">
                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <div className='flex items-center gap-2 text-slate-500 font-semibold text-sm'>
                                    <Calendar className='w-4 h-4 text-slate-300' />
                                    {company.createdAt.split("T")[0]} {/* Display only the date part */}
                                </div>
                            </TableCell>

                            <TableCell className="text-right pr-8">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='p-2 hover:bg-white hover:shadow-md rounded-full transition-all text-slate-400 hover:text-slate-900'>
                                            <MoreHorizontal className='w-5 h-5' />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 rounded-2xl border-slate-100 shadow-xl" align="end">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-600 hover:text-[#4a3728] transition-all'
                                        >
                                            <Edit2 className='w-4 h-4' />
                                            <span className='font-bold text-sm'>Edit Profile</span>
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

export default CompaniesTable;