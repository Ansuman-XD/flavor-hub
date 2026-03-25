import { Recipe, RecipeDetail, UserReview } from "./api";

const images = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=400&fit=crop",
];

const titles = [
  "Tuscan Tomato Basil Pasta", "Butter Chicken Masala", "Grilled Salmon Bowl",
  "Mediterranean Quinoa Salad", "Crispy Tofu Stir Fry", "Classic Margherita Pizza",
  "Thai Green Curry", "Avocado Toast Supreme", "Beef Bulgogi Rice Bowl",
  "Spinach & Feta Stuffed Chicken", "Mushroom Risotto", "Shrimp Pad Thai",
];

const cuisines = ["Italian", "Indian", "Japanese", "Mediterranean", "Chinese", "Thai", "Korean", "American"];
const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
const dietTypes = ["veg", "non-veg", "vegan", "gluten-free"];

export const mockRecipes: Recipe[] = titles.map((title, i) => ({
  id: `recipe-${i + 1}`,
  title,
  image: images[i % images.length],
  rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
  cookingTime: [15, 20, 25, 30, 35, 40, 45, 60][i % 8],
  cuisine: cuisines[i % cuisines.length],
  mealType: mealTypes[i % mealTypes.length],
  dietType: dietTypes[i % dietTypes.length],
}));

export const getRecipeDetail = (id: string): RecipeDetail | undefined => {
  const recipe = mockRecipes.find((r) => r.id === id);
  if (!recipe) return undefined;
  return {
    ...recipe,
    ingredients: [
      "2 cups all-purpose flour", "1 tbsp olive oil", "3 cloves garlic, minced",
      "1 cup fresh basil leaves", "200g cherry tomatoes", "Salt and pepper to taste",
      "1/2 cup parmesan cheese", "1 tsp red chili flakes",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil.",
      "Cook the pasta according to package directions until al dente.",
      "While pasta cooks, heat olive oil in a large skillet over medium heat.",
      "Add minced garlic and cook until fragrant, about 1 minute.",
      "Add cherry tomatoes and cook until they begin to burst, about 5 minutes.",
      "Toss the drained pasta with the tomato mixture.",
      "Garnish with fresh basil, parmesan, and chili flakes.",
      "Serve immediately and enjoy!",
    ],
    nutrition: { calories: 420, protein: "18g", carbs: "52g", fat: "16g", fiber: "4g" },
    averageRating: recipe.rating,
    reviews: [
      { user: "Alice M.", rating: 5, comment: "Absolutely delicious! My family loved it.", date: "2024-12-01" },
      { user: "John D.", rating: 4, comment: "Great recipe, easy to follow. Will make again.", date: "2024-11-28" },
      { user: "Sarah K.", rating: 5, comment: "Perfect weeknight dinner. So flavorful!", date: "2024-11-15" },
    ],
  };
};

export const mockSavedRecipes: Recipe[] = mockRecipes.slice(0, 4);

export const mockUserReviews: UserReview[] = [
  { recipeId: "recipe-1", recipeTitle: "Tuscan Tomato Basil Pasta", recipeImage: images[0], rating: 5, comment: "My go-to weeknight pasta!", date: "2024-12-10" },
  { recipeId: "recipe-3", recipeTitle: "Grilled Salmon Bowl", recipeImage: images[2], rating: 4, comment: "Loved the freshness of this dish.", date: "2024-12-05" },
  { recipeId: "recipe-6", recipeTitle: "Classic Margherita Pizza", recipeImage: images[5], rating: 5, comment: "Better than my local pizzeria!", date: "2024-11-20" },
];
