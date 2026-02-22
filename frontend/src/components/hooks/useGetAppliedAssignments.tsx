import {APPLICATION_API_END_POINT} from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAppliedAssignments } from '@/redux/assignmentSlice';


const useGetAppliedAssignments = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedAssignments = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                if (res.data.success) {
                    dispatch(setAllAppliedAssignments(res.data.application));
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchAppliedAssignments();
    },[])
}

export default useGetAppliedAssignments;