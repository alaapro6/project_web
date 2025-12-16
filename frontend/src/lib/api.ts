/// <reference types="vite/client" />

// ===============================
// Enhanced API Client (FINAL FIX)
// ===============================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://project-web-5cld.onrender.com/api/v1';

// ===============================
// Helpers
// ===============================

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      message = data?.error || data?.message || message;
    } catch {}
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

// ===============================
// Types
// ===============================

export interface Store {
  id: number;
  name_ar: string;
  name_en: string;
  location_url: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
  created_at?: string;
  // ✅ تم إضافة هذا الحقل لحل خطأ StoreCard
  gifts_count?: number;
}

export interface Gift {
  id: number;
  store_id: number;
  name_ar: string;
  name_en: string;
  category: string;
  min_age: number;
  max_age: number;
  min_budget: number;
  max_budget: number;
  gender?: string;
  occasion?: string;
  personality_type?: string;
  interests: string[];
  image_url?: string;
  description_ar?: string;
  description_en?: string;
  store?: Store;
}

export interface RecommendationCriteria {
  age: number;
  budget: number;
  interests: string[];
  gender?: string;
  occasion?: string;
  personality_type?: string;
  relationship?: string;
}

export interface Recommendation {
  gift: Gift;
  score: number;
  match_details: any;
}

// ===============================
// Public API
// ===============================

export async function getStores(): Promise<Store[]> {
  const res = await fetch(`${API_BASE_URL}/stores`);
  return handleResponse<Store[]>(res);
}

export async function getGifts(
  filters?: Record<string, any>
): Promise<Gift[]> {
  const params = filters
    ? new URLSearchParams(filters).toString()
    : '';
  const res = await fetch(`${API_BASE_URL}/gifts?${params}`);
  return handleResponse<Gift[]>(res);
}

export async function getRecommendations(
  criteria: RecommendationCriteria
): Promise<Recommendation[]> {
  const res = await fetch(`${API_BASE_URL}/gifts/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(criteria),
  });
  return handleResponse<Recommendation[]>(res);
}

export async function getInterests(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/interests`);
  return handleResponse<string[]>(res);
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/categories`);
  return handleResponse<string[]>(res);
}

// ===============================
// Admin Auth
// ===============================

export async function adminLogin(
  username: string,
  password: string
): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse<{ token: string }>(res);
  localStorage.setItem('admin_token', data.token);
  return data;
}

export function adminLogout() {
  localStorage.removeItem('admin_token');
}

// ===============================
// Admin Dashboard
// ===============================

export async function getAdminStats(): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

// ===============================
// Admin Stores
// ===============================

export async function getAdminStores(): Promise<Store[]> {
  const res = await fetch(`${API_BASE_URL}/admin/stores`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<Store[]>(res);
}

export async function createStore(
  store: Partial<Store>
): Promise<Store> {
  const res = await fetch(`${API_BASE_URL}/admin/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(store),
  });
  return handleResponse<Store>(res);
}

export async function updateStore(
  id: number,
  store: Partial<Store>
): Promise<Store> {
  const res = await fetch(`${API_BASE_URL}/admin/stores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(store),
  });
  return handleResponse<Store>(res);
}

export async function deleteStore(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/stores/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse(res);
}

// ===============================
// Admin Gifts
// ===============================

export async function getAdminGifts(): Promise<Gift[]> {
  const res = await fetch(`${API_BASE_URL}/admin/gifts`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<Gift[]>(res);
}

export async function createGift(
  gift: Partial<Gift>
): Promise<Gift> {
  const res = await fetch(`${API_BASE_URL}/admin/gifts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(gift),
  });
  return handleResponse<Gift>(res);
}

export async function updateGift(
  id: number,
  gift: Partial<Gift>
): Promise<Gift> {
  const res = await fetch(`${API_BASE_URL}/admin/gifts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(gift),
  });
  return handleResponse<Gift>(res);
}

export async function deleteGift(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/gifts/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse(res);
}
