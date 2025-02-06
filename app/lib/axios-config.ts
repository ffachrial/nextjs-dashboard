// utils/axiosConfig.ts
import axios from 'axios';

// Define environment types
type Environment = 'development' | 'production';

// Define your base URLs with explicit typing
const BASE_URLS: Record<Environment, string> = {
  development: 'http://localhost:3000/api',
  production: 'https://nextjs-dashboard-rnd-kitchen-projects.vercel.app/api'
};

// Create axios instance with dynamic base URL
const createAxiosInstance = () => {
  const environment = (process.env.NODE_ENV || 'development') as Environment;
  
  return axios.create({
    baseURL: BASE_URLS[environment],
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// Export the configured axios instance
export const api = createAxiosInstance();