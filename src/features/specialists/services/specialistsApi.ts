import type {
  PublicSpecialist,
  Specialist,
  SpecialistsSearchFilters,
} from '../../../types';
import { ApiError, getToken } from '../../../services/auth/authApi';
import { mapPublicSpecialist } from '../../../utils/mapPublicSpecialist';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const SPECIALISTS_API = `${API_BASE}/api/specialists`;

export interface SpecialistProfileInput {
  profession?: string;
  about?: string;
  price?: number;
  experience?: number;
  tags?: string[];
}

function buildSearchUrl(filters: SpecialistsSearchFilters): string {
  const params = new URLSearchParams();
  if (filters.serviceName) params.append('serviceName', filters.serviceName);
  if (filters.firstName) params.append('firstName', filters.firstName);
  if (filters.city) params.append('city', filters.city);
  if (filters.minExperience !== undefined)
    params.append('minExperience', String(filters.minExperience));
  if (filters.minRating !== undefined)
    params.append('minRating', String(filters.minRating));
  if (filters.categories?.length)
    for (const c of filters.categories) params.append('categories', c);

  const qs = params.toString();
  return qs ? `${SPECIALISTS_API}/search?${qs}` : SPECIALISTS_API;
}

/** Public — no auth needed. Returns [] on failure so the grid still renders. */
export const getSpecialists = async (
  filters: SpecialistsSearchFilters = {}
): Promise<Specialist[]> => {
  try {
    const res = await fetch(buildSearchUrl(filters));
    if (!res.ok) throw new Error(`Failed to fetch specialists: ${res.status}`);
    const data: PublicSpecialist[] = await res.json();
    return data.map(mapPublicSpecialist);
  } catch (error: unknown) {
    console.error('getSpecialists failed:', error);
    return [];
  }
};

/** Public — one specialist by id. Returns null if not found. */
export const getSpecialistById = async (
  id: string | number
): Promise<Specialist | null> => {
  try {
    const res = await fetch(`${SPECIALISTS_API}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch specialist: ${res.status}`);
    const data: PublicSpecialist = await res.json();
    return mapPublicSpecialist(data);
  } catch (error: unknown) {
    console.error('getSpecialistById failed:', error);
    return null;
  }
};

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) throw new ApiError(401, 'You are not signed in');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function unwrap(res: Response): Promise<PublicSpecialist> {
  if (res.ok) return res.json();
  let message = res.statusText || 'Request failed';
  try {
    const body = await res.json();
    if (typeof body?.message === 'string') message = body.message;
  } catch {
    /* non-JSON */
  }
  throw new ApiError(res.status, message);
}

/** SPECIALIST only — the signed-in specialist's own professional profile. */
export const getMyProfile = (): Promise<PublicSpecialist> =>
  fetch(`${SPECIALISTS_API}/me`, { headers: authHeaders() }).then(unwrap);

/** SPECIALIST only — edit own professional profile. Partial. */
export const updateMyProfile = (
  input: SpecialistProfileInput
): Promise<PublicSpecialist> =>
  fetch(`${SPECIALISTS_API}/me`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(input),
  }).then(unwrap);
