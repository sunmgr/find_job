import React, { useState } from 'react';
import { 
  Menu, X, Zap, Compass, Sword, Trophy, 
  UserCircle, LogOut, User, LayoutGrid, PlusSquare 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice'; 
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-codedex-cream border-b-[4px] border-black px-6 py-3 sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-codedex-yellow border-[3px] border-black p-2 shadow-brutal">
              <Zap size={24} fill="black" strokeWidth={3} />
            </div>
            <span className="font-extrabold text-3xl tracking-tighter uppercase italic">
              STUDY<span className="text-codedex-purple">GIG</span>
            </span>
          </Link>
        </div>

        {/* Desktop Links - DYNAMIC BASED ON ROLE */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-6">
            {user && user.role === 'recruiter' ? (
              /* --- QUEST GIVER (Recruiter) LINKS --- */
              <>
                <NavLink href="/admin/subjects" icon={<LayoutGrid size={18} />} label="Domains" />
                <NavLink href="/admin/assignments" icon={<PlusSquare size={18} />} label="Create Quest" />
                <NavLink href="/leaderboard" icon={<Trophy size={18} />} label="Top Heroes" />
              </>
            ) : (
              /* --- SOLVER (Student) / GUEST LINKS --- */
              <>
                <NavLink href="/browse" icon={<Compass size={18} />} label="Quests" />
                <NavLink href="/battles" icon={<Sword size={18} />} label="Battles" />
                <NavLink href="/leaderboard" icon={<Trophy size={18} />} label="Heroes" />
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4 border-l-[3px] border-black pl-8 relative">
            {!user ? (
              <div className='flex items-center gap-4'>
                <Link to="/login" className="font-black uppercase text-xs hover:text-codedex-purple">Login</Link>
                <Link to="/signup">
                  <button className="bg-black text-white px-6 py-2.5 font-extrabold uppercase border-[3px] border-black shadow-brutal hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer">
                    Join Guild
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* Avatar Trigger */}
                <div 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`cursor-pointer border-[3px] border-black p-1 shadow-brutal active:shadow-none transition-all hover:text-white ${
                    user.role === 'recruiter' ? 'bg-codedex-purple hover:bg-black' : 'bg-codedex-yellow hover:bg-codedex-purple'
                  }`}
                >
                  <UserCircle size={28} strokeWidth={2.5} />
                </div>

                {/* POP-OFF MENU */}
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                    <div className="absolute right-0 mt-4 w-64 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20 p-4">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-slate-100">
                        <div className="bg-black text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(110,68,255,1)]">
                           <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black uppercase text-sm truncate">{user.fullname}</p>
                          <p className={`text-[10px] font-black uppercase tracking-tighter italic ${user.role === 'recruiter' ? 'text-codedex-purple' : 'text-emerald-600'}`}>
                            {user.role === 'recruiter' ? '◈ Vanguard (Quest Giver)' : '⚔ Solver (Hero)'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link 
                          to="/profile" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 p-2 font-bold uppercase text-xs hover:bg-codedex-yellow border-2 border-transparent hover:border-black transition-all"
                        >
                          <UserCircle size={18} /> View Profile
                        </Link>
                        
                        <button 
                          onClick={logoutHandler}
                          className="flex items-center gap-3 p-2 font-bold uppercase text-xs text-red-500 hover:bg-red-50 border-2 border-transparent hover:border-red-500 transition-all text-left"
                        >
                          <LogOut size={18} /> Abandon Quest
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, icon, label }) => (
  <Link to={href} className="flex items-center gap-2 font-extrabold uppercase text-[12px] group transition-colors hover:text-codedex-purple">
    <span className="p-1 border-2 border-transparent group-hover:border-black group-hover:bg-white group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
      {icon}
    </span>
    {label}
  </Link>
);

export default Navbar;