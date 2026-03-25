import { mockSavedRecipes } from "@/lib/mockData";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const SavedRecipes = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-display font-bold text-foreground">Saved Recipes</h1>
          </div>
        </motion.div>

        {mockSavedRecipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body text-lg">No saved recipes yet. Start exploring!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockSavedRecipes.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
