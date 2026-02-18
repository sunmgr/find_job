import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
    Loader2, 
    Briefcase, 
    MapPin, 
    DollarSign, 
    NotebookPen, 
    Sparkles, 
    AlignLeft, 
    Building2,
    Hash,
    Layers
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const PostJob = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "", // Matches backend: requirement (singular)
        salary: "",
        location: "",
        jobType: "", 
        experience: "",
        position: 0,
        companyId: ""
    });

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ 
            ...input, 
            [name]: name === "position" ? (value === "" ? 0 : Number(value)) : value 
        });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Frontend validation to prevent 400 errors
        if (!input.title || !input.description || !input.requirement || !input.salary || !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
            return toast.error("All fields are required to publish this opening.");
        }

        try {
            setLoading(true);

            // Payload matches the backend's destructuring perfectly
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (err) {
            console.error("Post Job Error:", err.response?.data);
            toast.error(err.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-[#fcfcfd] pb-20'>
            <Navbar />

            <div className='max-w-4xl mx-auto px-4 mt-12'>
                <div className='flex flex-col items-center mb-10 text-center'>
                    <div className='h-14 w-14 bg-[#f5f1ee] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[#e5e0dc]'>
                        <Briefcase className='text-[#4a3728] w-6 h-6' />
                    </div>
                    <h1 className='text-4xl font-black text-[#0f172a] tracking-tight'>
                        Publish <span className='text-[#4a3728]'>Opening</span>
                    </h1>
                    <p className='text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-3'>
                        Executive Recruitment Portal
                    </p>
                </div>

                <form onSubmit={submitHandler} className='space-y-8'>
                    
                    {/* SECTION 1: CORE DATA */}
                    <div className='bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm'>
                        <div className='flex items-center gap-3 mb-8 border-b border-slate-50 pb-5'>
                            <Sparkles className='w-5 h-5 text-[#4a3728]' />
                            <h2 className='font-black text-sm uppercase tracking-widest text-[#0f172a]'>General Intel</h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Job Title</Label>
                                <Input name="title" value={input.title} onChange={changeEventHandler} placeholder="e.g. Senior Developer" className="rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Job Type</Label>
                                <div className='relative'>
                                    <Layers className='absolute left-3 top-3.5 w-4 h-4 text-[#4a3728]' />
                                    <Input name="jobType" value={input.jobType} onChange={changeEventHandler} placeholder="Full-time, Remote..." className="pl-10 rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Location</Label>
                                <div className='relative'>
                                    <MapPin className='absolute left-3 top-3.5 w-4 h-4 text-[#4a3728]' />
                                    <Input name="location" value={input.location} onChange={changeEventHandler} placeholder="London, NY, Remote" className="pl-10 rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Salary (Number)</Label>
                                <div className='relative'>
                                    <DollarSign className='absolute left-3 top-3.5 w-4 h-4 text-[#4a3728]' />
                                    <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} placeholder="50000" className="pl-10 rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Experience Level</Label>
                                <div className='relative'>
                                    <NotebookPen className='absolute left-3 top-3.5 w-4 h-4 text-[#4a3728]' />
                                    <Input name="experience" value={input.experience} onChange={changeEventHandler} placeholder="2-3 Years" className="pl-10 rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Positions Available</Label>
                                <div className='relative'>
                                    <Hash className='absolute left-3 top-3.5 w-4 h-4 text-[#4a3728]' />
                                    <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="pl-10 rounded-xl border-slate-100 h-12 bg-slate-50/50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: TEXT CONTENT */}
                    <div className='bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm'>
                        <div className='flex items-center gap-3 mb-8 border-b border-slate-50 pb-5'>
                            <AlignLeft className='w-5 h-5 text-[#4a3728]' />
                            <h2 className='font-black text-sm uppercase tracking-widest text-[#0f172a]'>Role Details</h2>
                        </div>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Job Description</Label>
                                <textarea name="description" value={input.description} onChange={changeEventHandler} rows={4} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-sm outline-none focus:ring-2 focus:ring-[#4a3728]/20 transition-all resize-none" placeholder="Describe the role..." />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Requirements (Separate by commas)</Label>
                                <textarea name="requirement" value={input.requirement} onChange={changeEventHandler} rows={3} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-sm outline-none focus:ring-2 focus:ring-[#4a3728]/20 transition-all resize-none" placeholder="React, Node, Express..." />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: ORGANIZATION */}
                    <div className='bg-[#0f172a] rounded-[2.5rem] p-10 shadow-xl text-white'>
                        <div className='flex items-center justify-between mb-8'>
                            <div className='flex items-center gap-3'>
                                <Building2 className='w-5 h-5 text-[#4a3728]' />
                                <h2 className='font-black text-sm uppercase tracking-widest'>Select Company</h2>
                            </div>
                        </div>

                        {companies?.length > 0 ? (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full h-16 rounded-2xl border-white/10 bg-white/5 text-white focus:ring-[#4a3728]">
                                    <SelectValue placeholder="Choose an organization..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl bg-white">
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()} className="py-4 font-bold cursor-pointer">
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className='text-xs font-bold text-red-400 uppercase text-center tracking-widest'>Please register a company first.</p>
                        )}
                    </div>

                    <div className='pt-6'>
                        <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-[#4a3728] hover:bg-[#36281d] text-white font-black uppercase tracking-[0.3em] transition-all hover:-translate-y-1 active:scale-[0.98]">
                            {loading ? <Loader2 className='animate-spin' /> : "Publish Opportunity"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob;