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
import { MoreHorizontal, CheckCircle2, XCircle, Clock } from "lucide-react";
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
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Helper function to render the status icon/color next to the name
  const renderStatusIndicator = (status) => {
    const s = status?.toLowerCase();
    if (s === "accepted") {
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    } else if (s === "rejected") {
      return <XCircle className="w-4 h-4 text-red-500" />;
    } else {
      return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption className="pb-4">Recent job applications.</TableCaption>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500 py-6">Candidate Name</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">Email</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">Resume</TableHead>
            <TableHead className="text-right font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => {
            if (!item) return null;

            return (
              <TableRow key={item._id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                {/* Name Section with Dynamic Icon */}
                <TableCell className="py-5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700">
                      {item?.applicant?.fullname}
                    </span>
                    {/* This renders the Green/Red/Yellow icon */}
                    {renderStatusIndicator(item?.status)}
                  </div>
                </TableCell>

                <TableCell className="text-slate-500 font-medium">{item?.applicant?.email}</TableCell>
                
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a href={item?.applicant?.profile?.resume} target="_blank" rel="noreferrer" className="text-[#4a3728] font-bold text-xs underline underline-offset-4">
                      View Resume
                    </a>
                  ) : <span className="text-slate-400 italic text-xs">No Resume</span>}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <MoreHorizontal className="text-slate-400 w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 rounded-2xl shadow-xl border-slate-100">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="flex items-center px-3 py-2 my-1 cursor-pointer hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                        >
                          {status === "Accepted" ? (
                            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2 text-red-500" />
                          )}
                          {status}
                        </div>
                      ))}
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