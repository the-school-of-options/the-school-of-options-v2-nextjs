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
     {
        fullName: data.fullName,
        email: data.email,
        phoneNumber:data.phoneNumebr,
        webinarName:data.webinarName,
        source:'website'
    }
    });

    const response = await axios.post(`${API_BASE_URL}/webinar/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
      
      if (error.response?.data) {
        console.error('API Error Response:', JSON.stringify(error.response.data, null, 2));
        return error.response.data;
      }
      return {
        ok: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
    return {
      ok: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};
