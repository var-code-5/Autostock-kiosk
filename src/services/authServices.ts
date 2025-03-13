import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthResponse {
  message: string;
  data: {
    name: string;
    username: string;
    jwt: string;
    storeId: number;
    kioskId: number;
  };
}

// Create axios instance with interceptors
const api = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to add token to each request
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          // No token available, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post<AuthResponse>(`${BASE_URL}/sign/refresh-token-kiosk`, {
          jwt,
        });
        
        if (response.data.message === "Token refreshed.") {
          const { jwt: newJwt } = response.data.data;
          
          // Update token in localStorage
          localStorage.setItem('jwt', newJwt);
          
          // Update Authorization header
          originalRequest.headers.Authorization = `Bearer ${newJwt}`;
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('jwt');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth service methods
const authService = {
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post<AuthResponse>(`${BASE_URL}/sign/kiosk-login`, {
        username,
        password,
      });
      
      if (response.data.message === "Login successful.") {
        const { jwt, storeId, kioskId } = response.data.data;
        
        // Store JWT and other relevant info in localStorage
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('storeId', storeId.toString());
        localStorage.setItem('kioskId', kioskId.toString());
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  
  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('storeId');
    localStorage.removeItem('kioskId');
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  },
  
  getAccessToken(): string | null {
    return localStorage.getItem('jwt');
  },
  
  getStoreId(): number | null {
    const storeId = localStorage.getItem('storeId');
    return storeId ? parseInt(storeId, 10) : null;
  },
  
  getKioskId(): number | null {
    const kioskId = localStorage.getItem('kioskId');
    return kioskId ? parseInt(kioskId, 10) : null;
  }
};

export default authService;
export { api };