import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge.js";
import { Button } from "./ui/button.js";
import {
  Calendar,
  BookOpen,
  CircleDollarSign,
  Users,
  ArrowLeft,
  UserCircle,
  Loader2,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleAssignment } from "@/redux/assignmentSlice";
import { ASSIGNMENT_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { daysAgoFunction } from "../utils/daysAgoFunction.js";
import { toast } from "sonner";

const AssignmentDescription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: assignmentId } = useParams();

  const { user } = useSelector((store) => store.auth);
  const { singleAssignment, allAssignments } = useSelector((store) => store.assignment);

  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (singleAssignment && user) {
      const hasApplied = (singleAssignment?.applications || []).some((app) => {
        const applicantId = app.applicant?._id || app.applicant || app;
        return applicantId?.toString() === user?._id?.toString();
      });
      setIsApplied(hasApplied);
    }
  }, [singleAssignment, user]);

  useEffect(() => {
    const fetchSingleAssignment = async () => {
      try {
        const cached = allAssignments?.find((j) => j._id === assignmentId);
        if (cached) {
          dispatch(setSingleAssignment(cached));
        }
        
        const res = await axios.get(`${ASSIGNMENT_API_END_POINT}/get/${assignmentId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleAssignment(res.data.assignment));
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleAssignment();
  }, [assignmentId, dispatch, allAssignments]);

  const applyAssignmentHandler = async () => {
    if (!user) {
      toast.error("Identity unknown! Please login.");
      return navigate("/login");
    }
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${assignmentId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Assignment Locked In!");
        const updated = {
          ...singleAssignment,
          applications: [...(singleAssignment.applications || []), user._id]
        };
        dispatch(setSingleAssignment(updated));
        setIsApplied(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Transmission failed");
    }
  };

  if (loading && !singleAssignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-mono">
        <Loader2 className="w-12 h-12 animate-spin text-black" strokeWidth={3} />
        <p className="mt-4 font-black uppercase italic tracking-tighter">Retrieving Encrypted Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-mono text-black">
      {/* Brutalist Top Nav */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white border-[3px] border-black px-5 py-2 font-black uppercase text-xs shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          <ArrowLeft size={16} strokeWidth={3} /> Return to Nexus
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <div className="border-[4px] border-black bg-white shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Header Section */}
            <div className="bg-black p-10 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <Target size={150} className="text-white" />
              </div>
              
              <Badge className="bg-codedex-yellow text-black border-[2px] border-black rounded-none px-4 py-1 font-black uppercase italic mb-6">
                {singleAssignment?.subject}
              </Badge>
              
              <h1 className="text-5xl font-[900] text-white uppercase italic tracking-tighter leading-none mb-6 relative z-10">
                {singleAssignment?.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-codedex-yellow font-bold uppercase text-[11px] tracking-[0.2em] relative z-10">
                {/* CLICKABLE CREATOR PROFILE */}
                <Link 
                   to={`/profile/${singleAssignment?.created_by?._id}`}
                   className="flex items-center gap-2 bg-white/10 px-3 py-1.5 hover:bg-codedex-yellow hover:text-black transition-all border border-white/20 hover:border-black group"
                >
                  <UserCircle size={14} className="group-hover:scale-110 transition-transform" /> 
                  <span>Created by: <span className="underline underline-offset-4 decoration-2">
                    {singleAssignment?.created_by?.fullname || "Admin"}
                  </span></span>
                </Link>

                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/10">
                  <Calendar size={14} /> 
                  {daysAgoFunction(singleAssignment?.createdAt) === 0 ? "JUST NOW" : `${daysAgoFunction(singleAssignment?.createdAt)} DAYS AGO`}
                </span>
              </div>
            </div>

            <div className="p-10 space-y-12">
              {/* Mission Statement */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-codedex-purple border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-[900] uppercase italic tracking-tighter">Objective</h2>
                </div>
                <p className="text-lg font-bold leading-relaxed border-[3px] border-black p-6 bg-slate-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] whitespace-pre-wrap">
                  {singleAssignment?.description}
                </p>
              </section>

              {/* Requirements Grid */}
              <section>
                <h2 className="text-2xl font-[900] uppercase italic tracking-tighter mb-8 flex items-center gap-2">
                   <Zap className="text-codedex-purple fill-codedex-purple" /> Necessary Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleAssignment?.requirement?.length > 0 ? (
                    singleAssignment.requirement.map((item, index) => (
                      <div key={index} className="border-[3px] border-black p-4 flex items-center gap-4 bg-white hover:bg-codedex-yellow transition-colors font-black text-sm uppercase italic">
                        <div className="w-4 h-4 bg-black rotate-45" />
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 font-bold uppercase text-xs">No specific requirements detected.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border-[4px] border-black p-8 sticky top-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-[900] uppercase italic tracking-tighter border-b-[4px] border-black pb-4 mb-8 flex justify-between items-center">
              Stats <Target size={24} />
            </h3>
            
            <div className="space-y-6 mb-10">
              <OverviewItem icon={<BookOpen />} label="Subject" value={singleAssignment?.subject} color="bg-blue-400" />
              <OverviewItem icon={<CircleDollarSign />} label="Bounty" value={`रू ${singleAssignment?.budget}`} color="bg-green-400" />
              <OverviewItem icon={<Users />} label="Capacity" value={`${singleAssignment?.position} Openings`} color="bg-pink-400" />
            </div>

            <Button
              disabled={isApplied}
              onClick={applyAssignmentHandler}
              className={`w-full py-10 rounded-none border-[4px] border-black font-[900] uppercase italic text-xl tracking-tighter transition-all ${
                isApplied
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none translate-x-[4px] translate-y-[4px]"
                  : "bg-codedex-purple text-white hover:bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              }`}
            >
              {isApplied ? "Deployed" : "Accept Mission"}
            </Button>
            
            <div className="mt-8 flex items-center justify-center gap-2 font-black uppercase text-[10px] bg-slate-100 border-[2px] border-black p-3">
              <Users size={14} /> {singleAssignment?.applications?.length || 0} Candidates in field
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewItem = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-5 group">
    <div className={`w-12 h-12 ${color} border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all`}>
      {React.cloneElement(icon, { size: 22, strokeWidth: 3 })}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="font-[900] uppercase italic text-base leading-tight">{value}</p>
    </div>
  </div>
);

export default AssignmentDescription;