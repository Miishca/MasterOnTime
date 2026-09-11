import { ApiError, apiFetch } from '../../services/auth/authApi';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';
const MY_PORTFOLIO_API = `${API_BASE}/api/specialist/portfolio`;

export interface PortfolioItem {
  id: number;
  imageUrl: string;
  caption: string;
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

/** SPECIALIST — own portfolio (for the manager on /profile). */
export const getMyPortfolio = async (): Promise<PortfolioItem[]> => {
  const res = await apiFetch(MY_PORTFOLIO_API);
  return unwrap<PortfolioItem[]>(res);
};

export const addPortfolioItem = async (
  imageBase64: string,
  caption: string
): Promise<PortfolioItem> => {
  const res = await apiFetch(MY_PORTFOLIO_API, {
    method: 'POST',
    body: JSON.stringify(caption ? { imageBase64, caption } : { imageBase64 }),
  });
  return unwrap<PortfolioItem>(res);
};

export const deletePortfolioItem = async (id: number): Promise<void> => {
  const res = await apiFetch(`${MY_PORTFOLIO_API}/${id}`, { method: 'DELETE' });
  return unwrap<void>(res);
};

/** Public — a specialist's (User id) portfolio. Returns [] on failure so the page still renders. */
export const getSpecialistPortfolio = async (
  specialistId: number | string
): Promise<PortfolioItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/specialists/${specialistId}/portfolio`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
