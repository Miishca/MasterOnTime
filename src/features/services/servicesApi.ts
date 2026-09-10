import { ApiError, getToken } from '../../services/auth/authApi';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const CATEGORIES_API = `${API_BASE}/api/specialist/categories`;

export interface ServiceItem {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface ServiceCategory {
  id: number;
  name: string;
  items: ServiceItem[];
}

export interface ServiceItemInput {
  name: string;
  durationMinutes: number;
  price: number;
}

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

/** SPECIALIST — the signed-in specialist's own categories + services. */
export const getMyCategories = async (): Promise<ServiceCategory[]> => {
  const res = await fetch(CATEGORIES_API, { headers: authHeaders() });
  return unwrap<ServiceCategory[]>(res);
};

export const createCategory = async (name: string): Promise<ServiceCategory> => {
  const res = await fetch(CATEGORIES_API, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });
  return unwrap<ServiceCategory>(res);
};

export const renameCategory = async (
  id: number,
  name: string
): Promise<ServiceCategory> => {
  const res = await fetch(`${CATEGORIES_API}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });
  return unwrap<ServiceCategory>(res);
};

export const deleteCategory = async (id: number): Promise<void> => {
  const res = await fetch(`${CATEGORIES_API}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};

export const addServiceItem = async (
  categoryId: number,
  input: ServiceItemInput
): Promise<ServiceItem> => {
  const res = await fetch(`${CATEGORIES_API}/${categoryId}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  return unwrap<ServiceItem>(res);
};

export const updateServiceItem = async (
  itemId: number,
  input: ServiceItemInput
): Promise<ServiceItem> => {
  const res = await fetch(`${CATEGORIES_API}/items/${itemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  return unwrap<ServiceItem>(res);
};

export const deleteServiceItem = async (itemId: number): Promise<void> => {
  const res = await fetch(`${CATEGORIES_API}/items/${itemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};

/** Public — categories + services for a specialist (USER id), for the booking screen. */
export const getSpecialistServices = async (
  specialistId: number | string
): Promise<ServiceCategory[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/specialists/${specialistId}/services`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
