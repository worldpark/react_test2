import {combineReducers, configureStore, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';
import user from "./store/userSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";
import logger from "redux-logger";


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

const reducers = combineReducers({
    user: user.reducer,
    cart: cart.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export let {setCount, setProduct} = cart.actions;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export const persistor = persistStore(store);