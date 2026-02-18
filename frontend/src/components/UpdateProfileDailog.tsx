import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, UserCog } from 'lucide-react'
import {useDispatch, useSelector} from "react-redux"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from 'axios'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    
    const {user} = useSelector(store=>store.auth);

    const[input,setInput] = useState({
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
                skills: Array.isArray(user?.profile?.skills) ? user.profile.skills : [],
                file: user?.profile?.resume || null
            })
        }
    }, [open, user])

    const dispatch = useDispatch()


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Updated Data:", input);
        
        const formData = new FormData()
        formData.append("fullname",input.fullname)
        
        formData.append("phoneNumber",input.phoneNumber)
        
        formData.append("bio",input.bio)
        
        formData.append("skills",input.skills)

        if(input.file){
            formData.append("file",input.file)
        }
        try{
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success)
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                

        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
        setOpen(false)
        console.log(input)



    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="sm:max-w-[500px] bg-white rounded-[2.5rem] border-none p-0 overflow-hidden shadow-2xl" 
                onInteractOutside={() => setOpen(false)}
            >
                {/* Executive Header */}
                <div className="bg-[#0f172a] p-8 text-center relative">
                    <div className="bg-[#4a3728] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <UserCog className="text-white w-6 h-6" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-black tracking-tight text-center">
                            Edit Profile
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
                        Refine your professional identity
                    </p>
                </div>

                <form onSubmit={submitHandler} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} className="p-8">
                    <div className="grid gap-5">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right font-bold text-[#0f172a] text-xs uppercase">Name</Label>
                            <Input id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-3 rounded-xl border-slate-100 focus-visible:ring-[#4a3728]" />
                        </div>

                       

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right font-bold text-[#0f172a] text-xs uppercase">Phone</Label>
                            <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3 rounded-xl border-slate-100 focus-visible:ring-[#4a3728]" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right font-bold text-[#0f172a] text-xs uppercase">Bio</Label>
                            <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3 rounded-xl border-slate-100 focus-visible:ring-[#4a3728]" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right font-bold text-[#0f172a] text-xs uppercase">Skills</Label>
                            <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} placeholder="React, Node, etc." className="col-span-3 rounded-xl border-slate-100 focus-visible:ring-[#4a3728]" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right font-bold text-[#0f172a] text-xs uppercase">Resume</Label>
                            <div className="col-span-3">
                                <Input id="file" type="file" onChange={fileChangeHandler} className="cursor-pointer rounded-xl border-dashed border-2 border-slate-100 py-1" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-10">
                        {loading ? (
                            <Button className="w-full h-12 rounded-xl bg-[#0f172a] text-white font-bold cursor-not-allowed">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating Records...
                            </Button>
                        ) : (
                            <div className="flex w-full gap-3">
                                <Button type="button" onClick={() => setOpen(false)} variant="outline" className="w-1/3 h-12 rounded-xl font-bold text-slate-400">Cancel</Button>
                                <Button type="submit" className="w-2/3 h-12 rounded-xl bg-[#4a3728] hover:bg-[#36281d] text-white font-bold shadow-lg shadow-[#4a3728]/20 transition-all">
                                    Update Profile
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