const BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000/api';

export const apiClient = {
  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  },

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  }
};
