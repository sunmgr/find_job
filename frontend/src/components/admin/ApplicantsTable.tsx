import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  User, 
  Zap, 
  Terminal
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { updateApplicationStatus } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        dispatch(updateApplicationStatus({ id, status }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Command Failed");
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "accepted") return "bg-emerald-400 text-black border-emerald-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
    if (s === "rejected") return "bg-rose-400 text-black border-rose-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
    return "bg-codedex-yellow text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  };

  return (
    <div className="bg-white font-mono">
      <Table>
        <TableCaption className="pb-6 text-black font-black uppercase italic text-[10px] tracking-[0.2em] border-t-[4px] border-black pt-4 bg-slate-50">
          LOG_STREAM: HERO_APPLICANT_MANIFEST_STABLE
        </TableCaption>
        <TableHeader className="bg-black">
          <TableRow className="hover:bg-transparent border-b-[4px] border-black">
            <TableHead className="font-[1000] text-white py-6 pl-10 uppercase tracking-widest text-[11px]">Hero Identity</TableHead>
            <TableHead className="font-[1000] text-white py-6 uppercase tracking-widest text-[11px]">Contact_Comms</TableHead>
            <TableHead className="font-[1000] text-white py-6 uppercase tracking-widest text-[11px]">Portfolio/Scroll</TableHead>
            <TableHead className="text-right font-[1000] text-white py-6 pr-10 uppercase tracking-widest text-[11px]">Executive_Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => {
            if (!item) return null;

            return (
              <TableRow 
                key={item._id} 
                className="group border-b-[3px] border-black hover:bg-slate-50 transition-colors"
              >
                {/* Hero Identity */}
                <TableCell className="py-8 pl-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black font-[1000] text-xl group-hover:bg-codedex-yellow transition-all uppercase italic">
                      {item?.applicant?.fullname?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-[1000] text-black text-lg uppercase italic leading-none">
                        {item?.applicant?.fullname}
                      </span>
                      <div className={`mt-2 flex items-center gap-1.5 w-fit px-2 py-0.5 border-[2px] border-black text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(item?.status)}`}>
                        <Terminal size={10} strokeWidth={4} />
                        {item?.status || "Pending"}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Comms */}
                <TableCell className="py-8">
                  <span className="text-black font-black uppercase text-xs opacity-70 italic">
                    {item?.applicant?.email}
                  </span>
                </TableCell>
                
                {/* Resume/Scroll */}
                <TableCell className="py-8 text-black">
                  {item?.applicant?.profile?.resume ? (
                    <a 
                        href={item?.applicant?.profile?.resume} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 w-fit px-4 py-2 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-[10px] font-black uppercase italic"
                    >
                      <Zap size={14} className="fill-codedex-yellow" /> View_Scroll
                    </a>
                  ) : (
                    <span className="text-slate-400 font-black text-[10px] uppercase">No_Data_Found</span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right py-8 pr-10">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <MoreHorizontal className="w-6 h-6" strokeWidth={3} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                        className="w-60 p-0 rounded-none border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden" 
                        align="end"
                    >
                      <div className="bg-black text-white p-3 text-[10px] font-[1000] uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        Status_Override
                      </div>
                      <div className="p-2 space-y-2">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item?._id)}
                            className={`flex items-center justify-between p-3 border-[3px] border-black cursor-pointer transition-all font-[1000] uppercase text-[11px] italic group/item
                                ${status === "Accepted" ? "hover:bg-emerald-400" : "hover:bg-rose-400"}`}
                          >
                            <div className="flex items-center gap-3">
                              {status === "Accepted" ? <CheckCircle2 size={16} strokeWidth={3}/> : <XCircle size={16} strokeWidth={3}/>}
                              <span>{status === "Accepted" ? "ENROLL_HERO" : "DENY_ACCESS"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;