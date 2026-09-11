import { ApiError, apiFetch } from '../../services/auth/authApi';

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
  const res = await apiFetch(NOTIFICATIONS_API);
  return unwrap<AppNotification[]>(res);
};

export const getUnreadCount = async (): Promise<number> => {
  const res = await apiFetch(`${NOTIFICATIONS_API}/unread-count`);
  const { count } = await unwrap<{ count: number }>(res);
  return count;
};

export const markNotificationRead = async (id: number): Promise<void> => {
  const res = await apiFetch(`${NOTIFICATIONS_API}/${id}/read`, { method: 'PATCH' });
  return unwrap<void>(res);
};

export const markAllNotificationsRead = async (): Promise<void> => {
  const res = await apiFetch(`${NOTIFICATIONS_API}/read-all`, { method: 'POST' });
  return unwrap<void>(res);
};
