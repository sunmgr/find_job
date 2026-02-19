import React from "react";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="mt-16">
      {/* --- SECTION HEADER --- */}
      <div className="flex items-end justify-between mb-8 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4a3728] mb-1">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Activity Log
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
            Applied <span className="text-[#4a3728]">Jobs</span>
          </h1>
        </div>

        {/* Visual Count Indicator */}
        <div className="flex items-center gap-3 pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Total Applications
          </span>
          <div className="bg-[#0f172a] text-white text-xs font-black px-3 py-1 rounded-full">
            {allAppliedJobs?.length}
          </div>
        </div>
      </div>
      {/* ----------------------- */}

      <div className="space-y-6">
        {allAppliedJobs && allAppliedJobs.length > 0 ? (
          allAppliedJobs.map((appliedJob) => (
            <div
              key={appliedJob._id}
              className="group relative flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1"
            >
              {/* Interactive Accent Line */}
              <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-[#4a3728] rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

              <div className="flex items-center gap-8">
                {/* Brand Icon */}
                <div className="h-16 w-16 rounded-[1.5rem] bg-[#fcfcfd] border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:border-[#4a3728]/20 transition-all duration-500">
                  <Building2 className="w-7 h-7 text-[#0f172a] group-hover:text-[#4a3728] transition-colors" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="font-black text-xl text-[#0f172a] tracking-tight group-hover:text-[#4a3728] transition-colors">
                    {appliedJob.job.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#4a3728]" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {appliedJob.job.company.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-400">
                        Applied {appliedJob.job.createdAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Badge
                  className={`
                                                    font-black text-[10px] px-3 py-1 rounded-full border-none uppercase tracking-wider
                                                    ${
                                                      appliedJob?.status?.toLowerCase() ===
                                                      "accepted"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                        : appliedJob?.status?.toLowerCase() ===
                                                            "rejected"
                                                          ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                    }
                                                `}
                >
                  {appliedJob.status}
                </Badge>

                <div className="p-3 rounded-full bg-slate-50 text-slate-300 group-hover:bg-[#0f172a] group-hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 font-medium text-sm">
              No applications yet. Start applying to jobs!
            </p>
          </div>
        )}
      </div>

      {/* Pagination/Footer */}
      <div className="mt-12 text-center">
        <button className="group text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-[#4a3728] transition-all">
          Show Full History{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppliedJobTable;
