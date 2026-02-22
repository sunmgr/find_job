import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSubjects } from "@/redux/subjectSlice"
import { SUBJECT_API_END_POINT } from "@/utils/constant"

const useGetAllSubjects = () => {

    const dispatch  = useDispatch()

    useEffect(()=>{
        const fetchAllSubjects = async()=>{

            try{
                const res = await axios.get(`${SUBJECT_API_END_POINT}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSubjects(res.data.subjects ))
                }

            }catch(error){
                console.log(error)

            }
        }
        fetchAllSubjects();
    },[])
}

export default useGetAllSubjects