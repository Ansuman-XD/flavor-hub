import { Link } from "react-router-dom";
import { Recipe } from "@/lib/api";
import { Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe, index = 0 }: { recipe: Recipe; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-golden fill-golden" />
              <span className="text-sm font-semibold text-foreground">{recipe.rating}</span>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-primary/90 text-primary-foreground text-xs font-body font-medium px-2.5 py-1 rounded-full">
                {recipe.cuisine}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-muted-foreground text-sm font-body">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {recipe.cookingTime} min
              </span>
              <span className="capitalize">{recipe.mealType}</span>
              <span className="capitalize text-herb font-medium">{recipe.dietType}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
