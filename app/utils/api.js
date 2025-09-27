import AsyncStorage from '@react-native-async-storage/async-storage';

// Default API configuration
const DEFAULT_API_URL = 'http://192.168.1.100/lastchapter';

let cachedApiUrl = null;

// Get API URL from storage or use default
export const getApiUrl = async () => {
  if (cachedApiUrl) {
    return cachedApiUrl;
  }
  
  try {
    const customUrl = await AsyncStorage.getItem('customApiUrl');
    cachedApiUrl = customUrl || DEFAULT_API_URL;
    return cachedApiUrl;
  } catch (error) {
    console.error('Error getting API URL:', error);
    cachedApiUrl = DEFAULT_API_URL;
    return cachedApiUrl;
  }
};

// Clear cached API URL (used when URL is updated)
export const clearApiUrlCache = () => {
  cachedApiUrl = null;
};

// Enhanced fetch function with authentication and error handling
const authFetch = async (endpoint, options = {}) => {
  try {
    const baseUrl = await getApiUrl();
    const url = `${baseUrl}${endpoint}`;
    
    // Get session token if available
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    
    // Default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Add authorization header if session token exists
    if (sessionToken) {
      defaultHeaders['Authorization'] = `Bearer ${sessionToken}`;
    }
    
    // Merge headers
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };
    
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Log request details for debugging
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    console.log('Request headers:', headers);
    
    if (options.body) {
      console.log('Request body:', options.body);
    }
    
    // Log response details
    console.log(`API Response: ${response.status} ${response.statusText}`);
    
    // Handle different response types
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        // If we can't parse the error response, use the default message
        console.warn('Could not parse error response:', parseError);
      }
      
      throw new Error(errorMessage);
    }
    
    return response;
    
  } catch (error) {
    console.error('API Request failed:', error);
    
    // Handle network errors
    if (error.message === 'Network request failed') {
      throw new Error('Network connection failed. Please check your internet connection.');
    }
    
    // Handle timeout errors
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Convenience methods for different HTTP methods
export const apiGet = (endpoint, options = {}) => {
  return authFetch(endpoint, { ...options, method: 'GET' });
};

export const apiPost = (endpoint, data, options = {}) => {
  return authFetch(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const apiPut = (endpoint, data, options = {}) => {
  return authFetch(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const apiDelete = (endpoint, options = {}) => {
  return authFetch(endpoint, { ...options, method: 'DELETE' });
};

// File upload helper
export const apiUpload = async (endpoint, formData, options = {}) => {
  const baseUrl = await getApiUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const sessionToken = await AsyncStorage.getItem('sessionToken');
  
  const headers = {
    'Content-Type': 'multipart/form-data',
    ...options.headers,
  };
  
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }
  
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Upload failed');
  }
  
  return response;
};

export default authFetch;
