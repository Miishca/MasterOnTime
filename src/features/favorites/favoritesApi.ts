import { ApiError, apiFetch, getToken } from '../../services/auth/authApi';
import type { PublicSpecialist, Specialist } from '../../types';
import { mapPublicSpecialist } from '../../utils/mapPublicSpecialist';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const FAVORITES_API = `${API_BASE}/api/favorites`;

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
  const res = await apiFetch(FAVORITES_API);
  const data = await unwrap<PublicSpecialist[]>(res);
  return data.map(mapPublicSpecialist);
};

/** Cheap set of favorited specialist (User) ids, for highlighting cards. Returns [] if not signed in. */
export const getFavoriteIds = async (): Promise<number[]> => {
  if (!getToken()) return [];
  try {
    const res = await apiFetch(`${FAVORITES_API}/ids`);
    return await unwrap<number[]>(res);
  } catch {
    return [];
  }
};

export const addFavorite = async (specialistId: number): Promise<void> => {
  const res = await apiFetch(`${FAVORITES_API}/${specialistId}`, { method: 'POST' });
  return unwrap<void>(res);
};

export const removeFavorite = async (specialistId: number): Promise<void> => {
  const res = await apiFetch(`${FAVORITES_API}/${specialistId}`, { method: 'DELETE' });
  return unwrap<void>(res);
};
