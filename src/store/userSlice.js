import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user',
    initialState: {name: 'kim', age: 20},
    reducers: {
        setUserName(state){
            state.name = 'park';
        },
        setUserAge(state, action){
            state.age += action.payload;
        }
    }
})

export let {setUserName, setUserAge} = user.actions

export default user;