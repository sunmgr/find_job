import { createSlice } from "@reduxjs/toolkit";
const subjectSlice = createSlice({
    name:"subject",
    initialState:{
        singleSubject:null,
        subjects:[],
        searchSubjectByText:"",
    },
    reducers:{
        //actions
        setSingleSubject:(state,action)=>{
            state.singleSubject = action.payload
        },
        setSubjects:(state,action)=>{
            state.subjects = action.payload
        },
        setSearchSubjectByText:(state,action)=>{
            state.searchSubjectByText = action.payload
        },

    }
})

export const {setSingleSubject,setSubjects,setSearchSubjectByText} = subjectSlice.actions

export default subjectSlice.reducer