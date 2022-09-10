import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: JSON.parse(localStorage.getItem("apiData")) || {}
}

export const apiDataSlice = createSlice({
    name:"apidata",
    initialState,
    reducers:{
        apiDataUpdate:(state,action)=>{state.value = action.payload}
    }
}
)

export const {apiDataUpdate} = apiDataSlice.actions
export default apiDataSlice.reducer