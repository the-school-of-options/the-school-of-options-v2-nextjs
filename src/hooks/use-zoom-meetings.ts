import { useState, useEffect } from 'react';

interface ZoomWebinar {
  id: string;
  topic: string;
  start_time: string;
  timezone: string;
  duration: number;
  join_url?: string;
  registration_url?: string;
}

interface ZoomWebinarsResponse {
  items: ZoomWebinar[];
  next_page_token?: string;
}

interface UseZoomWebinarsReturn {
  webinars: ZoomWebinar[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useZoomWebinars(): UseZoomWebinarsReturn {
  const [webinars, setWebinars] = useState<ZoomWebinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/meetings/upcoming', {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle specific error types with user-friendly messages
        if (errorData.error === 'config_error') {
          throw new Error('Zoom API is not configured. Please contact support.');
        } else if (errorData.error === 'token_error') {
          throw new Error('Unable to connect to Zoom. Please try again later.');
        } else if (errorData.error === 'zoom_auth_error') {
          throw new Error('Zoom authentication failed. The session has been refreshed - please try again.');
        } else if (errorData.error === 'zoom_permission_error') {
          throw new Error('Insufficient permissions to access webinars.');
        } else {
          throw new Error(errorData.detail || `HTTP ${response.status}`);
        }
      }
      
      const data: ZoomWebinarsResponse = await response.json();
      setWebinars(data.items || []);
    } catch (err) {
      console.error('Failed to fetch Zoom webinars:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch webinars');
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  return {
    webinars,
    loading,
    error,
    refetch: fetchWebinars
  };
}
