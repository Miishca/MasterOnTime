import { ApiError, getToken } from '../../services/auth/authApi';
import type { Booking } from '../../types';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const BOOKINGS_API = `${API_BASE}/api/bookings`;

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

/**
 * Available slots for a specialist on a date (yyyy-mm-dd).
 * `specialistId` is the specialist's USER id. Returns ISO datetime strings.
 */
export const getAvailableSlots = async (
  specialistId: number,
  date: string
): Promise<string[]> => {
  const res = await fetch(
    `${BOOKINGS_API}/available-slots?specialistId=${specialistId}&date=${date}`,
    { headers: authHeaders() }
  );
  return unwrap<string[]>(res);
};

/** Book a slot. `specialistId` is the specialist's USER id; startTime is an ISO string. */
export const createBooking = async (
  specialistId: number,
  startTime: string
): Promise<Booking> => {
  const res = await fetch(BOOKINGS_API, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ specialistId, startTime }),
  });
  return unwrap<Booking>(res);
};

/** Bookings where the signed-in user is the client, plus upcoming appointments. */
export const getMyBookings = async (): Promise<Booking[]> => {
  const [confirmed, upcoming] = await Promise.all([
    fetch(`${BOOKINGS_API}/confirmed`, { headers: authHeaders() }).then((r) =>
      unwrap<Booking[]>(r)
    ),
    fetch(`${BOOKINGS_API}/appointments/upcoming`, {
      headers: authHeaders(),
    }).then((r) => unwrap<Booking[]>(r)),
  ]);
  const byId = new Map<number, Booking>();
  for (const b of [...upcoming, ...confirmed]) byId.set(b.id, b);
  return [...byId.values()].sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const cancelBooking = async (id: number): Promise<void> => {
  const res = await fetch(`${BOOKINGS_API}/${id}/cancel`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return unwrap<void>(res);
};
