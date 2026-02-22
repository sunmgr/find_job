import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setAllAssignments} from "@/redux/assignmentSlice"
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant"

const useGetAllAssignments = () => {

    const dispatch  = useDispatch()
    const {searchedQuery} = useSelector((store)=>store.assignment)

    useEffect(()=>{
        const fetchAllAssignments = async()=>{

            try{
                const res = await axios.get(`${ASSIGNMENT_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllAssignments(res.data.assignments))
                }

            }catch(error){
                console.log(error)

            }
        }
        fetchAllAssignments();
    },[])
}

export default useGetAllAssignments