import React from "react";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Building2,
  ArrowRight,
  Layers,
  Sword,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";

const AppliedAssignmentTable = () => {
  const { allAppliedAssignments } = useSelector((store) => store.assignment);

  return (
    <div className="mt-16 font-mono">
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-codedex-purple mb-1">
            <Layers className="w-5 h-5" strokeWidth={3} />
            <span className="text-[11px] font-[900] uppercase tracking-[0.3em]">
              Mission History
            </span>
          </div>
          <h1 className="text-4xl font-[900] text-black italic uppercase tracking-tighter">
            Applied <span className="text-codedex-purple">Bounties</span>
          </h1>
        </div>

        {/* Visual Count Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Total Logs:
          </span>
          <div className="bg-codedex-yellow border-[3px] border-black text-black text-sm font-[900] px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {allAppliedAssignments?.length || 0}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {allAppliedAssignments && allAppliedAssignments.length > 0 ? (
          allAppliedAssignments.map((appliedJob, index) => {
            const status = appliedJob?.status?.toLowerCase();
            const jobData = appliedJob.job || appliedJob.assignment;

            return (
              <div
                key={appliedJob._id}
                className="group relative flex flex-col md:flex-row items-center justify-between p-6 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  {/* Brand Icon - Brutalist Frame */}
                  <div className="hidden sm:flex h-16 w-16 bg-codedex-cream border-[3px] border-black items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                    <Target className="w-8 h-8 text-black" strokeWidth={3} />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <h2 className="font-[900] text-2xl text-black uppercase italic tracking-tighter group-hover:text-codedex-purple transition-colors">
                      {jobData?.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                        <span className="text-[10px] font-black text-black uppercase tracking-tight">
                          {jobData?.company?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />
                        <span className="text-[10px] font-black text-slate-400 uppercase">
                          {jobData?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-6 md:mt-0 border-t-2 md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <Badge
                    className={`
                      rounded-none border-[3px] border-black font-black text-[10px] px-4 py-1.5 uppercase tracking-widest
                      ${status === "accepted" ? "bg-emerald-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : 
                        status === "rejected" ? "bg-red-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : 
                        "bg-codedex-cream text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}
                    `}
                  >
                    {appliedJob.status}
                  </Badge>

                  <div className="bg-black text-white p-2 border-[2px] border-black group-hover:bg-codedex-purple transition-colors">
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="text-center py-20 border-[4px] border-black border-dashed bg-white">
            <Sword className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">
              Inventory Empty. No Quests Accepted Yet.
            </p>
          </div>
        )}
      </div>

      {/* Pagination/Footer */}
      <div className="mt-16 text-center">
        <button className="group relative px-8 py-3 bg-white border-[3px] border-black font-[900] uppercase italic tracking-widest text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
          View Archived Missions
        </button>
      </div>
    </div>
  );
};

export default AppliedAssignmentTable;