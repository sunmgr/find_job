import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice"
import { Loader2, UserPlus } from "lucide-react";
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
    const { loading } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
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
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
    const {user} = useSelector((store)=>store.auth)
    useEffect(() => {
            if(user){
                navigate("/")
            }
        }, []);
    

    return (
        <div className="bg-[#fcfcfd] min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-12 max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-xl bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-[#0f172a] p-8 text-center">
                        <div className="bg-[#4a3728] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <UserPlus className="text-white w-6 h-6" />
                        </div>
                        <h1 className="font-black text-2xl text-white tracking-tight">Join the Network</h1>
                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 font-bold">Create your executive profile</p>
                    </div>

                    <div className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[#0f172a] font-bold text-sm ml-1">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Sunash Magar"
                                    className="rounded-xl border-slate-200 focus:ring-[#4a3728] h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[#0f172a] font-bold text-sm ml-1">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="sunash@gmail.com"
                                    className="rounded-xl border-slate-200 focus:ring-[#4a3728] h-11"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                                <Label className="text-[#0f172a] font-bold text-sm ml-1">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="+977 98..."
                                    className="rounded-xl border-slate-200 focus:ring-[#4a3728] h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[#0f172a] font-bold text-sm ml-1">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="rounded-xl border-slate-200 focus:ring-[#4a3728] h-11"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 my-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex items-center space-x-2 group">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === "student"}
                                        onChange={changeEventHandler}
                                        className="accent-[#4a3728] w-4 h-4 cursor-pointer"
                                        id="student"
                                    />
                                    <Label htmlFor="student" className="text-slate-600 font-bold group-hover:text-[#0f172a] cursor-pointer">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2 group">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === "recruiter"}
                                        onChange={changeEventHandler}
                                        className="accent-[#4a3728] w-4 h-4 cursor-pointer"
                                        id="recruiter"
                                    />
                                    <Label htmlFor="recruiter" className="text-slate-600 font-bold group-hover:text-[#0f172a] cursor-pointer">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            <div className="flex flex-col gap-2">
                                <Label className="text-[#0f172a] font-bold text-xs uppercase tracking-tight">Profile Picture</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer border-none bg-transparent h-auto p-0 text-xs text-[#4a3728] font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#f5f1ee] file:text-[#4a3728] hover:file:bg-[#4a3728] hover:file:text-white transition-all"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <Button className="w-full h-12 rounded-xl bg-[#0f172a] text-white font-bold cursor-not-allowed">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing Registration...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-[#4a3728] hover:bg-[#36281d] text-white font-bold shadow-lg shadow-[#4a3728]/20 transition-all active:scale-95"
                            >
                                Create Account
                            </Button>
                        )}

                        <div className="mt-8 text-center">
                            <span className="text-sm text-slate-500 font-medium">
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#4a3728] font-bold hover:underline underline-offset-4">
                                    Login
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