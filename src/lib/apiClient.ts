import axios from 'axios';
import { useAuthStore } from './stores/auth-store';
import { auth } from './firebase';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If it's a 401 and we haven't already tried to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      const state = useAuthStore.getState();
      
      // If no token or it's a demo token, there's nothing we can refresh via Firebase
      if (!state.token || state.token === "demo-token" || !auth.currentUser) {
        if (state.isAuthenticated && state.token !== "demo-token") {
            state.logout();
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue the request until token refresh completes
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve: resolve as any, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await auth.currentUser.getIdToken(true);
        state.setAuthData(auth.currentUser, newToken);
        
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        state.logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
