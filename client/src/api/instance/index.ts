import axios from 'axios';
import { BASE_URL } from '@/constants/url';
import { useUserStore } from '@/stores/user';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const { getAccessToken } = useUserStore();

  if (getAccessToken) {
    config.headers.Authorization = `Bearer ${getAccessToken}`;
  }

  return config;
});

export default axiosInstance;
