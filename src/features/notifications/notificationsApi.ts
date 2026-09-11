import { ApiError, getToken } from '../../services/auth/authApi';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const NOTIFICATIONS_API = `${API_BASE}/api/notifications`;

export interface AppNotification {
  id: number;
  type: string;
  title: string;
  body: string;
  read: boolean;
  bookingId: number | null;
  createdAt: string;
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

export const getNotifications = async (): Promise<AppNotification[]> => {
  const res = await fetch(NOTIFICATIONS_API, { headers: authHeaders() });
  return unwrap<AppNotification[]>(res);
};

export const getUnreadCount = async (): Promise<number> => {
  const res = await fetch(`${NOTIFICATIONS_API}/unread-count`, { headers: authHeaders() });
  const { count } = await unwrap<{ count: number }>(res);
  return count;
};

export const markNotificationRead = async (id: number): Promise<void> => {
  const res = await fetch(`${NOTIFICATIONS_API}/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};

export const markAllNotificationsRead = async (): Promise<void> => {
  const res = await fetch(`${NOTIFICATIONS_API}/read-all`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};
