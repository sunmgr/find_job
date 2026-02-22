import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminAssignments } from '@/redux/assignmentSlice'
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant"

const useGetAllAdminAssignments = () => {

    const dispatch  = useDispatch()

    useEffect(()=>{
        const fetchAllAdminAssignments = async()=>{

            try{
                const res = await axios.get(`${ASSIGNMENT_API_END_POINT}/getadminassignments`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllAdminAssignments(res.data.assignments))
                }

            }catch(error){
                console.log(error)

            }
        }
        fetchAllAdminAssignments();
    },[])
}

export default useGetAllAdminAssignments