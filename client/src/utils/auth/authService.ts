import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../api/config';
import { LoginCredentials, LoginResponse } from '@/types/auth';
import apiClient from '../api/axios';

// Use regular axios for login (no token needed)
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
      credentials
    );
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LOGOUT);
  },
};
