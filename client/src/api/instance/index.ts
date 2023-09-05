import axios from 'axios';
import { BASE_URL } from '@/constants/url';
import { useAuthStore } from '@/stores/auth';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const { getAccessToken } = useAuthStore();

  if (getAccessToken) {
    config.headers.Authorization = `Bearer ${getAccessToken}`;
  }

  return config;
});

export default axiosInstance;
