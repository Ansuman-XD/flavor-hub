import { useState } from "react";
import { useMealPlan } from "@/hooks/useLocalStore";
import { mockRecipes } from "@/lib/mockData";
import { Recipe } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Plus, X, Trash2, Clock, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["breakfast", "lunch", "dinner"];

const MealPlanner = () => {
  const { plan, addToPlan, removeFromPlan, clearPlan, getEntry } = useMealPlan();
  const [pickDay, setPickDay] = useState("");
  const [pickMeal, setPickMeal] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredRecipes = mockRecipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (recipe: Recipe) => {
    if (!pickDay || !pickMeal) return;
    addToPlan({ day: pickDay, meal: pickMeal, recipe });
    toast({ title: `${recipe.title} added to ${pickDay} ${pickMeal}! 🍽️` });
    setDialogOpen(false);
    setSearch("");
  };

  const openPicker = (day: string, meal: string) => {
    setPickDay(day);
    setPickMeal(meal);
    setDialogOpen(true);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-7 w-7 text-primary" />
              <h1 className="text-3xl font-display font-bold text-foreground">Meal Planner</h1>
            </div>
            {plan.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => { clearPlan(); toast({ title: "Meal plan cleared" }); }} className="text-muted-foreground font-body">
                <Trash2 className="h-4 w-4 mr-1" /> Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Weekly Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 mb-2">
              <div />
              {MEALS.map((meal) => (
                <div key={meal} className="text-center font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {meal}
                </div>
              ))}
            </div>

            {/* Days */}
            {DAYS.map((day, di) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: di * 0.05 }}
                className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 mb-2"
              >
                <div className="flex items-center font-display font-semibold text-foreground text-sm">
                  {day}
                </div>
                {MEALS.map((meal) => {
                  const entry = getEntry(day, meal);
                  return (
                    <div
                      key={meal}
                      className="bg-card border border-border rounded-xl p-3 min-h-[90px] flex flex-col justify-center relative group"
                    >
                      {entry ? (
                        <>
                          <Link to={`/recipe/${entry.recipe.id}`} className="block">
                            <div className="flex items-center gap-2">
                              <img
                                src={entry.recipe.image}
                                alt={entry.recipe.title}
                                className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-body text-sm font-semibold text-foreground truncate">
                                  {entry.recipe.title}
                                </p>
                                <p className="font-body text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {entry.recipe.cookingTime} min
                                </p>
                              </div>
                            </div>
                          </Link>
                          <button
                            onClick={() => removeFromPlan(day, meal)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => openPicker(day, meal)}
                          className="flex items-center justify-center gap-1 text-muted-foreground hover:text-primary font-body text-sm transition-colors w-full h-full"
                        >
                          <Plus className="h-4 w-4" /> Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recipe Picker Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-display">
                Pick a recipe for {pickDay} {pickMeal}
              </DialogTitle>
            </DialogHeader>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-body"
              />
            </div>
            <div className="overflow-y-auto flex-1 space-y-2 pr-1">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => handleSelect(recipe)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-accent transition-colors text-left"
                >
                  <img src={recipe.image} alt={recipe.title} className="h-12 w-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-body text-sm font-semibold text-foreground truncate">{recipe.title}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {recipe.cuisine} · {recipe.cookingTime} min · {recipe.dietType}
                    </p>
                  </div>
                </button>
              ))}
              {filteredRecipes.length === 0 && (
                <p className="text-center text-muted-foreground font-body py-8">No recipes found</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MealPlanner;
