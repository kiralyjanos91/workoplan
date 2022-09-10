import {configureStore} from "@reduxjs/toolkit"
import apiDataReducer from "../apidata/apiDataSlice"
import savedListReducer from "../savedlist/savedListSlice"
import plannerReducer from "../planner/plannerSlice"

export const store = configureStore({
    reducer:{
        apidata:apiDataReducer,
        savedList:savedListReducer,
        planner:plannerReducer
    }
})