import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, LockKeyhole, Sparkles } from "lucide-react";

const Login = () => {
    // 1. STATE LOGIC: Set up your input state here
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);

    // 2. CHANGE HANDLER LOGIC: Implement how inputs update the state
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    };

    // 3. SUBMIT LOGIC: Handle API call, Redux dispatch, and Navigation
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);

        try{
            dispatch(setLoading(true))

            const res = await axios.post(`${USER_API_END_POINT}/login`,formData,{headers:{"Content-Type":"application/json"},withCredentials:true})

            if(res.data.success){
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
                navigate("/")
            }

        }catch(error){
            console.log(error)
            toast.error(error.response?.data?.message || "Login failed!")
        }finally{
            dispatch(setLoading(false))
        }
    };

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user,navigate]); 

    return (
        <div className="bg-codedex-cream min-h-screen font-mono">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-20 max-w-7xl mx-auto">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-lg bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                >
                    {/* Header Card */}
                    <div className="bg-codedex-yellow p-8 border-b-[4px] border-black text-center relative">
                        <div className="bg-white border-[3px] border-black w-16 h-16 flex items-center justify-center mx-auto mb-4 rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <LockKeyhole className="text-black w-8 h-8" strokeWidth={3} />
                        </div>
                        <h1 className="font-[900] text-4xl text-black italic uppercase tracking-tighter">
                            Hero <span className="text-codedex-purple">Login</span>
                        </h1>
                        <p className="text-black/60 text-[11px] uppercase tracking-[0.2em] mt-3 font-black">
                            Unlock the nexus gate
                        </p>
                    </div>

                    <div className="p-10 space-y-8">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="hero@studygig.com"
                                className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Secret Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                            />
                        </div>

                        {/* Role Selection Card */}
                        <div className="p-6 border-[3px] border-black bg-codedex-cream shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                             <Label className="text-black font-black uppercase text-[10px] tracking-widest block mb-4">Identify Your Class</Label>
                             <div className="flex gap-10">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="radio" name="role" value="student" 
                                        checked={input.role === "student"} onChange={changeEventHandler}
                                        className="w-5 h-5 accent-codedex-purple cursor-pointer" 
                                    />
                                    <span className="font-black uppercase text-xs group-hover:text-codedex-purple transition-colors">Student</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="radio" name="role" value="recruiter" 
                                        checked={input.role === "recruiter"} onChange={changeEventHandler}
                                        className="w-5 h-5 accent-codedex-purple cursor-pointer" 
                                    />
                                    <span className="font-black uppercase text-xs group-hover:text-codedex-purple transition-colors">Recruiter</span>
                                </label>
                            </div>
                        </div>

                        {/* Action Button */}
                        {loading ? (
                            <Button className="w-full h-16 rounded-none bg-slate-300 text-black border-[3px] border-black font-[900] uppercase italic cursor-not-allowed">
                                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                Authenticating...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-16 rounded-none bg-codedex-purple hover:bg-black text-white font-[900] uppercase italic tracking-widest text-lg border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-3 group"
                            >
                                Enter Nexus <Sparkles className="group-hover:scale-125 transition-transform" />
                            </Button>
                        )}

                        <div className="text-center pt-4">
                            <span className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                First time here?{" "}
                                <Link to="/signup" className="text-codedex-purple hover:text-black underline decoration-[3px] underline-offset-8 transition-all">
                                    Create New Identity
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;