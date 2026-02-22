import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "./authSlice"
import assignmentSlice from "./assignmentSlice"
import subjectSlice from "./subjectSlice"
import{
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import applicationSlice from './applicationSlice';

const persistConfig = {
    key: "root",
    storage,
    version : 1,
}
const rootReducer = combineReducers({
    auth: authSlice,
    assignment: assignmentSlice,
    subject:subjectSlice,
    application:applicationSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})
export default store