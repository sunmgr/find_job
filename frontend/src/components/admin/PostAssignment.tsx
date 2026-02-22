import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
    Loader2, 
    Banknote, // Swapped for Rupee context
    Sparkles, 
    AlignLeft, 
    Building2,
    Hash,
    Zap,
    Target,
    Users
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { ASSIGNMENT_API_END_POINT } from '@/utils/constant'

const PostAssignment = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "", 
        budget: "", 
        position: 0,
        subjectId: ""
    });

    const { subjects } = useSelector(store => store.subject);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ 
            ...input, 
            [name]: name === "position" ? (value === "" ? 0 : Number(value)) : value 
        });
    };

    const selectChangeHandler = (value) => {
        const selectedSubject = subjects.find((subject) => subject.name.toLowerCase() === value);
        if (selectedSubject) {
            setInput({ ...input, subjectId: selectedSubject._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.title || !input.description || !input.requirement || !input.budget || !input.position || !input.subjectId) {
            return toast.error("Transmission Failed: All data fields must be populated.");
        }

        try {
            setLoading(true);
            const payload = {
                title: input.title,
                description: input.description,
                requirement: input.requirement,
                budget: Number(input.budget),
                position: Number(input.position),
                subject: input.subjectId 
            };

            const res = await axios.post(`${ASSIGNMENT_API_END_POINT}/post`, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success("Mission Encrypted and Published!");
                navigate("/admin/assignments");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Server Uplink Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-white pb-20 font-mono text-black'>
            <Navbar />

            <div className='max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12'>
                
                {/* LEFT: FORM AREA */}
                <div className='lg:col-span-2'>
                    <div className='flex items-center gap-4 mb-8'>
                        <div className='bg-codedex-yellow border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                            <Target size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h1 className='text-4xl font-[900] uppercase italic tracking-tighter leading-none'>
                                Create <span className='text-codedex-purple'>Mission</span>
                            </h1>
                            <p className='text-xs font-black uppercase tracking-widest text-slate-400 mt-1'>Command Center / Deployment</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-10'>
                        <div className='border-[4px] border-black p-8 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
                            <div className='absolute top-0 right-0 bg-black text-white px-4 py-1 font-black text-[10px] uppercase'>Core Intel</div>
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
                                <div className='md:col-span-2 space-y-2'>
                                    <Label className="font-black uppercase text-[11px] italic">Mission Designation (Title)</Label>
                                    <Input name="title" value={input.title} onChange={changeEventHandler} placeholder="e.g. OPERATION: ALPHA RESEARCH" className="rounded-none border-[3px] border-black h-12 text-sm font-bold uppercase placeholder:text-slate-300 focus-visible:ring-0 focus-visible:border-codedex-purple transition-all" />
                                </div>

                                <div className='space-y-2'>
                                    <Label className="font-black uppercase text-[11px] italic">Bounty (NPR / रू)</Label>
                                    <div className='relative'>
                                        {/* Icon Changed to Banknote */}
                                        <Banknote className='absolute left-3 top-3 w-5 h-5' strokeWidth={3} />
                                        <Input type="number" name="budget" value={input.budget} onChange={changeEventHandler} placeholder="5000" className="pl-10 rounded-none border-[3px] border-black h-12 font-bold focus-visible:ring-0" />
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <Label className="font-black uppercase text-[11px] italic">Operative Capacity</Label>
                                    <div className='relative'>
                                        <Hash className='absolute left-3 top-3 w-5 h-5' strokeWidth={3} />
                                        <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="pl-10 rounded-none border-[3px] border-black h-12 font-bold focus-visible:ring-0" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border-[4px] border-black p-8 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'>
                            <div className='absolute top-0 right-0 bg-black text-white px-4 py-1 font-black text-[10px] uppercase'>Briefing</div>
                            <div className='space-y-6 mt-4'>
                                <div className='space-y-2'>
                                    <Label className="font-black uppercase text-[11px] italic">Objective (Description)</Label>
                                    <textarea name="description" value={input.description} onChange={changeEventHandler} rows={4} className="w-full rounded-none border-[3px] border-black p-4 text-sm font-bold outline-none focus:bg-slate-50 transition-all resize-none" placeholder="Provide clear mission objectives..." />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="font-black uppercase text-[11px] italic">Specialized Tech (Requirements)</Label>
                                    <textarea name="requirement" value={input.requirement} onChange={changeEventHandler} rows={2} className="w-full rounded-none border-[3px] border-black p-4 text-sm font-bold outline-none focus:bg-slate-50 transition-all resize-none" placeholder="React, Node.js, Quantum Physics..." />
                                </div>
                            </div>
                        </div>

                        <div className='bg-black p-8 shadow-[10px_10px_0px_0px_rgba(168,85,247,1)]'>
                            <div className='flex items-center gap-3 mb-6'>
                                <Building2 className='text-codedex-purple' strokeWidth={3} />
                                <h2 className='text-white font-black uppercase italic tracking-tighter text-xl'>Assign Jurisdiction</h2>
                            </div>

                            {subjects?.length > 0 ? (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full h-14 rounded-none border-[3px] border-white bg-transparent text-white font-black uppercase italic tracking-widest focus:ring-0">
                                        <SelectValue placeholder="Identify Subject..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none border-[3px] border-black bg-white">
                                        <SelectGroup>
                                            {subjects.map((subject) => (
                                                <SelectItem key={subject._id} value={subject?.name?.toLowerCase()} className="py-3 font-black uppercase italic cursor-pointer hover:bg-codedex-yellow transition-colors">
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className='p-4 border-2 border-dashed border-red-500 text-red-500 font-black text-center text-[10px] uppercase'>Critical Error: No Subjects Detected</div>
                            )}
                        </div>

                        <Button type="submit" disabled={loading} className="w-full h-20 rounded-none bg-codedex-purple border-[4px] border-black text-white font-[900] uppercase italic text-2xl tracking-tighter shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-black transition-all">
                            {loading ? <Loader2 className='animate-spin' /> : <div className='flex items-center gap-3'><Zap fill="white" /> Authorize Deployment</div>}
                        </Button>
                    </form>
                </div>

                {/* RIGHT: LIVE PREVIEW (RUPEE VERSION) */}
                <div className='hidden lg:block'>
                   <div className='sticky top-10 space-y-4'>
                        <h3 className='font-black uppercase text-[10px] tracking-[0.3em] text-slate-400'>Mission Preview (Live)</h3>
                        
                        <div className='p-6 bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(168,85,247,1)] transition-all'>
                            <div className='flex justify-between items-start mb-6'>
                                <div className='bg-codedex-yellow border-[2px] border-black px-3 py-1 text-[10px] font-black uppercase italic'>
                                    {subjects?.find(s => s._id === input.subjectId)?.name || "Unassigned"}
                                </div>
                                <Target size={20} />
                            </div>

                            <h2 className='text-2xl font-[900] uppercase italic tracking-tighter leading-tight mb-4 break-words'>
                                {input.title || "Mission Title..."}
                            </h2>

                            <p className='text-[11px] font-bold text-slate-600 line-clamp-3 mb-6 min-h-[40px]'>
                                {input.description || "The mission objective will appear here..."}
                            </p>

                            <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t-[3px] border-black'>
                                {/* Rupee Symbol રૂ Added Below */}
                                <div className='bg-black text-white px-2 py-1 text-[10px] font-black flex items-center gap-1'>
                                    रू {input.budget || "0"}
                                </div>
                                <div className='bg-codedex-purple text-white px-2 py-1 text-[10px] font-black flex items-center gap-1'>
                                    <Users size={10} strokeWidth={4} /> {input.position || "0"} OPENINGS
                                </div>
                            </div>
                        </div>

                        <div className='bg-slate-50 border-2 border-dashed border-slate-200 p-4 text-center'>
                            <p className='text-[9px] font-black uppercase text-slate-400 tracking-widest leading-relaxed'>
                                Status: {loading ? "Uploading to Satellite..." : "Awaiting Authorization"}
                            </p>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default PostAssignment;