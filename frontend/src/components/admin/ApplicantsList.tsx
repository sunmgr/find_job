import React, { useEffect, useMemo } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Users, 
    UserCheck, 
    Clock, 
    XCircle, 
    ShieldAlert, 
    Terminal, 
    Zap,
    Sword
} from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';

const ApplicantsList = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);
    
    const allApplications = applicants?.applications || [];

    const stats = useMemo(() => ({
        accepted: allApplications.filter(app => app?.status?.toLowerCase() === 'accepted').length,
        rejected: allApplications.filter(app => app?.status?.toLowerCase() === 'rejected').length,
        pending: allApplications.filter(app => app?.status?.toLowerCase() === 'pending').length,
    }), [allApplications]);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        if (params.id) fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-white font-mono pb-20 selection:bg-black selection:text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Header: Brutalist Quest Header */}
                <div className="mb-16 border-[6px] border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.3em]">
                        Enrolment_Status: Active
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-codedex-yellow p-2 border-[3px] border-black">
                                <Sword size={24} className="text-black fill-current" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Mission_Director / Root</span>
                        </div>
                        
                        <h1 className="text-6xl font-[1000] text-black tracking-tighter uppercase italic leading-none">
                            Inspect <span className="text-[#4a3728]">Heroes</span>
                        </h1>
                        
                        <p className="text-xl text-black font-black uppercase italic mt-2 flex items-center gap-3">
                            <Zap className="text-codedex-yellow fill-current" size={20} />
                            Quest: {applicants?.title || "Classified_Mission"}
                        </p>
                    </div>
                </div>

                {/* Stats: Neo-Brutalist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <StatCard label="Total_Applied" value={allApplications.length} color="bg-blue-400" icon={<Users />} />
                    <StatCard label="Rank_Accepted" value={stats.accepted} color="bg-emerald-400" icon={<UserCheck />} />
                    <StatCard label="Rank_Pending" value={stats.pending} color="bg-codedex-yellow" icon={<Clock />} />
                    <StatCard label="Rank_Rejected" value={stats.rejected} color="bg-rose-400" icon={<XCircle />} />
                </div>

                {/* Table Section */}
                <div className="border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(110,68,255,1)] overflow-hidden bg-white">
                    <div className="bg-black text-white px-8 py-5 flex justify-between items-center border-b-[6px] border-black">
                        <div className="flex items-center gap-4">
                            <Terminal size={20} className="text-emerald-400" />
                            <span className="font-[1000] uppercase italic tracking-widest text-sm">Hero_Manifest_Data</span>
                        </div>
                        <div className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">
                            Local_Time: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                    <div className="p-2">
                        <ApplicantsTable />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                        *** End of Transmission ***
                    </p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color, icon }) => (
    <div className={`border-[4px] border-black p-8 ${color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group cursor-default`}>
        <div className="flex justify-between items-start mb-6">
            <span className="font-[1000] text-[10px] uppercase tracking-widest text-black/60 group-hover:text-black">
                {label}
            </span>
            <div className="text-black group-hover:scale-125 transition-transform">
                {React.cloneElement(icon, { strokeWidth: 3, size: 24 })}
            </div>
        </div>
        <div className="text-6xl font-[1000] text-black tracking-tighter italic">
            {value.toString().padStart(2, '0')}
        </div>
    </div>
);

export default ApplicantsList;