import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChefHat, Search, Heart, Star, User, LogOut, Menu, X, CalendarDays } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Recipes", icon: Search },
    { to: "/meal-planner", label: "Planner", icon: CalendarDays },
    { to: "/saved", label: "Saved", icon: Heart },
    { to: "/reviews", label: "Reviews", icon: Star },
    { to: "/profile", label: "Profile", icon: User },
  ];

  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/dashboard" className="flex items-center gap-2 text-primary">
          <ChefHat className="h-7 w-7" />
          <span className="text-xl font-display font-bold text-foreground">FlavorBook</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={location.pathname === item.to ? "default" : "ghost"}
                size="sm"
                className="font-body"
              >
                <item.icon className="h-4 w-4 mr-1.5" />
                {item.label}
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2 text-muted-foreground font-body">
            <LogOut className="h-4 w-4 mr-1.5" /> Logout
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
              <Button variant={location.pathname === item.to ? "default" : "ghost"} className="w-full justify-start font-body" size="sm">
                <item.icon className="h-4 w-4 mr-2" /> {item.label}
              </Button>
            </Link>
          ))}
          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-body" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
