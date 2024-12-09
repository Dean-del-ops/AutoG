import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://anywhere.somee.com/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers?.useAuth !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers?.useAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject({
      message: error.message || 'An unknown error occurred',
      status: error.response?.status || null,
      data: error.response?.data || null,
    });
  }
);

const handleError = <T>(error: any): { success: false; error: { message: any; status: any; data: any } } => {
  console.error('HTTP Error:', error.response?.status, error.response?.data || error.message);
  return {
    success: false,
    error: {
      message: error.message || 'An unknown error occurred',
      status: error.response?.status || null,
      data: error.response?.data || null,
    },
  };
};

const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<{ success: true; data: T } | { success: false; error: { message: any; status: any; data: any } }> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError<T>(error);
  }
};

const POST = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<{ success: true; data: T } | { success: false; error: { message: any; status: any; data: any } }> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError<T>(error);
  }
};

// Export the HttpClient
export const HttpClient = {
  GET,
  POST,
};

export default axiosInstance;
