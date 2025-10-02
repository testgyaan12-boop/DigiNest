
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || `HTTP error! status: ${response.status}`);
    } catch (e) {
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

const getAuthHeader = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  const token = localStorage.getItem('jwttoken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const makeRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => 
  async (url: string, data?: any) => {
    const response = await fetch(`/api${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(response);
};

export const api = {
  get: makeRequest('GET'),
  post: makeRequest('POST'),
  put: makeRequest('PUT'),
  delete: makeRequest('DELETE'),
};
