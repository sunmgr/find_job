import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "@/redux/authSlice";
import { Loader2, LockKeyhole } from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);
    const {user} = useSelector((store)=>store.auth)

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/");

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, []);

    return (
        <div className="bg-[#fcfcfd] min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center px-4 mt-20">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                    {/* Form Header */}
                    <div className="bg-[#0f172a] p-8 text-center">
                        <div className="bg-[#4a3728] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <LockKeyhole className="text-white w-6 h-6" />
                        </div>
                        <h1 className="font-black text-2xl text-white tracking-tight">Welcome Back</h1>
                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 font-bold">Secure Login Portal</p>
                    </div>

                    <div className="p-8">
                        {/* Email Input */}
                        <div className="mb-4">
                            <Label className="text-[#0f172a] font-bold text-sm ml-1">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="sunash@gmail.com"
                                className="mt-2 rounded-xl border-slate-200 focus:ring-[#4a3728] h-12 font-medium"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <Label className="text-[#0f172a] font-bold text-sm ml-1">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="mt-2 rounded-xl border-slate-200 focus:ring-[#4a3728] h-12 font-medium"
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="my-6">
                            <Label className="text-[#0f172a] font-bold text-sm ml-1">Login As</Label>
                            <RadioGroup className="flex items-center gap-6 mt-3 ml-1">
                                <div className="flex items-center space-x-2 group cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === "student"}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4 cursor-pointer accent-[#4a3728]"
                                        id="student"
                                    />
                                    <Label htmlFor="student" className="text-slate-500 font-bold group-hover:text-[#0f172a] cursor-pointer">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2 group cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === "recruiter"}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4 cursor-pointer accent-[#4a3728]"
                                        id="recruiter"
                                    />
                                    <Label htmlFor="recruiter" className="text-slate-500 font-bold group-hover:text-[#0f172a] cursor-pointer">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button className="w-full h-12 rounded-xl bg-[#0f172a] text-white font-bold cursor-not-allowed">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Authenticating...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-[#4a3728] hover:bg-[#36281d] text-white font-bold shadow-lg shadow-[#4a3728]/20 transition-all active:scale-95"
                            >
                                Sign In
                            </Button>
                        )}

                        <div className="mt-8 text-center">
                            <span className="text-sm text-slate-500 font-medium">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-[#4a3728] font-bold hover:underline underline-offset-4">
                                    Create Account
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