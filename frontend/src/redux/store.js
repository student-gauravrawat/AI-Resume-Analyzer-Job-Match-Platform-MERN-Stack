import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./authSlice"
import storage from "redux-persist/lib/storage"
import {persistStore, persistReducer} from "redux-persist" 
import {combineReducers} from "redux"

const rootreducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootreducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
     getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"]
      }
     }) 
})

export const persistor = persistStore(store);
export default store;