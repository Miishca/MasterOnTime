import { ApiError, getToken } from '../../services/auth/authApi';
import type { SpecialistReview } from '../../types';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';

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

/** Public — visible reviews for a specialist (`id` is the USER id). */
export const getSpecialistReviews = async (
  id: number | string
): Promise<SpecialistReview[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/specialists/${id}/reviews`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

/** Can the signed-in user leave a review for this booking? */
export const canReview = async (bookingId: number): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/api/reviews/can-review/${bookingId}`, {
    headers: authHeaders(),
  });
  return unwrap<boolean>(res);
};

export const submitReview = async (
  bookingId: number,
  rating: number,
  comment: string
): Promise<unknown> => {
  const res = await fetch(`${API_BASE}/api/reviews/booking/${bookingId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(comment ? { rating, comment } : { rating }),
  });
  return unwrap<unknown>(res);
};
