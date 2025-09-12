import axios from 'axios';

const API_BASE_URL = 'https://api.theschoolofoptions.com/api/v1';

export interface NewsletterUser {
  email: string;
  subscribed: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterResponse {
  ok: boolean;
  user?: NewsletterUser;
  error?: string;
  message?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
  try {
    console.log('Sending newsletter subscription request:', {
      url: `${API_BASE_URL}/newsletter/subscribe`,
      email: email
    });

    const response = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, {
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Newsletter subscription response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
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
