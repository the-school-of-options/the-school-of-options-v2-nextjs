import axios from 'axios';

const API_BASE_URL = 'https://api.theschoolofoptions.com/api/v1';

export interface WebinarRegistrationData {
  email: string;
  fullName: string;
  phoneNumebr: string;
  webinarName: string;
}

export interface WebinarUser {
  email: string;
  fullName: string;
  phoneNumebr: string;
  webinarName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebinarResponse {
  ok: boolean;
  user?: WebinarUser;
  error?: string;
  message?: string;
}

export const registerForWebinar = async (data: WebinarRegistrationData): Promise<WebinarResponse> => {
  try {
    console.log('Sending webinar registration request:', {
      url: `${API_BASE_URL}/webinar/register`,
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumebr,
        webinarName: data.webinarName,
        source: 'website'
      }
    });

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await axios.post(`${API_BASE_URL}/webinar/register`, {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumebr,
        webinarName: data.webinarName,
        source: 'website'
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      timeout: 30000
    });

    clearTimeout(timeoutId);
    console.log('Webinar registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Webinar registration error:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      // Handle specific HTTP status codes
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return {
          ok: false,
          error: 'Request timed out. Please check your connection and try again.'
        };
      }
      
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('network')) {
        return {
          ok: false,
          error: 'Network error. Please check your internet connection and try again.'
        };
      }
      
      if (error.response?.status === 429) {
        return {
          ok: false,
          error: 'Too many requests. Please wait a moment and try again.'
        };
      }
      
      if (error.response?.status && error.response.status >= 500) {
        return {
          ok: false,
          error: 'Server error. Please try again in a few minutes.'
        };
      }
      
      if (error.response?.status === 400) {
        return {
          ok: false,
          error: 'Invalid data provided. Please check your information and try again.'
        };
      }
      
      if (error.response?.status === 401) {
        return {
          ok: false,
          error: 'Authentication failed. Please try again.'
        };
      }
      
      if (error.response?.status === 403) {
        return {
          ok: false,
          error: 'Access denied. Please contact support if this continues.'
        };
      }
      
      if (error.response?.data) {
        console.error('API Error Response:', JSON.stringify(error.response.data, null, 2));
        
        // Extract meaningful error message from response
        let errorMessage = 'Registration failed. Please try again.';
        
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
        
        // Handle specific error cases
        if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('already')) {
          errorMessage = 'This email is already registered. Please use a different email address.';
        } else if (errorMessage.toLowerCase().includes('phone') && errorMessage.toLowerCase().includes('already')) {
          errorMessage = 'This phone number is already registered. Please use a different phone number.';
        } else if (errorMessage.toLowerCase().includes('invalid')) {
          errorMessage = 'Please check your information and try again.';
        }
        
        return {
          ok: false,
          error: errorMessage
        };
      }
      
      return {
        ok: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
    
    // Handle other types of errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          ok: false,
          error: 'Request was cancelled. Please try again.'
        };
      }
      
      return {
        ok: false,
        error: error.message || 'An unexpected error occurred. Please try again.'
      };
    }
    
    return {
      ok: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};
