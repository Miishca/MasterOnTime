import { ApiError, apiFetch } from '../../services/auth/authApi';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const PAYMENTS_API = `${API_BASE}/api/payments`;

export interface SavedCard {
  cardMask: string;
  cardType: string | null;
  createdAt: string;
}

interface CardSaveCheckout {
  checkoutUrl: string;
  data: string;
  signature: string;
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

export const getSavedCard = async (): Promise<SavedCard | null> => {
  const res = await apiFetch(`${PAYMENTS_API}/card`);
  return unwrap<SavedCard | null>(res);
};

export const removeSavedCard = async (): Promise<void> => {
  const res = await apiFetch(`${PAYMENTS_API}/card`, { method: 'DELETE' });
  return unwrap<void>(res);
};

/**
 * Kicks off "save a card" on LiqPay's hosted page: fetches a signed checkout
 * payload from our backend, then submits it via a real (hidden) HTML form
 * POST — LiqPay's checkout endpoint expects a form submission, not a fetch,
 * since it renders their own card-entry page and eventually redirects the
 * browser back to result_url. This function navigates away; it never returns.
 */
export const redirectToCardCheckout = async (): Promise<void> => {
  const res = await apiFetch(`${PAYMENTS_API}/card/init`, { method: 'POST' });
  const { checkoutUrl, data, signature } = await unwrap<CardSaveCheckout>(res);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = checkoutUrl;
  form.style.display = 'none';

  const addField = (name: string, value: string) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  addField('data', data);
  addField('signature', signature);

  document.body.appendChild(form);
  form.submit();
};

/** Called once, after LiqPay redirects back with ?cardSaveOrderId=... in the URL. */
export const confirmCardSave = async (orderId: string): Promise<SavedCard> => {
  const res = await apiFetch(`${PAYMENTS_API}/card/confirm`, {
    method: 'POST',
    body: JSON.stringify({ orderId }),
  });
  return unwrap<SavedCard>(res);
};
