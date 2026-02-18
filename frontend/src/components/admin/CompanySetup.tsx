import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { 
    ArrowLeft, 
    CloudUpload, 
    Globe, 
    MapPin, 
    Building2, 
    AlignLeft, 
    CheckCircle2, 
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../hooks/useGetCompanyById';


const CompanySetup = () => {
    const params = useParams();
    // Custom hook to fetch existing data so the fields aren't empty on load
    useGetCompanyById(params.id); 
    
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);

    // State Management
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    // Handle Text Inputs
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle File Input
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file });
    };

    // Form Submission - Added 'async' keyword
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Error updating company:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


   useEffect(() => {
    // Only update state if singleCompany actually has data
    // We check for 'description' specifically to ensure we have the FULL object
    if (singleCompany) {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null 
        });
    }
    // Log this to your browser console to see EXACTLY what is inside singleCompany
    console.log("Redux Data:", singleCompany);
}, [singleCompany]); 

    return (
        <div className='min-h-screen bg-[#f8fafc] pb-20'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 mt-12'>
                <div className='flex items-center justify-between mb-10'>
                    <button 
                        onClick={() => navigate("/admin/companies")}
                        className='flex items-center gap-2 text-slate-500 hover:text-[#4a3728] transition-all group'
                    >
                        <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
                        <span className='font-bold text-sm'>Back</span>
                    </button>
                    <div className='flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100'>
                        <CheckCircle2 className='w-4 h-4' />
                        <span className='text-xs font-bold uppercase tracking-widest'>Profile Settings</span>
                    </div>
                </div>

                <form onSubmit={submitHandler} className='bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden'>
                    <div className='bg-[#0f172a] p-10 text-white'>
                        <h1 className='text-3xl font-bold tracking-tight'>Company Configuration</h1>
                        <p className='text-slate-400 mt-2 text-sm'>Update your organization's identity and public presence.</p>
                    </div>

                    <div className='p-8 md:p-12'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                            <div className='space-y-8'>
                                <div className='group'>
                                    <Label className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 block">Company Name</Label>
                                    <div className='relative'>
                                        <Building2 className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#4a3728]' />
                                        <Input
                                            type="text"
                                            name="name"
                                            value={input.name}
                                            onChange={changeEventHandler}
                                            className="pl-12 bg-slate-50 border-none rounded-2xl py-7 text-base font-medium"
                                        />
                                    </div>
                                </div>
                                <div className='group'>
                                    <Label className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 block">Description</Label>
                                    <div className='relative'>
                                        <AlignLeft className='absolute left-4 top-5 w-4 h-4 text-slate-400' />
                                        <textarea
                                            name="description"
                                            value={input.description}
                                            onChange={changeEventHandler}
                                            rows={6}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-base font-medium focus:ring-2 focus:ring-[#4a3728]/10 outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-8'>
                                <div className='group'>
                                    <Label className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 block">Website</Label>
                                    <div className='relative'>
                                        <Globe className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                        <Input
                                            type="text"
                                            name="website"
                                            value={input.website}
                                            onChange={changeEventHandler}
                                            className="pl-12 bg-slate-50 border-none rounded-2xl py-7 text-base font-medium"
                                        />
                                    </div>
                                </div>
                                <div className='group'>
                                    <Label className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 block">Location</Label>
                                    <div className='relative'>
                                        <MapPin className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                        <Input
                                            type="text"
                                            name="location"
                                            value={input.location}
                                            onChange={changeEventHandler}
                                            className="pl-12 bg-slate-50 border-none rounded-2xl py-7 text-base font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 block">Logo</Label>
                                    <div className='group relative border-2 border-dashed border-slate-200 rounded-[2rem] p-8 bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer flex flex-col items-center justify-center'>
                                        <CloudUpload className='w-6 h-6 text-[#4a3728] mb-2' />
                                        <span className='text-sm font-bold text-slate-600 truncate max-w-[200px]'>
                                            {input.file ? (typeof input.file === 'string' ? "Logo Uploaded" : input.file.name) : "Upload Logo"}
                                        </span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={changeFileHandler} 
                                            className='absolute inset-0 opacity-0 cursor-pointer' 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12 pt-8 border-t border-slate-100 flex items-center justify-end gap-4'>
                            <Button 
                                type="button" 
                                variant="ghost" 
                                onClick={() => navigate("/admin/companies")}
                                className="rounded-xl px-8 font-bold text-slate-400"
                            >
                                Cancel
                            </Button>
                            {loading ? (
                                <Button disabled className="w-full md:w-48 h-12 rounded-xl bg-[#0f172a] text-white font-bold">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full md:w-48 h-12 rounded-xl bg-[#4a3728] hover:bg-[#36281d] text-white font-bold shadow-lg shadow-[#4a3728]/20">
                                    Update
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;