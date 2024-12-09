import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { Reducer } from '@reduxjs/toolkit';

export type PersistedAuthState = ReturnType<typeof authReducer> & PersistPartial;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["somethingTemporary"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default persistedReducer;
