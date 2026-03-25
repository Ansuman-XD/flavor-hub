import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useLocalStore";
import { User, X } from "lucide-react";
import { motion } from "framer-motion";

const dietaryOptions = ["Vegetarian", "Vegan", "Non-Veg", "Gluten-Free", "Keto", "Paleo"];
const allergyOptions = ["Nuts", "Dairy", "Eggs", "Soy", "Wheat", "Shellfish", "Fish"];

const Profile = () => {
  const { user } = useAuth();
  const { profile, saveProfile } = useProfile();

  const [name, setName] = useState(profile.name || user?.name || "");
  const [dietary, setDietary] = useState<string[]>(profile.dietary);
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);
  const [skillLevel, setSkillLevel] = useState(profile.skillLevel);
  const [preferredIng, setPreferredIng] = useState("");
  const [preferred, setPreferred] = useState<string[]>(profile.preferred);
  const [avoidIng, setAvoidIng] = useState("");
  const [avoid, setAvoid] = useState<string[]>(profile.avoid);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const addTag = (value: string, list: string[], setList: (v: string[]) => void, setInput: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput("");
  };

  const handleSave = () => {
    saveProfile({ name, dietary, allergies, skillLevel, preferred, avoid });
    toast({ title: "Profile updated! 🎉" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <User className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
          </div>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Basic Information</h2>
            <div className="space-y-2">
              <Label className="font-body">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Email</Label>
              <Input value={user?.email || ""} disabled className="font-body opacity-60" />
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Dietary Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((d) => (
                <Badge key={d} variant={dietary.includes(d) ? "default" : "outline"} className="cursor-pointer font-body" onClick={() => toggleItem(dietary, setDietary, d)}>
                  {d}
                </Badge>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Allergies</h2>
            <div className="flex flex-wrap gap-2">
              {allergyOptions.map((a) => (
                <Badge key={a} variant={allergies.includes(a) ? "destructive" : "outline"} className="cursor-pointer font-body" onClick={() => toggleItem(allergies, setAllergies, a)}>
                  {a}
                </Badge>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Cooking Skill Level</h2>
            <Select value={skillLevel} onValueChange={setSkillLevel}>
              <SelectTrigger className="w-[200px] font-body"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner 🌱</SelectItem>
                <SelectItem value="intermediate">Intermediate 🍳</SelectItem>
                <SelectItem value="expert">Expert 👨‍🍳</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Ingredient Preferences</h2>
            <div className="space-y-3">
              <Label className="font-body">Preferred Ingredients</Label>
              <div className="flex gap-2">
                <Input placeholder="Add ingredient..." value={preferredIng} onChange={(e) => setPreferredIng(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(preferredIng, preferred, setPreferred, setPreferredIng))} className="font-body" />
                <Button variant="outline" onClick={() => addTag(preferredIng, preferred, setPreferred, setPreferredIng)} className="font-body">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferred.map((p) => (
                  <Badge key={p} variant="secondary" className="font-body">
                    {p} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPreferred(preferred.filter((x) => x !== p))} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label className="font-body">Avoid Ingredients</Label>
              <div className="flex gap-2">
                <Input placeholder="Add ingredient..." value={avoidIng} onChange={(e) => setAvoidIng(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(avoidIng, avoid, setAvoid, setAvoidIng))} className="font-body" />
                <Button variant="outline" onClick={() => addTag(avoidIng, avoid, setAvoid, setAvoidIng)} className="font-body">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {avoid.map((a) => (
                  <Badge key={a} variant="destructive" className="font-body">
                    {a} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setAvoid(avoid.filter((x) => x !== a))} />
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <Button onClick={handleSave} className="w-full font-body" size="lg">
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
