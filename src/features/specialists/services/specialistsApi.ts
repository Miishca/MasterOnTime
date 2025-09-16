import { getToken } from '../../../services/auth/authApi';
import type { UserProfile, Specialist, SpecialistsSearchFilters } from '../../../types';
import { mapUserToSpecialist } from '../../../utils/mapUserToSpecialist';

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE || '');

const SPECIALISTS_SEARCH_API = `${API_BASE}/api/specialists/search`;
const SPECIALISTS_LIST_API  = `${API_BASE}/api/users/specialists`;

export const getSpecialists = async (
  filters: SpecialistsSearchFilters = {}
): Promise<Specialist[]> => {
  try {
    const token = getToken();
    const hasAny = Object.keys(filters).length > 0;

    let url = SPECIALISTS_LIST_API;
    if (hasAny) {
      const params = new URLSearchParams();
      if (filters.serviceName) params.append('serviceName', filters.serviceName);
      if (filters.firstName)   params.append('firstName',   filters.firstName);
      if (filters.city)        params.append('city',        filters.city);
      if (filters.minExperience !== undefined) params.append('minExperience', String(filters.minExperience));
      if (filters.minRating     !== undefined) params.append('minRating',     String(filters.minRating));
      if (filters.categories?.length) for (const c of filters.categories) params.append('categories', c);
      url = `${SPECIALISTS_SEARCH_API}?${params.toString()}`;
    }

    const res = await fetch(url, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
    if (!res.ok) throw new Error(`Failed to fetch specialists: ${res.status} ${res.statusText}`);

    const data: UserProfile[] = await res.json();
    return data.map(mapUserToSpecialist);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('getSpecialists failed:', error);
    return [];
  }
};

