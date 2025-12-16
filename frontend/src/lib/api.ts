// Enhanced API client with admin routes

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://project-web-5cld.onrender.com/api/v1'

// Types
export interface Store {
  id: number;
  name_ar: string;
  name_en: string;
  location_url: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
  created_at?: string;
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

// Public API Functions

export async function getStores(): Promise<Store[]> {
  const response = await fetch(`${API_BASE_URL}/stores`);
  if (!response.ok) throw new Error('Failed to fetch stores');
  return response.json();
}

export async function getGifts(filters?: any): Promise<Gift[]> {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/gifts?${params}`);
  if (!response.ok) throw new Error('Failed to fetch gifts');
  return response.json();
}

export async function getRecommendations(criteria: RecommendationCriteria): Promise<Recommendation[]> {
  const response = await fetch(`${API_BASE_URL}/gifts/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(criteria),
  });
  if (!response.ok) throw new Error('Failed to get recommendations');
  return response.json();
}

export async function getInterests(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/interests`);
  if (!response.ok) throw new Error('Failed to fetch interests');
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

// Admin API Functions

export async function adminLogin(username: string, password: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  return response.json();
}

export async function adminLogout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Logout failed');
}

export async function checkAdminAuth(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/check`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Not authenticated');
  return response.json();
}

export async function getAdminStats(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

// Admin Stores Management

export async function getAdminStores(): Promise<Store[]> {
  const response = await fetch(`${API_BASE_URL}/admin/stores`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch stores');
  return response.json();
}

export async function createStore(store: Partial<Store>): Promise<Store> {
  const response = await fetch(`${API_BASE_URL}/admin/stores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(store),
  });
  if (!response.ok) throw new Error('Failed to create store');
  return response.json();
}

export async function updateStore(id: number, store: Partial<Store>): Promise<Store> {
  const response = await fetch(`${API_BASE_URL}/admin/stores/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(store),
  });
  if (!response.ok) throw new Error('Failed to update store');
  return response.json();
}

export async function deleteStore(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/stores/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete store');
}

// Admin Gifts Management

export async function getAdminGifts(): Promise<Gift[]> {
  const response = await fetch(`${API_BASE_URL}/admin/gifts`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch gifts');
  return response.json();
}

export async function createGift(gift: Partial<Gift>): Promise<Gift> {
  const response = await fetch(`${API_BASE_URL}/admin/gifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(gift),
  });
  if (!response.ok) throw new Error('Failed to create gift');
  return response.json();
}

export async function updateGift(id: number, gift: Partial<Gift>): Promise<Gift> {
  const response = await fetch(`${API_BASE_URL}/admin/gifts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(gift),
  });
  if (!response.ok) throw new Error('Failed to update gift');
  return response.json();
}

export async function deleteGift(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/gifts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete gift');
}
