import type { RegisterRequest, UserProfile } from '../../types';

const AUTH_API_BASE = 'http://localhost:8080/auth';
const USER_API_BASE = 'http://localhost:8080/api/users';

export const getToken = () => localStorage.getItem('token');

export const login = async (email: string, password: string) => {
  const res = await fetch(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data.token;
};

export const register = async (userData: RegisterRequest) => {
  const res = await fetch(`${AUTH_API_BASE}/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Registration failed: ${errorText}`);
  }

  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};


export const getMyProfile = async (): Promise<UserProfile> => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  const res = await fetch(`${USER_API_BASE}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('API Error Response:', errorText);
    throw new Error(`Failed to fetch profile: ${res.status} ${errorText}`);
  }

  const data: UserProfile = await res.json();
  return data;
};

export const updateProfile = async (
  userData: Partial<UserProfile>
): Promise<UserProfile> => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found.');

  const res = await fetch(`${USER_API_BASE}/me`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update user profile: ${res.status} ${text}`);
  }

  const updatedProfile: UserProfile = await res.json();
  return updatedProfile;
};
