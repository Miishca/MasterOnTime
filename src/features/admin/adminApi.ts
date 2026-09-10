import { ApiError, getToken, type Role } from '../../services/auth/authApi';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const ADMIN_API = `${API_BASE}/api/admin`;

export interface AdminUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  city: string | null;
  phoneNumber: string | null;
  role: Role;
  isDeleted: boolean;
  createdAt: string;
  hasSpecialistProfile: boolean;
}

export interface SpecialistProfileInput {
  profession?: string;
  about?: string;
  price?: number;
  experience?: number;
  tags?: string[];
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) throw new ApiError(401, 'You are not signed in');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function unwrap(res: Response) {
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

/** GET /api/admin/users — ADMIN only. `search` matches email / first / last name. */
export const listUsers = async (search?: string): Promise<AdminUser[]> => {
  const qs = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${ADMIN_API}/users${qs}`, { headers: authHeaders() });
  return unwrap(res);
};

/** PATCH /api/admin/users/:id/role — ADMIN only. Promoting to SPECIALIST upserts a profile. */
export const setUserRole = async (
  id: number,
  role: Role,
  profile?: SpecialistProfileInput
): Promise<AdminUser> => {
  const res = await fetch(`${ADMIN_API}/users/${id}/role`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(profile ? { role, profile } : { role }),
  });
  return unwrap(res);
};
