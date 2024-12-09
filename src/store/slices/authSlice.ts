import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { HttpClient } from '@/utils/axiosInstance';
import { fetchUserInfo } from './userSlice';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLoading, setAuth, logout } = authSlice.actions;

interface LoginResponse {
  token: string;
}


export const login = (phoneNumber: string, passwordHash: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const response = await HttpClient.POST<LoginResponse>('/Users/login', { phoneNumber, passwordHash },{ headers: { useAuth: false } });
    console.log(response,"responsedata")
    if(response.success){
    const { token } = response.data;
    localStorage.setItem('token', token);
    dispatch(setAuth({ token }));
    await dispatch(fetchUserInfo());
    }
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;

