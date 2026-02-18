import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Sparkles, Loader2 } from 'lucide-react';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { setSingleCompany } from '../../redux/companySlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async (e) => {
        // Prevent page reload if using within a form
        e?.preventDefault(); 
        
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company));
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error("Registration Error:", error);
            const errorMessage = error.response?.data?.message || "Failed to register company";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Back Button */}
                <button 
                    type="button"
                    disabled={loading}
                    onClick={() => navigate("/admin/companies")}
                    className='flex items-center gap-2 text-slate-500 hover:text-[#4a3728] transition-all mb-8 group disabled:opacity-50'
                >
                    <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
                    <span className='font-semibold text-sm'>Back to Companies</span>
                </button>

                {/* Header Section */}
                <div className='mb-10'>
                    <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4a3728]/10 mb-4'>
                        <Building2 className='w-6 h-6 text-[#4a3728]' />
                    </div>
                    <h1 className='text-4xl font-bold text-[#0f172a] tracking-tight'>
                        Create a <span className='text-[#4a3728]'>New Company</span>
                    </h1>
                </div>

                {/* Input Card */}
                <form onSubmit={registerNewCompany} className='bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100'>
                    <div className='space-y-6'>
                        <div>
                            <Label htmlFor="company" className="text-slate-700 font-bold mb-3 block text-sm uppercase tracking-wider">
                                Company Name
                            </Label>
                            <Input
                                id="company"
                                type="text"
                                disabled={loading}
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="bg-slate-50 border-slate-200 py-6 rounded-xl focus-visible:ring-2 focus-visible:ring-[#4a3728]/20 transition-all text-lg font-medium placeholder:text-slate-300"
                                placeholder="e.g. Microsoft, Google, or your Startup Name"
                            />
                        </div>

                        {/* Tip Box */}
                        <div className='flex gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100'>
                            <Sparkles className='w-5 h-5 text-amber-500 shrink-0' />
                            <p className='text-sm text-amber-800 leading-relaxed'>
                                <strong>Pro tip:</strong> Using a professional name helps build trust with potential job seekers.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-4 pt-4'>
                            <Button 
                                type="button"
                                variant="outline" 
                                disabled={loading}
                                onClick={() => navigate("/admin/companies")}
                                className="px-8 py-6 h-auto rounded-xl font-bold text-slate-600 hover:bg-slate-50 border-slate-200 transition-all"
                            >
                                Cancel
                            </Button>
                            
                            <Button 
                                type="submit"
                                disabled={loading || !companyName.trim()}
                                className="bg-[#4a3728] hover:bg-[#36281d] text-white px-10 py-6 h-auto rounded-xl font-bold shadow-lg shadow-[#4a3728]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className='flex items-center gap-2'>
                                        <Loader2 className='h-5 w-5 animate-spin' />
                                        <span>Registering...</span>
                                    </div>
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyCreate;