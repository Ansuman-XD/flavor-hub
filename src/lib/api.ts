const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth
  register: (data: { name: string; email: string; password: string }) =>
    request<{ token: string }>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  // Profile
  getProfile: () => request<UserProfile>("/user/profile"),
  updateProfile: (data: Partial<UserProfile>) =>
    request<UserProfile>("/user/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Recipes
  searchRecipes: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return request<{ recipes: Recipe[]; total: number }>(`/recipes/search?${qs}`);
  },
  getRecipe: (id: string) => request<RecipeDetail>(`/recipes/${encodeURIComponent(id)}`),
  saveRecipe: (id: string) =>
    request<void>(`/recipes/${encodeURIComponent(id)}/save`, { method: "POST" }),
  addReview: (id: string, data: { rating: number; comment: string }) =>
    request<void>(`/recipes/${encodeURIComponent(id)}/review`, { method: "POST", body: JSON.stringify(data) }),

  // User data
  getSavedRecipes: () => request<Recipe[]>("/user/saved"),
  getUserReviews: () => request<UserReview[]>("/user/reviews"),
};

export interface UserProfile {
  name: string;
  email: string;
  dietaryPreferences: string[];
  allergies: string[];
  skillLevel: string;
  preferredIngredients: string[];
  avoidIngredients: string[];
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  cookingTime: number;
  cuisine: string;
  mealType: string;
  dietType: string;
}

export interface RecipeDetail extends Recipe {
  ingredients: string[];
  instructions: string[];
  nutrition: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
  averageRating: number;
  reviews: { user: string; rating: number; comment: string; date: string }[];
}

export interface UserReview {
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
  rating: number;
  comment: string;
  date: string;
}
