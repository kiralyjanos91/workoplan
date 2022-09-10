import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plan:JSON.parse(localStorage.getItem("planner")) || 
        [
            ["Monday"],
            ["Tuesday"],
            ["Wednesday"],
            ["Thursday"],
            ["Friday"],
            ["Saturday"],
            ["Sunday"],
        ]   
}

export const plannerSlice = createSlice({
    name:"planner",
    initialState,
    reducers:{
        addToPlan : ( state , action ) => {
            const {day,exercise} = action.payload
            const indexOfDay = state.plan.findIndex((el)=>{return el[0]===day})
            if (!state.plan[indexOfDay].includes(exercise))
            {
                state.plan[indexOfDay].push(exercise)
            }
        },
        removeFromPlan : ( state , action ) => {
            const {day,exercise} = action.payload
            const indexOfDay = state.plan.findIndex((el)=>{return el[0]===day})
            state.plan[indexOfDay] = state.plan[indexOfDay].filter((exercises)=>{
                return exercises.name !== exercise.name
            })
        },
        moveUp : ( state , action ) => {
            const [index,day] = action.payload
            const indexOfDay = state.plan.findIndex((el)=>{return el[0]===day})
            if (index > 1)
                {
                    let temp = state.plan[indexOfDay][index]
                    state.plan[indexOfDay][index] = state.plan[indexOfDay][index-1]
                    state.plan[indexOfDay][index-1] = temp
                }
        },
        moveDown : ( state , action ) => {
            const [index,day] = action.payload
            const indexOfDay = state.plan.findIndex((el)=>{return el[0]===day})
            if (index < state.plan[indexOfDay].length - 1)
                {
                    let temp = state.plan[indexOfDay][index]
                    state.plan[indexOfDay][index] = state.plan[indexOfDay][index+1]
                    state.plan[indexOfDay][index+1] = temp
                }
        },
        updateNotes : ( state , action ) => {
            const {index,day,notes} = action.payload
            const indexOfDay = state.plan.findIndex((el)=>{return el[0]===day})
            state.plan[indexOfDay][index].notes = notes
        }
    }
})

export default plannerSlice.reducer
export const { addToPlan , removeFromPlan , moveUp , moveDown , updateNotes } = plannerSlice.actions