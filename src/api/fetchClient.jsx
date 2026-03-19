// Grab the base URL from your .env file
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const fetchClient = async (endpoint, options = {}) => {
  // 1. Get the token from sessionStorage (Ultra-secure: dies when browser closes)
  const token = sessionStorage.getItem('pradhan_token');

  // 2. Setup standard headers
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  // 3. Attach Bearer Token if the user is logged in
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 4. Configure the fetch payload
  const config = {
    ...options,
    headers,
  };

  try {
    // 5. Fire the actual request to your Node.js backend
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // 6. 🚨 SECURITY NET: If the backend says the token is expired/invalid
    if (response.status === 401) {
      sessionStorage.removeItem('pradhan_token'); // Wipe the dead token
      window.location.href = '/login';            // Kick them to the login screen
      throw new Error('Session expired. Please log in again.');
    }

    // 7. Parse the JSON response
    const data = await response.json();

    // 8. Catch backend AppError messages 
    if (!response.ok) {
      // If it's just a 404 (Empty Data), don't throw a massive error, just return empty!
      if (response.status === 404) {
        return { data: {} }; 
      }
      throw new Error(data.message || 'An error occurred with the server.');
    }

    return data; // Return the clean data to your components!

  } catch (error) {
    // Pass the error down so react-hot-toast can display it
    throw error;
  }
};