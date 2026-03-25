import { useState, useMemo, useEffect, useRef } from "react";
import { mockRecipes } from "@/lib/mockData";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [mealType, setMealType] = useState("all");
  const [dietType, setDietType] = useState("all");
  const [maxTime, setMaxTime] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const perPage = 12;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mockRecipes
      .filter((r) => r.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const filtered = useMemo(() => {
    return mockRecipes.filter((r) => {
      if (debouncedQuery && !r.title.toLowerCase().includes(debouncedQuery.toLowerCase())) return false;
      if (cuisine !== "all" && r.cuisine !== cuisine) return false;
      if (mealType !== "all" && r.mealType !== mealType) return false;
      if (dietType !== "all" && r.dietType !== dietType) return false;
      if (maxTime !== "all" && r.cookingTime > Number(maxTime)) return false;
      return true;
    });
  }, [debouncedQuery, cuisine, mealType, dietType, maxTime]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  const clearFilters = () => {
    setCuisine("all");
    setMealType("all");
    setDietType("all");
    setMaxTime("all");
    setQuery("");
  };

  const hasActiveFilters = cuisine !== "all" || mealType !== "all" || dietType !== "all" || maxTime !== "all";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            What shall we cook today?
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Explore {mockRecipes.length}+ recipes from around the world
          </p>
        </motion.div>

        {/* Search with Suggestions */}
        <div className="max-w-2xl mx-auto mb-8" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); setShowSuggestions(true); }}
              onFocus={() => query.trim() && setShowSuggestions(true)}
              className="pl-12 pr-12 h-12 text-base rounded-xl font-body"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden"
              >
                {suggestions.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setShowSuggestions(false);
                      navigate(`/recipe/${recipe.id}`);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-foreground truncate">
                        {recipe.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-3 w-3" /> {recipe.cookingTime}m
                        </span>
                        <span>{recipe.cuisine}</span>
                        <span className="capitalize text-herb">{recipe.dietType}</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-golden text-golden" /> {recipe.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => { setShowSuggestions(false); }}
                  className="w-full px-4 py-2 text-sm font-body text-primary hover:bg-muted transition-colors text-center border-t border-border"
                >
                  See all {filtered.length} results
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-w-2xl mx-auto mb-8 flex flex-wrap gap-3 items-center"
          >
            <Select value={cuisine} onValueChange={(v) => { setCuisine(v); setPage(1); }}>
              <SelectTrigger className="w-[140px] font-body"><SelectValue placeholder="Cuisine" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                {["Italian", "Indian", "Japanese", "Mediterranean", "Chinese", "Thai", "Korean", "American", "Mexican", "French"].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={mealType} onValueChange={(v) => { setMealType(v); setPage(1); }}>
              <SelectTrigger className="w-[140px] font-body"><SelectValue placeholder="Meal Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meals</SelectItem>
                {["breakfast", "lunch", "dinner", "snack"].map((m) => (
                  <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dietType} onValueChange={(v) => { setDietType(v); setPage(1); }}>
              <SelectTrigger className="w-[140px] font-body"><SelectValue placeholder="Diet" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diets</SelectItem>
                {["veg", "non-veg", "vegan", "gluten-free"].map((d) => (
                  <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={maxTime} onValueChange={(v) => { setMaxTime(v); setPage(1); }}>
              <SelectTrigger className="w-[140px] font-body"><SelectValue placeholder="Time" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Time</SelectItem>
                <SelectItem value="15">≤ 15 min</SelectItem>
                <SelectItem value="30">≤ 30 min</SelectItem>
                <SelectItem value="45">≤ 45 min</SelectItem>
                <SelectItem value="60">≤ 60 min</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground font-body">
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            )}
          </motion.div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginated.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body text-lg">No recipes found. Try adjusting your filters.</p>
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setPage((p) => p + 1)} className="font-body">
              Load More Recipes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
