import {configureStore, createSlice} from '@reduxjs/toolkit';
import user from "./store/userSlice";


let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        setCount(state, action){
            for(let i = 0; i < state.length; i++){
                if(state[i].id == action.payload) {
                    state[i].count += 1;
                }
            }
        },
        setProduct(state, action){
            state.push(action.payload);
        }
    }
})

export let {setCount, setProduct} = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
})