import { ApiError, getToken } from '../../services/auth/authApi';
import type { PublicSpecialist, Specialist } from '../../types';
import { mapPublicSpecialist } from '../../utils/mapPublicSpecialist';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const FAVORITES_API = `${API_BASE}/api/favorites`;

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) throw new ApiError(401, 'You are not signed in');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function unwrap<T>(res: Response): Promise<T> {
  if (res.ok) return res.status === 204 ? (undefined as T) : res.json();
  let message = res.statusText || 'Request failed';
  try {
    const body = await res.json();
    if (typeof body?.message === 'string') message = body.message;
  } catch {
    /* non-JSON */
  }
  throw new ApiError(res.status, message);
}

export const getFavorites = async (): Promise<Specialist[]> => {
  const res = await fetch(FAVORITES_API, { headers: authHeaders() });
  const data = await unwrap<PublicSpecialist[]>(res);
  return data.map(mapPublicSpecialist);
};

/** Cheap set of favorited specialist (User) ids, for highlighting cards. Returns [] if not signed in. */
export const getFavoriteIds = async (): Promise<number[]> => {
  if (!getToken()) return [];
  try {
    const res = await fetch(`${FAVORITES_API}/ids`, { headers: authHeaders() });
    return await unwrap<number[]>(res);
  } catch {
    return [];
  }
};

export const addFavorite = async (specialistId: number): Promise<void> => {
  const res = await fetch(`${FAVORITES_API}/${specialistId}`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};

export const removeFavorite = async (specialistId: number): Promise<void> => {
  const res = await fetch(`${FAVORITES_API}/${specialistId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};
