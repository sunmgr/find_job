import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useDispatch, useSelector } from 'react-redux';
import { Users, UserCheck, Clock } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllApplicants } from '@/redux/applicationSlice';

const ApplicantsList = () => {
    const {applicants} = useSelector((store)=>store.application);
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllApplicants = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
                dispatch(setAllApplicants(res.data.job));
              
            }catch(error){
                console.log(error);
            }
        }
        fetchAllApplicants();
        
    },[])


    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
                        Applicants <span className="text-[#4a3728]">({applicants?.applications?.length || 0})</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">
                        Review and manage candidates for <span className="text-[#4a3728] font-bold">{applicants?.title}</span>
                    </p>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard icon={<Users />} label="Total Applications" value={applicants?.applications?.length || 0} color="text-blue-600" />
                    <StatCard icon={<UserCheck />} label="Shortlisted" value="0" color="text-emerald-600" />
                    <StatCard icon={<Clock />} label="Pending Review" value={applicants?.applications?.length || 0} color="text-amber-600" />
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 flex items-center gap-5 shadow-sm">
        <div className={`p-4 bg-slate-50 rounded-2xl ${color}`}>
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
        </div>
    </div>
);

export default ApplicantsList;