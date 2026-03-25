import { useState, useCallback } from "react";
import { Recipe, UserReview } from "@/lib/api";

// Generic localStorage helper
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// === Saved Recipes ===
export function useSavedRecipes() {
  const [saved, setSaved] = useState<Recipe[]>(() => getStored("saved_recipes", []));

  const toggleSave = useCallback((recipe: Recipe) => {
    setSaved((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      const next = exists ? prev.filter((r) => r.id !== recipe.id) : [...prev, recipe];
      setStored("saved_recipes", next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.some((r) => r.id === id), [saved]);

  return { saved, toggleSave, isSaved };
}

// === User Reviews ===
export function useUserReviews() {
  const [reviews, setReviews] = useState<UserReview[]>(() => getStored("user_reviews", []));

  const addReview = useCallback((review: UserReview) => {
    setReviews((prev) => {
      const next = [review, ...prev.filter((r) => r.recipeId !== review.recipeId)];
      setStored("user_reviews", next);
      return next;
    });
  }, []);

  return { reviews, addReview };
}

// === Meal Plan ===
export interface MealPlanEntry {
  day: string; // "Monday", etc.
  meal: string; // "breakfast", "lunch", "dinner"
  recipe: Recipe;
}

export function useMealPlan() {
  const [plan, setPlan] = useState<MealPlanEntry[]>(() => getStored("meal_plan", []));

  const addToPlan = useCallback((entry: MealPlanEntry) => {
    setPlan((prev) => {
      const next = [...prev.filter((e) => !(e.day === entry.day && e.meal === entry.meal)), entry];
      setStored("meal_plan", next);
      return next;
    });
  }, []);

  const removeFromPlan = useCallback((day: string, meal: string) => {
    setPlan((prev) => {
      const next = prev.filter((e) => !(e.day === day && e.meal === meal));
      setStored("meal_plan", next);
      return next;
    });
  }, []);

  const clearPlan = useCallback(() => {
    setPlan([]);
    setStored("meal_plan", []);
  }, []);

  const getEntry = useCallback((day: string, meal: string) => plan.find((e) => e.day === day && e.meal === meal), [plan]);

  return { plan, addToPlan, removeFromPlan, clearPlan, getEntry };
}

// === Profile ===
export interface ProfileData {
  name: string;
  dietary: string[];
  allergies: string[];
  skillLevel: string;
  preferred: string[];
  avoid: string[];
}

const defaultProfile: ProfileData = {
  name: "",
  dietary: [],
  allergies: [],
  skillLevel: "intermediate",
  preferred: [],
  avoid: [],
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(() => getStored("user_profile", defaultProfile));

  const saveProfile = useCallback((data: ProfileData) => {
    setProfile(data);
    setStored("user_profile", data);
  }, []);

  return { profile, saveProfile };
}
