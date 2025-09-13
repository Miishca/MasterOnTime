// const API_BASE = 'http://localhost:8080/api/specialists';
// const ADMIN_API = 'http://localhost:8080/api/admin/users/search';

const API_BASE = import.meta.env.VITE_API_BASE;

// const SPECIALISTS_API = `${API_BASE}/api/specialists`;
const ADMIN_API = `${API_BASE}/api/admin/users/search`;


import type { UserProfile, Specialist, SearchFilters } from '../../../types';
import { mapUserToSpecialist } from '../../../utils/mapUserToSpecialist';

export const getSpecialists = async (
  filters: SearchFilters = {}
): Promise<Specialist[]> => {
  try {
    const hasFilters = filters.serviceType || filters.location;

    let res: Response;

    if (hasFilters) {
      const params = new URLSearchParams();
      if (filters.serviceType) params.append('serviceType', filters.serviceType);
      if (filters.location) params.append('location', filters.location);

      res = await fetch(`${API_BASE}/search?${params.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      res = await fetch(ADMIN_API, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
        },
      });
    }

    if (!res.ok) throw new Error('Failed to fetch specialists');

    const data: UserProfile[] = await res.json();

    return data.map(mapUserToSpecialist);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// export const getSpecialists = async (filters: SearchFilters): Promise<UserProfile[]> => {
//   const token = getToken();

//   const params = new URLSearchParams();
//   if (filters.id) params.append('id', filters.id);
//   if (filters.name) params.append('name', filters.name);
//   if (filters.city) params.append('city', filters.city);
//   if (filters.category) params.append('category', filters.category);

//   const res = await fetch(`${API_BASE}/search?${params.toString()}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) throw new Error('Failed to fetch specialists');

//   const data: UserProfile[] = await res.json();
//   return data ;
// };

// export const getSpecialistById = async (id: string): Promise<Specialist> => {
//   const token = getToken();
//   const res = await fetch(`${API_BASE}/${id}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   if (!res.ok) throw new Error('Failed to fetch specialist');
//   return res.json();
// };

// export const updateSpecialist = async (
//   id: string,
//   data: Partial<Specialist>
// ): Promise<Specialist | null> => {
//   const token = getToken();
//   const res = await fetch(`${API_BASE}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     console.error('Failed to update specialist');
//     return null;
//   }

//   return res.json();
// };
