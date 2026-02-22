import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { 
    ArrowLeft, 
    CloudUpload, 
    Target,
    ShieldCheck,
    AlignLeft, 
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { SUBJECT_API_END_POINT } from '../../utils/constant';
import { useSelector } from 'react-redux';
import useGetSubjectById from '../hooks/useGetSubjectById';

const SubjectSetup = () => {
    const params = useParams();
    useGetSubjectById(params.id); 
    
    const navigate = useNavigate();
    const { singleSubject } = useSelector(store => store.subject);
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        name: "",
        description: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${SUBJECT_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success("Domain Protocol Updated");
                navigate("/admin/subjects");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Protocol update failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleSubject) {
            setInput({
                name: singleSubject.name || "",
                description: singleSubject.description || "",
                file: null 
            });
        }
    }, [singleSubject]);

    return (
        <div className='min-h-screen bg-codedex-cream font-mono text-black pb-20'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 mt-12'>
                
                {/* Header Navigation */}
                <div className='flex items-center justify-between mb-10'>
                    <button 
                        onClick={() => navigate("/admin/subjects")}
                        className='flex items-center gap-2 text-black hover:text-codedex-purple transition-all group'
                    >
                        <ArrowLeft className='w-5 h-5 group-hover:-translate-x-2 transition-transform' strokeWidth={3} />
                        <span className='font-black uppercase italic tracking-tighter'>Exit Configuration</span>
                    </button>
                    <div className='flex items-center gap-2 px-4 py-1.5 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(110,68,255,1)]'>
                        <ShieldCheck className='w-4 h-4 text-codedex-yellow' />
                        <span className='text-[10px] font-black uppercase tracking-widest'>Auth_Level: Vanguard</span>
                    </div>
                </div>

                {/* Main Configuration Form */}
                <form onSubmit={submitHandler} className='bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                    <div className='bg-black p-8 text-white border-b-[4px] border-black flex items-center gap-4'>
                        <div className="p-3 bg-codedex-purple border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className='text-3xl font-[1000] uppercase italic tracking-tighter'>Domain_Registry_Setup</h1>
                            <p className='text-codedex-purple font-bold text-[10px] uppercase tracking-[0.2em]'>Subject_ID: {params.id}</p>
                        </div>
                    </div>

                    <div className='p-8 md:p-12 space-y-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                            
                            {/* Left Column: Text Data */}
                            <div className='space-y-8'>
                                <div className='space-y-3'>
                                    <Label className="font-[1000] text-black text-xs uppercase tracking-widest block">Domain Designation</Label>
                                    <div className='relative'>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={input.name}
                                            readOnly // Kept read-only as per "pre-filled" requirement
                                            className="bg-slate-100 border-[3px] border-black py-7 text-lg font-black italic uppercase cursor-not-allowed opacity-70"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">LOCKED</span>
                                    </div>
                                </div>

                                <div className='space-y-3'>
                                    <Label className="font-[1000] text-black text-xs uppercase tracking-widest block">Operational Brief (Description)</Label>
                                    <div className='relative'>
                                        <textarea
                                            name="description"
                                            value={input.description}
                                            onChange={changeEventHandler}
                                            rows={6}
                                            placeholder="Describe the challenges and rewards of this domain..."
                                            className="w-full p-4 bg-codedex-cream border-[3px] border-black font-bold text-base focus:ring-0 focus:border-codedex-purple outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Visual Identity */}
                            <div className='flex flex-col justify-center items-center space-y-6 bg-slate-50 border-[3px] border-dashed border-slate-300 p-8'>
                                <Label className="font-[1000] text-black text-xs uppercase tracking-widest">Domain Sigil (Logo)</Label>
                                <div className='relative w-full aspect-square max-w-[200px] border-[4px] border-black bg-white flex flex-col items-center justify-center group cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all'>
                                    {input.file ? (
                                         <div className="text-center p-4">
                                            <ShieldCheck className="w-12 h-12 text-codedex-purple mx-auto mb-2" />
                                            <p className="text-[10px] font-black uppercase break-all">{typeof input.file === 'string' ? "Existing_Sigil" : input.file.name}</p>
                                         </div>
                                    ) : (
                                        <>
                                            <CloudUpload className='w-10 h-10 text-black mb-2' strokeWidth={3} />
                                            <span className='text-[10px] font-black uppercase tracking-tighter'>Upload_Sigil</span>
                                        </>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={changeFileHandler} 
                                        className='absolute inset-0 opacity-0 cursor-pointer' 
                                    />
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest">Supports: PNG, JPG (Max 2MB)</p>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className='pt-8 border-t-[3px] border-black flex items-center justify-end gap-6'>
                            <button 
                                type="button" 
                                onClick={() => navigate("/admin/subjects")}
                                className="font-black uppercase text-xs tracking-widest hover:text-codedex-purple transition-colors"
                            >
                                Discard_Changes
                            </button>
                            
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="bg-codedex-yellow hover:bg-black hover:text-white text-black border-[4px] border-black rounded-none px-12 py-8 h-auto font-[1000] text-xl uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className='flex items-center gap-2'>
                                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={3} /> 
                                        <span>Syncing...</span>
                                    </div>
                                ) : (
                                    "Confirm Registry"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubjectSetup;