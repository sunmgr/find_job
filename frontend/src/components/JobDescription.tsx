import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  ArrowLeft,
  Building2,
  Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { daysAgoFunction } from "../utils/daysAgoFunction.js";
import { toast } from "sonner";

const JobDescription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  // Redux Selectors
  const { user } = useSelector((store) => store.auth);
  const { singleJob, allJobs } = useSelector((store) => store.job);

  const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
useEffect(() => {
    if (singleJob && user) {
        const hasApplied = singleJob?.applications?.some((application) => {
            // Check if it's an ID string or an object with an _id
            const applicantId = application.applicant?._id || application.applicant;
            return applicantId === user?._id;
        });
        setIsApplied(hasApplied);
    }
}, [singleJob, user]);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        // --- CACHE-FIRST ---
        // Instantly show data if we already have it in our list
        const cachedJob = allJobs?.find((j) => j._id === jobId);
        if (cachedJob) {
          dispatch(setSingleJob(cachedJob));
          setLoading(false);
        } else {
          setLoading(true);
        }

        // --- API SYNC ---
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }

  }, [jobId,dispatch, user?._id]);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply.");
      return navigate("/login");
    }

    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Applied successfully!");

        
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user._id }]
        };
        dispatch(setSingleJob(updatedJob));
        setIsApplied(true); // Ensure button disables immediately
      }
    } catch (error) {
      console.error("Apply error:", error);
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-[#4a3728] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Browse
        </button>
      </div>

      {loading && !singleJob ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#4a3728]" />
          <p className="text-slate-400 font-medium animate-pulse">Fetching details...</p>
        </div>
      ) : !singleJob ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-600">Job not found</h2>
          <Button onClick={() => navigate("/jobs")} className="mt-4 bg-[#4a3728]">Return to Jobs</Button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-4">
                  <Badge className="bg-[#f5f1ee] text-[#4a3728] border-none px-4 py-1 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                    {singleJob?.jobType}
                  </Badge>
                  <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">
                    {singleJob?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#4a3728]" />
                      <span className="font-bold text-slate-700">{singleJob?.company?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#4a3728]" />
                      <span>{singleJob?.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4a3728]" />
                      <span>{daysAgoFunction(singleJob?.createdAt) === 0 ? "Today" : `${daysAgoFunction(singleJob?.createdAt)} days ago`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 w-full my-10" />

              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-black text-[#0f172a] mb-4 text-sm uppercase tracking-widest">About the Role</h2>
                  <p className="text-slate-500 leading-relaxed font-medium">{singleJob?.description}</p>
                </section>
                <section>
                  <h2 className="text-xl font-black text-[#0f172a] mb-4 text-sm uppercase tracking-widest">Requirements</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {singleJob?.requirement?.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-slate-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4a3728]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white sticky top-10 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#4a3728] mb-8">Job Overview</h3>
              <div className="space-y-8 mb-12">
                <OverviewItem icon={<Users />} label="Vacancies" value={`${singleJob?.position} Positions`} />
                <OverviewItem icon={<Briefcase />} label="Role Type" value={singleJob?.jobType} />
                <OverviewItem icon={<DollarSign />} label="Salary" value={`${singleJob?.salary} LPA`} />
              </div>

              <Button
                disabled={isApplied}
                onClick={applyJobHandler}
                className={`w-full py-8 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-[#4a3728] hover:bg-[#36281d] shadow-xl shadow-[#4a3728]/20"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
              <p className="text-center text-[10px] text-slate-500 mt-6 font-medium">
                Applied by {singleJob?.applications?.length || 0} candidates
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OverviewItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-5">
    <div className="p-3 bg-white/5 rounded-2xl text-[#4a3728]">
      {React.cloneElement(icon, { size: 24 })}  
    </div>
    <div>
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);

export default JobDescription;