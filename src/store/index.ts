import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default storage
import { combineReducers } from 'redux';

// const storage = require('redux-persist/lib/storage');
// Reducers
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice'
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  user: userReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
