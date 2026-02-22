import React, { useState, useEffect } from 'react'
import { 
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle,
    DialogDescription // Added this
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, UserCog, Sparkles } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from 'axios'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: '',
        phoneNumber: '',
        bio: '',
        skills: '',
        file: null
    })

    useEffect(() => {
        if (open) {
            setInput({
                fullname: user?.fullname || '',
                phoneNumber: user?.phoneNumber || '',
                bio: user?.profile?.bio || '',
                skills: user?.profile?.skills?.join(', ') || '',
                file: null 
            })
        }
    }, [open, user])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)

        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false) 
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="sm:max-w-[500px] bg-white border-[4px] border-black p-0 rounded-none shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]" 
                onInteractOutside={() => setOpen(false)}
            >
                {/* Brutalist Header */}
                <div className="bg-codedex-purple p-8 border-b-[4px] border-black relative overflow-hidden">
                    <div className="absolute top-[-10px] right-[-10px] opacity-10 rotate-12">
                        <UserCog size={120} />
                    </div>
                    <div className="bg-white border-[3px] border-black w-14 h-14 flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles className="text-black w-8 h-8" strokeWidth={3} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-white text-3xl font-[900] italic uppercase tracking-tighter">
                            Update <span className="text-codedex-yellow">Identity</span>
                        </DialogTitle>
                        {/* ACCESSIBILITY FIX: Adding Description to satisfy Radix UI requirements */}
                        <DialogDescription className="text-codedex-yellow/80 text-[10px] font-bold uppercase tracking-widest mt-2">
                            Modify your hero stats and public records.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={submitHandler} className="p-8 font-mono space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Real Name</Label>
                            <Input name="fullname" value={input.fullname} onChange={changeEventHandler} className="rounded-none border-[3px] border-black focus-visible:ring-0 focus-visible:bg-codedex-cream transition-colors font-bold" />
                        </div>

                        <div className="space-y-1">
                            <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Contact Number</Label>
                            <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="rounded-none border-[3px] border-black focus-visible:ring-0 focus-visible:bg-codedex-cream transition-colors font-bold" />
                        </div>

                        <div className="space-y-1">
                            <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Short Bio</Label>
                            <Input name="bio" value={input.bio} onChange={changeEventHandler} className="rounded-none border-[3px] border-black focus-visible:ring-0 focus-visible:bg-codedex-cream transition-colors font-bold" />
                        </div>

                        <div className="space-y-1">
                            <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Skills (Comma Separated)</Label>
                            <Input name="skills" value={input.skills} onChange={changeEventHandler} placeholder="React, Python, Archery" className="rounded-none border-[3px] border-black focus-visible:ring-0 focus-visible:bg-codedex-cream transition-colors font-bold placeholder:opacity-30" />
                        </div>

                        <div className="space-y-1">
                            <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">Heroic Artifact (Resume)</Label>
                            <div className="relative group">
                                <Input type="file" onChange={fileChangeHandler} className="cursor-pointer rounded-none border-[3px] border-black border-dashed py-2 h-auto hover:bg-slate-50 transition-all" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        {loading ? (
                            <Button disabled className="w-full h-12 rounded-none bg-black text-white font-[900] uppercase italic">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" strokeWidth={3} /> Syncing...
                            </Button>
                        ) : (
                            <div className="flex w-full gap-4">
                                <Button type="button" onClick={() => setOpen(false)} variant="outline" className="flex-1 h-12 rounded-none border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">Abort</Button>
                                <Button type="submit" className="flex-[2] h-12 rounded-none bg-codedex-purple border-[3px] border-black text-white font-[900] uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    Commit
                                </Button>
                            </div>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;