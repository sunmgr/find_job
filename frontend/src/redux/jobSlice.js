import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "", // NEW: To store the last search query for potential re-use
    },
    reducers: {
        // Basic actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        // NEW: Sync all lists when a job is updated (like when applying)
        updateJobInLists: (state, action) => {
            const updatedJob = action.payload;
            
            // 1. Update in the main browsing list
            state.allJobs = state.allJobs.map((job) => 
                job._id === updatedJob._id ? updatedJob : job
            );
            
            // 2. Update the single view if it's currently open
            if (state.singleJob?._id === updatedJob._id) {
                state.singleJob = updatedJob;
            }
        }
    }
});

export const { 
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs, 
    setSearchJobByText,
    updateJobInLists ,
    setAllAppliedJobs,
    setSearchedQuery,
}
    = jobSlice.actions;

export default jobSlice.reducer;