import { useUserReviews } from "@/hooks/useLocalStore";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const { reviews } = useUserReviews();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-display font-bold text-foreground">My Reviews</h1>
          </div>
        </motion.div>

        {reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body text-lg">No reviews yet. Try some recipes first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.recipeId + review.date}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/recipe/${review.recipeId}`}>
                  <div className="bg-card border border-border rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <img
                      src={review.recipeImage}
                      alt={review.recipeTitle}
                      className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-semibold text-foreground truncate">
                        {review.recipeTitle}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`h-3.5 w-3.5 ${si < review.rating ? "fill-golden text-golden" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                      <p className="text-muted-foreground font-body text-sm mt-1 line-clamp-1">
                        {review.comment}
                      </p>
                      <p className="text-muted-foreground font-body text-xs mt-1">{review.date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
