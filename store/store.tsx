import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import user from "./slices/userSlice"
import { combineReducers } from "redux"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: user
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false, 
      }),
});

export const persistor = persistStore(store);