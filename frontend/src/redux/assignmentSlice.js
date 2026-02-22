import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
    name: "assignment",
    initialState: {
        allAssignments: [],
        allAdminAssignments: [],
        singleAssignment: null,
        searchAssignmentByText: "",
        allAppliedAssignments: [],
        searchedQuery: "", // NEW: To store the last search query for potential re-use
    },
    reducers: {
        // Basic actions
        setAllAssignments: (state, action) => {
            state.allAssignments = action.payload;
        },
        setSingleAssignment: (state, action) => {
            state.singleAssignment = action.payload;
        },
        setAllAdminAssignments: (state, action) => {
            state.allAdminAssignments = action.payload;
        },
        setSearchAssignmentByText: (state, action) => {
            state.searchAssignmentByText = action.payload;
        },
        setAllAppliedAssignments: (state, action) => {
            state.allAppliedAssignments = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        // NEW: Sync all lists when a job is updated (like when applying)
        updateAssignmentInLists: (state, action) => {
            const updatedAssignment = action.payload;
            
            // 1. Update in the main browsing list
            state.allAssignments = state.allAssignments.map((assignment) => 
                assignment._id === updatedAssignment._id ? updatedAssignment : assignment
            );
            
            // 2. Update the single view if it's currently open
            if (state.singleAssignment?._id === updatedAssignment._id) {
                state.singleAssignment = updatedAssignment;
            }
        }
    }
});

export const { 
    setAllAssignments, 
    setSingleAssignment, 
    setAllAdminAssignments, 
    setSearchAssignmentByText,
    updateAssignmentInLists ,
    setAllAppliedAssignments,
    setSearchedQuery,
}
    = assignmentSlice.actions;

export default assignmentSlice.reducer;