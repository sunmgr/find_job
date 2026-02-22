import React from 'react'
import {setHeroes, setVanguards} from '@/redux/authSlice'
import {USER_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { useEffect } from 'react'

const useGetLeaderBoard = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchLeaderBoard = async()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/leaderboard`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setHeroes(res.data.heroes))
                    dispatch(setVanguards(res.data.vanguards))
                }

            }catch(error){
                console.error('Error fetching leaderboard data:', error);
            }
        }
        fetchLeaderBoard()
    },[dispatch])


}

export default useGetLeaderBoard