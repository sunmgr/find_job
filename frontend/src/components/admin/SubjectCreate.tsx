import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Sparkles, Loader2, ShieldAlert } from 'lucide-react';
import { SUBJECT_API_END_POINT } from '../../utils/constant';
import { setSingleSubject } from '../../redux/subjectSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const SubjectCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [subjectName, setsubjectName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewSubject = async (e) => {
        e?.preventDefault(); 
        if (!subjectName.trim()) {
            toast.error("A name is required to manifest this domain.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${SUBJECT_API_END_POINT}/register`, { subjectName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                toast.success("Domain Manifested Successfully");
                dispatch(setSingleSubject(res.data.subject));
                const subjectId = res.data.subject._id;
                navigate(`/admin/subjects/${subjectId}`);
            }
        } catch (error) {
            console.error("Registration Error:", error);
            const errorMessage = error.response?.data?.message || "Failed to manifest domain";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-codedex-cream font-mono text-black">
            <Navbar />
            
            <div className='max-w-4xl mx-auto px-6 py-16'>
                {/* Back Command */}
                <button 
                    type="button"
                    disabled={loading}
                    onClick={() => navigate("/admin/subjects")}
                    className='flex items-center gap-2 text-black hover:text-codedex-purple transition-all mb-12 group disabled:opacity-50'
                >
                    <ArrowLeft className='w-5 h-5 group-hover:-translate-x-2 transition-transform' strokeWidth={3} />
                    <span className='font-black uppercase italic tracking-tighter'>Abort Manifestation</span>
                </button>

                {/* Vanguard Header */}
                <div className='mb-12 space-y-4'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(110,68,255,1)] mb-4'>
                        <Target className='w-8 h-8 text-codedex-yellow' strokeWidth={3} />
                    </div>
                    <h1 className='text-6xl font-[1000] text-black uppercase italic tracking-tighter leading-none'>
                        Manifest <span className='text-codedex-purple'>New Domain</span>
                    </h1>
                    <p className='text-slate-600 font-bold uppercase text-xs tracking-[0.2em]'>
                        Initialize a new territory for Hero recruitment.
                    </p>
                </div>

                {/* Input Ritual Card */}
                <form 
                    onSubmit={registerNewSubject} 
                    className='bg-white p-10 border-[4px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]'
                >
                    <div className='space-y-8'>
                        <div className="space-y-4">
                            <Label htmlFor="subject" className="text-black font-[1000] block text-xs uppercase tracking-[0.2em]">
                                Domain Designation (Name)
                            </Label>
                            <Input
                                id="subject"
                                type="text"
                                disabled={loading}
                                autoFocus
                                value={subjectName}
                                onChange={(e) => setsubjectName(e.target.value)}
                                className="bg-codedex-cream border-[3px] border-black py-8 rounded-none focus-visible:ring-0 focus-visible:border-codedex-purple transition-all text-2xl font-black italic uppercase placeholder:text-slate-300 placeholder:italic"
                                placeholder="E.G. TITAN_INDUSTRIES"
                            />
                        </div>

                        {/* Tip Box: Re-themed to "Intelligence" */}
                        <div className='flex gap-4 p-5 bg-black text-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] inset-shadow-sm'>
                            <ShieldAlert className='w-6 h-6 text-codedex-yellow shrink-0' strokeWidth={3} />
                            <div className="space-y-1">
                                <p className='text-[10px] font-black uppercase tracking-widest text-codedex-purple'>Vanguard_Intelligence_Note</p>
                                <p className='text-sm font-bold italic leading-tight'>
                                    Once initialized, heroes will see this domain on the quest board. Choose a name that commands respect.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row items-center gap-6 pt-6'>
                            <Button 
                                type="submit"
                                disabled={loading || !subjectName.trim()}
                                className="w-full sm:w-auto bg-codedex-yellow hover:bg-black hover:text-white text-black border-[4px] border-black rounded-none px-12 py-8 h-auto font-[1000] text-xl uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className='flex items-center gap-3'>
                                        <Loader2 className='h-6 w-6 animate-spin' strokeWidth={3} />
                                        <span>Initializing...</span>
                                    </div>
                                ) : (
                                    "Continue to Setup"
                                )}
                            </Button>

                            <button 
                                type="button"
                                onClick={() => navigate("/admin/subjects")}
                                className="font-black uppercase text-xs tracking-widest hover:underline decoration-black decoration-2 underline-offset-4"
                            >
                                Cancel_Request
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubjectCreate;