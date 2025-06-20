import axios from "axios";

const BASE_URL = "http://localhost:8181";

const instance = axios.create({
    baseURL: BASE_URL
});

// Public endpoints that don't require authentication
const publicEndpoints = [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/event/all'
];

// Add console log for debugging
console.log('Axios instance created with BASE_URL:', BASE_URL);

// Request interceptor - adds authorization token to requests
instance.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        
        // Check for invalid URL parameters and reject the request
        if (config.url.includes('/undefined') || config.url.includes('/null')) {
            console.error('Invalid URL detected:', config.url);
            return Promise.reject(new Error('Invalid URL parameter: URL contains undefined or null'));
        }
        
        // Extract the base endpoint path for easier matching
        const baseEndpointPath = config.url.split('?')[0]; // Remove query params if any
        
        // Always include token for booking and payment endpoints
        if (baseEndpointPath.includes('/api/v1/booking') || baseEndpointPath.includes('/api/v1/payment')) {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('Added token to request for protected endpoint:', baseEndpointPath);
            } else {
                console.error('No authentication token found for protected endpoint:', config.url);
                return Promise.reject(new Error('Authentication required: No token available'));
            }
            return config;
        }
        
        // Determine if this is a public endpoint
        const isPublicEndpoint = publicEndpoints.some(endpoint => baseEndpointPath === endpoint);
        console.log('Is public endpoint:', isPublicEndpoint, 'for path:', baseEndpointPath);
        
        // Special case for event/{id} - it's public only for GET requests
        const isPublicEventDetail = baseEndpointPath.match(/^\/api\/v1\/event\/\d+$/) && config.method === 'get';
        
        if (!isPublicEndpoint && !isPublicEventDetail) {
            const token = localStorage.getItem('jwtToken');
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
                console.log('Added token to request for non-public endpoint:', baseEndpointPath);
            } else {
                // For non-public endpoints that require auth but no token is available
                if (!config.headers.skipAuthRedirect) {
                    console.warn('No authentication token found for protected endpoint:', config.url);
                }
            }
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - handles errors globally
instance.interceptors.response.use(
    (response) => {
        console.log('Received successful response from:', response.config.url);
        return response;
    },
    async (error) => {
        console.error('API Error:', error);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        
        // If the error is from our own validation
        if (error.message && error.message.includes('Invalid URL parameter')) {
            console.error('Request rejected due to invalid URL parameter');
            return Promise.reject(error);
        }
        
        // If the error is from our authentication check
        if (error.message && error.message.includes('Authentication required')) {
            console.error('Authentication required for protected endpoint');
            // Redirect to login page
            window.location.href = '/';
            return Promise.reject(error);
        }
        
        const originalRequest = error.config;
        
        // If the error is 401 Unauthorized and we haven't tried to refresh the token yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Clear invalid tokens
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            
            // Redirect to login page
            window.location.href = '/';
            
            return Promise.reject(error);
        }
        
        // If the error is 403 Forbidden
        if (error.response && error.response.status === 403) {
            // Extract the base endpoint path for easier matching
            const baseEndpointPath = originalRequest.url.split('?')[0]; // Remove query params if any
            
            // Check if this is a public endpoint that should work without auth
            const isPublicEndpoint = publicEndpoints.some(endpoint => 
                baseEndpointPath === endpoint
            );
            
            // Special case for event/{id} - it's public only for GET requests
            const isPublicEventDetail = baseEndpointPath.match(/^\/api\/v1\/event\/\d+$/) && 
                                       originalRequest.method === 'get';
            
            if (isPublicEndpoint || isPublicEventDetail) {
                console.warn('Server returned 403 for a public endpoint. This might be a server configuration issue.');
            } else {
                console.warn('Access forbidden. You may not have permission to access this resource.');
                
                // Check if token exists but might be invalid
                const token = localStorage.getItem('jwtToken');
                if (token) {
                    console.warn('Token exists but may be invalid. Try logging out and back in.');
                } else {
                    console.warn('No authentication token found. Please log in.');
                    // Redirect to login if no token exists
                    window.location.href = '/';
                }
            }
        }
        
        return Promise.reject(error);
    }
);

export default instance;