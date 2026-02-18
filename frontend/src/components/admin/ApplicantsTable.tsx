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
import { MoreHorizontal, Eye, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
      try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


  return (
    <div className="p-4">
      <Table>
        <TableCaption className="pb-4">
          A list of recent applications for this position.
        </TableCaption>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-none">
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500 py-6">
              Full Name
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
              Email
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
              Contact
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
              Resume
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
              Date
            </TableHead>
            <TableHead className="text-right font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-slate-50/50 transition-colors border-slate-50"
            >
              <TableCell className="font-bold text-slate-700 py-5">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="text-slate-500 font-medium">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="text-slate-500 font-medium">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a3728] font-bold text-xs underline underline-offset-4 hover:text-[#36281d]"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Not Uploaded</span>
                )}
              </TableCell>
              <TableCell className="text-slate-500 font-medium">
                {item?.applicant?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreHorizontal className="text-slate-400 w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 rounded-2xl shadow-xl border-slate-100">
                    {shortlistingStatus.map((status, index) => {
                      return (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
