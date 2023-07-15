import{createSlice,createAsyncThunk}from '@reduxjs/toolkit'
import goalsService from './goalsService'


const initialState={
    goals:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

 export const  setGoals=createAsyncThunk(
    'goals/setGoals', async(goals,thunkApi)=>{
        try {
              let token =thunkApi.getState().auth.user.token
            return await goalsService.setGoals(goals,token)
            
        } catch (error) {

            let message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          thunkApi.rejectWithValue(message);
            
        }
    }
)
export const  getGoals=createAsyncThunk(
    'goals/getGoals', async(_,thunkApi)=>{
        try {
              let token =thunkApi.getState().auth.user.token
            return await goalsService.getGoals(token)
            
        } catch (error) {

            let message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          thunkApi.rejectWithValue(message);
            
        }
    }
)

export const  deleteGoal=createAsyncThunk(
    'goals/deleteGoal', async(id,thunkApi)=>{
        try {
              let token =thunkApi.getState().auth.user.token
            return await goalsService.deleteGoal(id,token)
            
        } catch (error) {

            let message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          thunkApi.rejectWithValue(message);
            
        }
    }
)


const goalreducer=createSlice({
    name:'goals',
    initialState,
    reducres:{
        reset:()=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(setGoals.pending,(state,actions)=>{
            state.isLoading=true

        })
        .addCase(setGoals.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals.push(actions.payload)

        })
        .addCase(setGoals.rejected,(state,actions)=>{
            state.isLoading=false
            state.isError=true
            state.message=actions.payload

        })
        .addCase(getGoals.pending,(state,actions)=>{
            state.isLoading=true

        })
        .addCase(getGoals.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals=actions.payload

        })
        .addCase(getGoals.rejected,(state,actions)=>{
            state.isLoading=false
            state.isError=true
            state.message=actions.payload

        })
        .addCase(deleteGoal.pending,(state,actions)=>{
            state.isLoading=true

        })
        .addCase(deleteGoal.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals=state.goals.filter((goal)=>goal._id!==actions.payload.id)

        })
        .addCase(deleteGoal.rejected,(state,actions)=>{
            state.isLoading=false
            state.isError=true
            state.message=actions.payload

        })
 
              

    }

})


export const{reset}=goalreducer.actions

export default goalreducer.reducer