import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:JSON.parse(localStorage.getItem("savedlist")) || []
}

export const savedListSlice = createSlice({
    name:"savedList",
    initialState,
    reducers:{
        addToSaved:(state,action)=>{state.list.push(action.payload)},
        removeFromSaved:(state,action)=>{state.list = state.list.filter(( item )=> { return item.name !== action.payload })}
    }
})

export default savedListSlice.reducer
export const { addToSaved , removeFromSaved } = savedListSlice.actions