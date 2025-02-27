import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    loading:false,
    error:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        loginSuccess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure:(state)=>{
            state.loading = false;
            state.error = true;
        },
        logout:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription:(state,action)=>{
            if(state.currentUser.subscribedChannels.includes(action.payload)){
                state.currentUser.subscribedChannels.splice(state.currentUser.subscribedChannels.findIndex(channelId=>channelId===action.payload),1);
            }else{
                state.currentUser.subscribedChannels.push(action.payload);
            }
        }
    }
});

export const {loginStart,loginSuccess,loginFailure,logout,subscription} = userSlice.actions;
export default userSlice.reducer;