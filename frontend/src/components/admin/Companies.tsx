import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable'; // Or CompanyCards
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import useGetAllCompanies from '../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
     useGetAllCompanies(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    },[input])

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <div className='max-w-6xl mx-auto px-4'>
                <div className='mt-12 mb-8'>
                    <h1 className='text-3xl font-bold text-[#0f172a]'>Registered Companies</h1>
                    <p className='text-slate-500 mt-2'>Manage and edit the companies you've registered for job postings.</p>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100'>
                    <div className='relative w-full md:w-96'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
                        <Input
                            className="pl-10 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#4a3728]/20 transition-all rounded-xl"
                            placeholder="Search by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-[#4a3728] hover:bg-[#36281d] text-white rounded-xl px-6 py-6 h-auto flex gap-2 shadow-lg shadow-[#4a3728]/20 transition-all active:scale-95"
                    >
                        <Plus className='w-5 h-5' />
                        Add New Company
                    </Button>
                </div>
                
                <CompaniesTable searchInput={input} />
            </div>
        </div>
    );
};
export default Companies;