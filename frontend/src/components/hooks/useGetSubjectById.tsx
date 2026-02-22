import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleSubject } from '@/redux/subjectSlice'
import { SUBJECT_API_END_POINT } from "@/utils/constant"

const useGetSubjectById = (subjectId) => {

    const dispatch  = useDispatch()

    useEffect(()=>{
        const fetchSingleSubject = async()=>{

            try{
                const res = await axios.get(`${SUBJECT_API_END_POINT}/get/${subjectId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleSubject(res.data.subject))
                }

            }catch(error){
                console.log(error)

            }
        }
        fetchSingleSubject();
    },[subjectId,dispatch])
}

export default useGetSubjectById