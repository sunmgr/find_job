import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2, UserPlus, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.role) {
            return toast.error("Please select a role (Student or Recruiter)");
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-codedex-cream min-h-screen font-mono">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-16 max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-2xl bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                >
                    {/* Header: Codedex Adventure Style */}
                    <div className="bg-codedex-purple p-8 border-b-[4px] border-black text-center relative">
                        <div className="bg-codedex-yellow border-[3px] border-black w-16 h-16 flex items-center justify-center mx-auto mb-4 -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <UserPlus className="text-black w-8 h-8" strokeWidth={3} />
                        </div>
                        <h1 className="font-[900] text-4xl text-white italic uppercase tracking-tighter">
                            New Hero <span className="text-codedex-yellow">Registration</span>
                        </h1>
                        <p className="text-white/80 text-[11px] uppercase tracking-[0.3em] mt-3 font-black">
                            Choose your path and join the nexus
                        </p>
                    </div>

                    <div className="p-8 md:p-12 space-y-8">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="E.g. Sunash Magar"
                                    className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold text-sm bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="hero@studygig.com"
                                    className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold text-sm bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone and Password Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="98XXXXXXXX"
                                    className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold text-sm bg-slate-50"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-black font-black uppercase text-xs tracking-[0.2em]">Secret Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="rounded-none border-[3px] border-black focus-visible:ring-0 focus:border-codedex-purple h-12 font-bold text-sm bg-slate-50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Selection & File Upload: Brutalist Card */}
                        <div className="p-6 border-[3px] border-black bg-codedex-cream space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-3">
                                    <Label className="text-black font-black uppercase text-[10px] tracking-widest">Select Your Class</Label>
                                    <div className="flex gap-8">
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

                                <div className="space-y-3 w-full md:w-64">
                                    <Label className="text-black font-black uppercase text-[10px] tracking-widest">Avatar Artifact (Image)</Label>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="cursor-pointer border-[2px] border-black bg-white h-10 text-[10px] font-bold file:bg-black file:text-white file:font-black file:uppercase file:px-4 file:h-full file:mr-4 hover:file:bg-codedex-purple transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button className="w-full h-16 rounded-none bg-slate-300 text-black border-[3px] border-black font-[900] uppercase italic cursor-not-allowed">
                                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                Forging Your Identity...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-16 rounded-none bg-codedex-yellow hover:bg-black hover:text-white text-black font-[900] uppercase italic tracking-widest text-lg border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-3 group"
                            >
                                Start Journey <Sparkles className="group-hover:rotate-12 transition-transform" />
                            </Button>
                        )}

                        <div className="text-center pt-4">
                            <span className="text-xs text-slate-500 font-black uppercase tracking-[0.2em]">
                                Already a Hero?{" "}
                                <Link to="/login" className="text-codedex-purple hover:text-black underline decoration-[3px] underline-offset-8 transition-all">
                                    Login to Nexus
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;