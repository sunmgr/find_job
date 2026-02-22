import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading : false,
        user:null
    },
    heroes: [],
vanguards: [],
    reducers:{
        //actions
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setUser:(state,action) =>{
            state.user = action.payload
        },
        setHeroes: (state, action) => {
    state.heroes = action.payload;
},
setVanguards: (state, action) => {
    state.vanguards = action.payload;
}
    }
})

export const {setLoading,setUser,setHeroes,setVanguards} = authSlice.actions

export default authSlice.reducer