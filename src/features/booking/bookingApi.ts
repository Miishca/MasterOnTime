import { ApiError, apiFetch, getRole } from '../../services/auth/authApi';
import type { Booking } from '../../types';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const BOOKINGS_API = `${API_BASE}/api/bookings`;

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

/**
 * Available slots for a specialist on a date (yyyy-mm-dd).
 * `specialistId` is the specialist's USER id. Returns ISO datetime strings.
 */
export const getAvailableSlots = async (
  specialistId: number,
  date: string,
  serviceItemId?: number
): Promise<string[]> => {
  const params = new URLSearchParams({ specialistId: String(specialistId), date });
  if (serviceItemId) params.set('serviceItemId', String(serviceItemId));
  const res = await apiFetch(`${BOOKINGS_API}/available-slots?${params.toString()}`);
  return unwrap<string[]>(res);
};

/** Book a slot. `specialistId` is the specialist's USER id; startTime is an ISO string. */
export const createBooking = async (
  specialistId: number,
  startTime: string,
  serviceItemId?: number
): Promise<Booking> => {
  const res = await apiFetch(BOOKINGS_API, {
    method: 'POST',
    body: JSON.stringify(
      serviceItemId
        ? { specialistId, startTime, serviceItemId }
        : { specialistId, startTime }
    ),
  });
  return unwrap<Booking>(res);
};

/**
 * The signed-in user's bookings. For a USER (client): full history, any
 * status (CONFIRMED, COMPLETED, CANCELLED, RESCHEDULE_REQUESTED) — expired
 * CONFIRMED bookings are lazily flipped to COMPLETED by the backend on this
 * read. `/history` is client-only on the backend, so a SPECIALIST instead
 * gets their upcoming appointments (as the specialist side of the booking).
 */
export const getMyBookings = async (): Promise<Booking[]> => {
  const path = getRole() === 'SPECIALIST' ? 'appointments/upcoming' : 'history';
  const res = await apiFetch(`${BOOKINGS_API}/${path}`);
  return unwrap<Booking[]>(res);
};

export const cancelBooking = async (id: number): Promise<void> => {
  const res = await apiFetch(`${BOOKINGS_API}/${id}/cancel`, { method: 'POST' });
  return unwrap<void>(res);
};
