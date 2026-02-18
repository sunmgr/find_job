import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        {/* Logo Section */}
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-[#0f172a]">
            <Link to="/">
              Job <span className="text-[#4a3728]">Portal</span>
            </Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <ul className="hidden md:flex font-bold text-sm uppercase tracking-widest items-center gap-8 text-slate-500">
            {user && user.role == "recruiter" ? (
              <>
                <li className="hover:text-[#4a3728] transition-colors cursor-pointer text-[#0f172a]">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#4a3728] transition-colors cursor-pointer">
                  <Link to="/admin/companies">Company</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#4a3728] transition-colors cursor-pointer text-[#0f172a]">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#4a3728] transition-colors cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="font-bold text-[#0f172a]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#4a3728] hover:bg-[#36281d] text-white rounded-xl px-6 shadow-lg shadow-[#4a3728]/20 transition-all">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="p-1 border-2 border-slate-100 rounded-full cursor-pointer hover:border-[#4a3728] transition-all">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-slate-200">
    <User2 className="text-slate-500" />
  </AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 p-0 border-none shadow-2xl rounded-2xl overflow-hidden">
                {/* Profile Header */}
                <div className="bg-[#0f172a] p-6 text-white">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-[#4a3728]">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-slate-200">
    <User2 className="text-slate-500" />
  </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg leading-none">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-tight font-medium">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="p-4 bg-white">
                  <div className="flex flex-col gap-1">
                    {
                      user && user.role === "student" && (
                        <Link
                      to="/profile"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#0f172a] transition-all group"
                    >
                      <User2 className="w-5 h-5 group-hover:text-[#4a3728]" />
                      <span className="font-semibold text-sm">
                        View Profile
                      </span>
                    </Link>)
                    }

                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all group cursor-pointer border-none bg-transparent"
                    >
                      <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-semibold text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
