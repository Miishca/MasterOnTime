import { jwtDecode } from 'jwt-decode';
import type { RegisterRequest, UserProfile } from '../../types';

const API_BASE = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE || '';

const AUTH_API_BASE = `${API_BASE}/auth`;
const USER_API_BASE = `${API_BASE}/api/users`;

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export type Role = 'USER' | 'SPECIALIST' | 'ADMIN';
interface TokenPayload {
  sub: string;
  role: Role;
  email: string;
  exp: number;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
export const isAuthenticated = () => Boolean(getToken());

/** The role carried in the JWT, or null if there's no valid, unexpired token. */
export const getRole = (): Role | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = jwtDecode<TokenPayload>(token);
    if (payload.exp * 1000 < Date.now()) return null;
    return payload.role;
  } catch {
    return null;
  }
};

export const isAdmin = () => getRole() === 'ADMIN';

/**
 * Thrown for any non-2xx API response. Carries the HTTP status and the
 * human-readable message the backend sends as `{ message }`, plus optional
 * Zod `issues` for form-level validation errors.
 */
export class ApiError extends Error {
  status: number;
  issues?: unknown;

  constructor(status: number, message: string, issues?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.issues = issues;
  }
}

async function toApiError(res: Response): Promise<ApiError> {
  let message = res.statusText || 'Request failed';
  let issues: unknown;
  try {
    const body = await res.json();
    if (typeof body?.message === 'string') message = body.message;
    if (body?.issues) issues = body.issues;
  } catch {
    // non-JSON error body — keep the status text
  }
  return new ApiError(res.status, message, issues);
}

function authHeader(): Record<string, string> {
  const token = getToken();
  if (!token) throw new ApiError(401, 'You are not signed in');
  return { Authorization: `Bearer ${token}` };
}

export const login = async (email: string, password: string): Promise<string> => {
  const res = await fetch(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw await toApiError(res);

  const data: { token: string; refreshToken: string } = await res.json();
  setToken(data.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  return data.token;
};

/**
 * Revokes the current session's refresh token server-side, then clears both
 * tokens locally. Best-effort: if the backend call fails (offline, token
 * already gone), the local sign-out still happens — a failed revoke should
 * never trap someone in a "logged in" state on their own device.
 */
export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${AUTH_API_BASE}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      /* offline or already gone — still clear locally below */
    }
  }
  clearToken();
};

export const register = async (userData: RegisterRequest): Promise<UserProfile> => {
  const res = await fetch(`${AUTH_API_BASE}/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw await toApiError(res);

  return res.json();
};

/**
 * Always resolves (backend returns 200 even for an unknown email — no
 * user-enumeration). `devResetToken` is present only outside production,
 * while no real email provider is wired in.
 */
export const forgotPassword = async (
  email: string
): Promise<{ message: string; devResetToken?: string }> => {
  const res = await fetch(`${AUTH_API_BASE}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw await toApiError(res);

  return res.json();
};

export const resetPassword = async (
  token: string,
  password: string,
  repeatPassword: string
): Promise<void> => {
  const res = await fetch(`${AUTH_API_BASE}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password, repeatPassword }),
  });

  if (!res.ok) throw await toApiError(res);
};

export const getMyProfile = async (): Promise<UserProfile> => {
  const res = await fetch(`${USER_API_BASE}/me`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!res.ok) throw await toApiError(res);

  return res.json();
};

export const updateProfile = async (
  userData: Partial<UserProfile> & { profileImageBase64?: string }
): Promise<UserProfile> => {
  const res = await fetch(`${USER_API_BASE}/me`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw await toApiError(res);

  return res.json();
};
