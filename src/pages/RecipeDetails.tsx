import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetail, mockRecipes } from "@/lib/mockData";
import { useSavedRecipes, useUserReviews } from "@/hooks/useLocalStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Clock, Star, Heart, Flame, Drumstick, Wheat, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = getRecipeDetail(id || "");
  const baseRecipe = mockRecipes.find((r) => r.id === id);
  const { toggleSave, isSaved } = useSavedRecipes();
  const { addReview } = useUserReviews();
  const { user } = useAuth();
  const saved = baseRecipe ? isSaved(baseRecipe.id) : false;
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!recipe || !baseRecipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-2xl font-display text-foreground mb-4">Recipe not found</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Recipes</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toggleSave(baseRecipe);
    toast({ title: saved ? "Removed from saved" : "Recipe saved! ❤️" });
  };

  const handleReview = () => {
    if (!userRating) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    addReview({
      recipeId: baseRecipe.id,
      recipeTitle: baseRecipe.title,
      recipeImage: baseRecipe.image,
      rating: userRating,
      comment: reviewText,
      date: new Date().toISOString().split("T")[0],
    });
    toast({ title: "Review submitted! Thanks! 🌟" });
    setReviewText("");
    setUserRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 font-body">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-8">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 font-body text-sm">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {recipe.cookingTime} min</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-golden text-golden" /> {recipe.averageRating}</span>
                <span className="capitalize">{recipe.cuisine}</span>
                <span className="capitalize text-herb font-semibold">{recipe.dietType}</span>
              </div>
            </div>
            <Button
              variant={saved ? "default" : "outline"}
              size="icon"
              className="absolute top-4 right-4"
              onClick={handleSave}
            >
              <Heart className={`h-5 w-5 ${saved ? "fill-primary-foreground" : ""}`} />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Ingredients */}
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-3 font-body text-foreground">
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4 font-body">
                      <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <p className="text-foreground pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  Reviews ({recipe.reviews.length})
                </h2>
                <div className="space-y-4 mb-6">
                  {recipe.reviews.map((r, i) => (
                    <div key={i} className="bg-muted rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body font-semibold text-foreground">{r.user}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star key={si} className={`h-3.5 w-3.5 ${si < r.rating ? "fill-golden text-golden" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-muted-foreground text-sm">{r.comment}</p>
                      <p className="font-body text-muted-foreground text-xs mt-2">{r.date}</p>
                    </div>
                  ))}
                </div>

                {/* Add review */}
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Add Your Review</h3>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} onClick={() => setUserRating(i + 1)}>
                        <Star className={`h-6 w-6 cursor-pointer transition-colors ${i < userRating ? "fill-golden text-golden" : "text-muted-foreground hover:text-golden"}`} />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="font-body"
                  />
                  <Button onClick={handleReview} className="font-body">Submit Review</Button>
                </div>
              </section>
            </div>

            {/* Nutrition sidebar */}
            <div>
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">Nutrition Info</h2>
                <div className="space-y-3">
                  {[
                    { icon: Flame, label: "Calories", value: `${recipe.nutrition.calories} kcal`, color: "text-coral" },
                    { icon: Drumstick, label: "Protein", value: recipe.nutrition.protein, color: "text-primary" },
                    { icon: Wheat, label: "Carbs", value: recipe.nutrition.carbs, color: "text-golden" },
                    { icon: Droplets, label: "Fat", value: recipe.nutrition.fat, color: "text-herb" },
                    { icon: Wheat, label: "Fiber", value: recipe.nutrition.fiber, color: "text-muted-foreground" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center justify-between font-body">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Icon className={`h-4 w-4 ${color}`} /> {label}
                      </span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetails;
