import axios from 'axios';

const LISTMONK_API_URL = 'https://api.theschoolofoptions.com/api/v1/newsletter/subscribe';
const NEWSLETTER_LIST_ID = 29;

export interface ListmonkSubscriber {
  id: number;
  created_at: string;
  updated_at: string;
  uuid: string;
  email: string;
  name: string;
  attribs: Record<string, any>;
  status: 'enabled' | 'disabled' | 'blocklisted';
  lists: Array<{
    id: number;
    name: string;
    status: 'unconfirmed' | 'confirmed' | 'unsubscribed';
  }>;
}

export interface ListmonkResponse {
  data?: ListmonkSubscriber;
  message?: string;
}

export interface NewsletterResponse {
  ok: boolean;
  subscriber?: ListmonkSubscriber;
  error?: string;
  message?: string;
}

export const subscribeToNewsletter = async (email: string, name?: string): Promise<NewsletterResponse> => {
  try {
    console.log('Sending newsletter subscription request to Listmonk:', {
      url: LISTMONK_API_URL,
      email: email,
      name: name,
      listId: NEWSLETTER_LIST_ID
    });

    // Get credentials from environment variables
    const username = process.env.LISTMONK_USERNAME;
    const password = process.env.LISTMONK_PASSWORD;

    if (!username || !password) {
      console.error('Missing Listmonk credentials');
      return {
        ok: false,
        error: 'Server configuration error. Please contact support.'
      };
    }

    const response = await axios.post(LISTMONK_API_URL, {
      email: email,
      name: name || email.split('@')[0], // Use provided name or email prefix
      listId: NEWSLETTER_LIST_ID
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: username,
        password: password
      }
    });

    console.log('Newsletter subscription response:', response.data);
    
    return {
      ok: true,
      subscriber: response.data.data,
      message: 'Successfully subscribed to newsletter!'
    };
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
      
      if (error.response?.status === 409) {
        // Email already exists
        return {
          ok: true,
          message: 'You are already subscribed to our newsletter!'
        };
      }
      
      if (error.response?.data) {
        console.error('API Error Response:', JSON.stringify(error.response.data, null, 2));
        return {
          ok: false,
          error: error.response.data.message || 'Failed to subscribe. Please try again.'
        };
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
