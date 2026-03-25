import { Recipe, RecipeDetail, UserReview } from "./api";

const imgs = [
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
  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&h=400&fit=crop",
];

interface RawRecipe { title: string; cuisine: string; mealType: string; dietType: string; time: number }

const recipeData: RawRecipe[] = [
  // Italian
  { title: "Tuscan Tomato Basil Pasta", cuisine: "Italian", mealType: "dinner", dietType: "veg", time: 25 },
  { title: "Classic Margherita Pizza", cuisine: "Italian", mealType: "dinner", dietType: "veg", time: 40 },
  { title: "Mushroom Risotto", cuisine: "Italian", mealType: "dinner", dietType: "veg", time: 45 },
  { title: "Spaghetti Carbonara", cuisine: "Italian", mealType: "dinner", dietType: "non-veg", time: 30 },
  { title: "Penne Arrabbiata", cuisine: "Italian", mealType: "lunch", dietType: "vegan", time: 20 },
  { title: "Caprese Salad", cuisine: "Italian", mealType: "lunch", dietType: "veg", time: 10 },
  { title: "Bruschetta al Pomodoro", cuisine: "Italian", mealType: "snack", dietType: "vegan", time: 15 },
  { title: "Tiramisu", cuisine: "Italian", mealType: "snack", dietType: "veg", time: 30 },
  { title: "Lasagna Bolognese", cuisine: "Italian", mealType: "dinner", dietType: "non-veg", time: 60 },
  { title: "Minestrone Soup", cuisine: "Italian", mealType: "lunch", dietType: "vegan", time: 35 },
  { title: "Gnocchi with Pesto", cuisine: "Italian", mealType: "dinner", dietType: "veg", time: 25 },
  { title: "Italian Wedding Soup", cuisine: "Italian", mealType: "lunch", dietType: "non-veg", time: 40 },

  // Indian
  { title: "Butter Chicken Masala", cuisine: "Indian", mealType: "dinner", dietType: "non-veg", time: 45 },
  { title: "Paneer Tikka Masala", cuisine: "Indian", mealType: "dinner", dietType: "veg", time: 35 },
  { title: "Chana Masala", cuisine: "Indian", mealType: "lunch", dietType: "vegan", time: 30 },
  { title: "Dal Tadka", cuisine: "Indian", mealType: "lunch", dietType: "vegan", time: 25 },
  { title: "Aloo Gobi", cuisine: "Indian", mealType: "dinner", dietType: "vegan", time: 30 },
  { title: "Chicken Biryani", cuisine: "Indian", mealType: "dinner", dietType: "non-veg", time: 60 },
  { title: "Vegetable Samosa", cuisine: "Indian", mealType: "snack", dietType: "vegan", time: 45 },
  { title: "Palak Paneer", cuisine: "Indian", mealType: "dinner", dietType: "veg", time: 30 },
  { title: "Masala Dosa", cuisine: "Indian", mealType: "breakfast", dietType: "vegan", time: 35 },
  { title: "Tandoori Chicken", cuisine: "Indian", mealType: "dinner", dietType: "non-veg", time: 40 },
  { title: "Rajma Chawal", cuisine: "Indian", mealType: "lunch", dietType: "vegan", time: 40 },
  { title: "Pav Bhaji", cuisine: "Indian", mealType: "snack", dietType: "veg", time: 30 },
  { title: "Idli Sambar", cuisine: "Indian", mealType: "breakfast", dietType: "vegan", time: 25 },

  // Japanese
  { title: "Grilled Salmon Bowl", cuisine: "Japanese", mealType: "lunch", dietType: "non-veg", time: 20 },
  { title: "Chicken Katsu Curry", cuisine: "Japanese", mealType: "dinner", dietType: "non-veg", time: 35 },
  { title: "Miso Ramen", cuisine: "Japanese", mealType: "dinner", dietType: "non-veg", time: 45 },
  { title: "Vegetable Tempura", cuisine: "Japanese", mealType: "snack", dietType: "vegan", time: 25 },
  { title: "Sushi Roll Platter", cuisine: "Japanese", mealType: "lunch", dietType: "non-veg", time: 50 },
  { title: "Edamame", cuisine: "Japanese", mealType: "snack", dietType: "vegan", time: 10 },
  { title: "Teriyaki Tofu Bowl", cuisine: "Japanese", mealType: "lunch", dietType: "vegan", time: 20 },
  { title: "Gyoza Dumplings", cuisine: "Japanese", mealType: "snack", dietType: "non-veg", time: 30 },
  { title: "Okonomiyaki", cuisine: "Japanese", mealType: "dinner", dietType: "non-veg", time: 25 },
  { title: "Matcha Pancakes", cuisine: "Japanese", mealType: "breakfast", dietType: "veg", time: 20 },
  { title: "Tonkatsu Ramen", cuisine: "Japanese", mealType: "dinner", dietType: "non-veg", time: 50 },

  // Mediterranean
  { title: "Mediterranean Quinoa Salad", cuisine: "Mediterranean", mealType: "lunch", dietType: "vegan", time: 15 },
  { title: "Greek Moussaka", cuisine: "Mediterranean", mealType: "dinner", dietType: "non-veg", time: 60 },
  { title: "Falafel Wrap", cuisine: "Mediterranean", mealType: "lunch", dietType: "vegan", time: 30 },
  { title: "Hummus & Pita", cuisine: "Mediterranean", mealType: "snack", dietType: "vegan", time: 15 },
  { title: "Shakshuka", cuisine: "Mediterranean", mealType: "breakfast", dietType: "veg", time: 25 },
  { title: "Tabbouleh Salad", cuisine: "Mediterranean", mealType: "lunch", dietType: "vegan", time: 15 },
  { title: "Grilled Lamb Kofta", cuisine: "Mediterranean", mealType: "dinner", dietType: "non-veg", time: 35 },
  { title: "Stuffed Grape Leaves", cuisine: "Mediterranean", mealType: "snack", dietType: "vegan", time: 45 },
  { title: "Baba Ganoush", cuisine: "Mediterranean", mealType: "snack", dietType: "vegan", time: 20 },
  { title: "Mediterranean Grilled Fish", cuisine: "Mediterranean", mealType: "dinner", dietType: "non-veg", time: 30 },

  // Chinese
  { title: "Crispy Tofu Stir Fry", cuisine: "Chinese", mealType: "dinner", dietType: "vegan", time: 20 },
  { title: "Kung Pao Chicken", cuisine: "Chinese", mealType: "dinner", dietType: "non-veg", time: 25 },
  { title: "Mapo Tofu", cuisine: "Chinese", mealType: "dinner", dietType: "vegan", time: 20 },
  { title: "Sweet & Sour Pork", cuisine: "Chinese", mealType: "dinner", dietType: "non-veg", time: 35 },
  { title: "Egg Fried Rice", cuisine: "Chinese", mealType: "lunch", dietType: "veg", time: 15 },
  { title: "Hot & Sour Soup", cuisine: "Chinese", mealType: "lunch", dietType: "veg", time: 20 },
  { title: "Spring Rolls", cuisine: "Chinese", mealType: "snack", dietType: "vegan", time: 30 },
  { title: "Dim Sum Platter", cuisine: "Chinese", mealType: "lunch", dietType: "non-veg", time: 45 },
  { title: "Dan Dan Noodles", cuisine: "Chinese", mealType: "dinner", dietType: "non-veg", time: 25 },
  { title: "Congee with Ginger", cuisine: "Chinese", mealType: "breakfast", dietType: "veg", time: 30 },
  { title: "Wonton Soup", cuisine: "Chinese", mealType: "lunch", dietType: "non-veg", time: 35 },
  { title: "General Tso's Chicken", cuisine: "Chinese", mealType: "dinner", dietType: "non-veg", time: 30 },

  // Thai
  { title: "Thai Green Curry", cuisine: "Thai", mealType: "dinner", dietType: "non-veg", time: 30 },
  { title: "Shrimp Pad Thai", cuisine: "Thai", mealType: "dinner", dietType: "non-veg", time: 25 },
  { title: "Tom Yum Soup", cuisine: "Thai", mealType: "lunch", dietType: "non-veg", time: 20 },
  { title: "Mango Sticky Rice", cuisine: "Thai", mealType: "snack", dietType: "vegan", time: 30 },
  { title: "Thai Basil Fried Rice", cuisine: "Thai", mealType: "lunch", dietType: "non-veg", time: 15 },
  { title: "Papaya Salad", cuisine: "Thai", mealType: "lunch", dietType: "vegan", time: 10 },
  { title: "Thai Red Curry", cuisine: "Thai", mealType: "dinner", dietType: "vegan", time: 30 },
  { title: "Pad See Ew", cuisine: "Thai", mealType: "dinner", dietType: "non-veg", time: 20 },
  { title: "Thai Peanut Noodles", cuisine: "Thai", mealType: "lunch", dietType: "vegan", time: 15 },
  { title: "Coconut Chicken Soup", cuisine: "Thai", mealType: "lunch", dietType: "non-veg", time: 25 },
  { title: "Thai Fish Cakes", cuisine: "Thai", mealType: "snack", dietType: "non-veg", time: 25 },

  // Korean
  { title: "Beef Bulgogi Rice Bowl", cuisine: "Korean", mealType: "dinner", dietType: "non-veg", time: 30 },
  { title: "Kimchi Fried Rice", cuisine: "Korean", mealType: "lunch", dietType: "veg", time: 15 },
  { title: "Korean Fried Chicken", cuisine: "Korean", mealType: "dinner", dietType: "non-veg", time: 40 },
  { title: "Bibimbap", cuisine: "Korean", mealType: "lunch", dietType: "veg", time: 25 },
  { title: "Japchae Glass Noodles", cuisine: "Korean", mealType: "dinner", dietType: "veg", time: 25 },
  { title: "Tteokbokki", cuisine: "Korean", mealType: "snack", dietType: "veg", time: 20 },
  { title: "Korean Pancakes (Pajeon)", cuisine: "Korean", mealType: "snack", dietType: "veg", time: 20 },
  { title: "Sundubu Jjigae", cuisine: "Korean", mealType: "dinner", dietType: "veg", time: 25 },
  { title: "Kimbap Rolls", cuisine: "Korean", mealType: "lunch", dietType: "non-veg", time: 30 },
  { title: "Dakgalbi", cuisine: "Korean", mealType: "dinner", dietType: "non-veg", time: 35 },

  // American
  { title: "Avocado Toast Supreme", cuisine: "American", mealType: "breakfast", dietType: "vegan", time: 10 },
  { title: "Spinach & Feta Stuffed Chicken", cuisine: "American", mealType: "dinner", dietType: "non-veg", time: 40 },
  { title: "Classic Cheeseburger", cuisine: "American", mealType: "lunch", dietType: "non-veg", time: 20 },
  { title: "BBQ Pulled Pork Sandwich", cuisine: "American", mealType: "lunch", dietType: "non-veg", time: 45 },
  { title: "Caesar Salad", cuisine: "American", mealType: "lunch", dietType: "non-veg", time: 15 },
  { title: "Blueberry Pancakes", cuisine: "American", mealType: "breakfast", dietType: "veg", time: 20 },
  { title: "Mac & Cheese", cuisine: "American", mealType: "dinner", dietType: "veg", time: 25 },
  { title: "Grilled Chicken Wrap", cuisine: "American", mealType: "lunch", dietType: "non-veg", time: 15 },
  { title: "Buffalo Wings", cuisine: "American", mealType: "snack", dietType: "non-veg", time: 35 },
  { title: "Banana Oat Smoothie", cuisine: "American", mealType: "breakfast", dietType: "vegan", time: 5 },
  { title: "Chocolate Chip Cookies", cuisine: "American", mealType: "snack", dietType: "veg", time: 25 },
  { title: "Southwest Burrito Bowl", cuisine: "American", mealType: "lunch", dietType: "non-veg", time: 20 },
  { title: "New York Cheesecake", cuisine: "American", mealType: "snack", dietType: "veg", time: 60 },

  // Mexican
  { title: "Chicken Tacos al Pastor", cuisine: "Mexican", mealType: "dinner", dietType: "non-veg", time: 30 },
  { title: "Veggie Quesadilla", cuisine: "Mexican", mealType: "lunch", dietType: "veg", time: 15 },
  { title: "Guacamole & Chips", cuisine: "Mexican", mealType: "snack", dietType: "vegan", time: 10 },
  { title: "Enchiladas Rojas", cuisine: "Mexican", mealType: "dinner", dietType: "non-veg", time: 40 },
  { title: "Black Bean Soup", cuisine: "Mexican", mealType: "lunch", dietType: "vegan", time: 30 },
  { title: "Churros", cuisine: "Mexican", mealType: "snack", dietType: "veg", time: 25 },
  { title: "Huevos Rancheros", cuisine: "Mexican", mealType: "breakfast", dietType: "veg", time: 20 },
  { title: "Elote (Street Corn)", cuisine: "Mexican", mealType: "snack", dietType: "veg", time: 15 },

  // French
  { title: "French Onion Soup", cuisine: "French", mealType: "lunch", dietType: "veg", time: 45 },
  { title: "Crêpes Suzette", cuisine: "French", mealType: "breakfast", dietType: "veg", time: 25 },
  { title: "Ratatouille", cuisine: "French", mealType: "dinner", dietType: "vegan", time: 40 },
  { title: "Croque Monsieur", cuisine: "French", mealType: "lunch", dietType: "non-veg", time: 15 },
  { title: "Quiche Lorraine", cuisine: "French", mealType: "breakfast", dietType: "non-veg", time: 45 },
  { title: "Niçoise Salad", cuisine: "French", mealType: "lunch", dietType: "non-veg", time: 20 },
  { title: "Chocolate Mousse", cuisine: "French", mealType: "snack", dietType: "veg", time: 20 },
];

const ingredientSets: Record<string, string[]> = {
  Italian: ["olive oil", "garlic", "basil", "parmesan", "tomatoes", "mozzarella", "oregano", "pasta"],
  Indian: ["cumin", "turmeric", "garam masala", "ginger", "garlic", "onions", "cilantro", "chili"],
  Japanese: ["soy sauce", "rice vinegar", "sesame oil", "mirin", "nori", "ginger", "tofu", "rice"],
  Mediterranean: ["olive oil", "lemon", "chickpeas", "tahini", "parsley", "feta", "cucumber", "tomatoes"],
  Chinese: ["soy sauce", "sesame oil", "ginger", "garlic", "green onions", "rice wine", "cornstarch", "chili flakes"],
  Thai: ["coconut milk", "lemongrass", "fish sauce", "lime", "basil", "chili", "galangal", "palm sugar"],
  Korean: ["gochujang", "sesame oil", "soy sauce", "garlic", "green onions", "rice", "kimchi", "sesame seeds"],
  American: ["butter", "flour", "eggs", "cheese", "milk", "salt", "pepper", "garlic powder"],
  Mexican: ["cumin", "chili powder", "lime", "cilantro", "black beans", "avocado", "tortillas", "jalapeño"],
  French: ["butter", "cream", "shallots", "thyme", "wine", "flour", "eggs", "gruyère"],
};

const instructionTemplates = [
  "Prepare and measure all ingredients before starting.",
  "Heat the pan or pot over medium heat with a drizzle of oil.",
  "Add the aromatic ingredients and cook until fragrant, about 2 minutes.",
  "Add the main protein or vegetables and cook until lightly browned.",
  "Pour in the liquid ingredients and stir to combine.",
  "Season with salt, pepper, and spices to taste.",
  "Reduce heat and let simmer for the required time until cooked through.",
  "Garnish with fresh herbs and serve immediately.",
];

export const mockRecipes: Recipe[] = recipeData.map((r, i) => ({
  id: `recipe-${i + 1}`,
  title: r.title,
  image: imgs[i % imgs.length],
  rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
  cookingTime: r.time,
  cuisine: r.cuisine,
  mealType: r.mealType,
  dietType: r.dietType,
}));

export const getRecipeDetail = (id: string): RecipeDetail | undefined => {
  const recipe = mockRecipes.find((r) => r.id === id);
  if (!recipe) return undefined;

  const ings = ingredientSets[recipe.cuisine] || ingredientSets["American"];
  const portions = ["1 cup", "2 tbsp", "200g", "3 cloves", "1/2 cup", "1 tsp", "150ml", "1 bunch"];

  return {
    ...recipe,
    ingredients: ings.map((ing, i) => `${portions[i % portions.length]} ${ing}`),
    instructions: instructionTemplates,
    nutrition: {
      calories: 250 + Math.floor(Math.random() * 400),
      protein: `${10 + Math.floor(Math.random() * 25)}g`,
      carbs: `${20 + Math.floor(Math.random() * 50)}g`,
      fat: `${5 + Math.floor(Math.random() * 25)}g`,
      fiber: `${2 + Math.floor(Math.random() * 8)}g`,
    },
    averageRating: recipe.rating,
    reviews: [
      { user: "Alice M.", rating: 5, comment: "Absolutely delicious! My family loved it.", date: "2024-12-01" },
      { user: "John D.", rating: 4, comment: "Great recipe, easy to follow. Will make again.", date: "2024-11-28" },
      { user: "Sarah K.", rating: 5, comment: "Perfect weeknight dinner. So flavorful!", date: "2024-11-15" },
    ],
  };
};

export const mockSavedRecipes: Recipe[] = [];
export const mockUserReviews: UserReview[] = [];
