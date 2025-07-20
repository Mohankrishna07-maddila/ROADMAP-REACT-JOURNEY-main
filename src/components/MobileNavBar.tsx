import { User, Briefcase, BookOpen, Award, Users, Activity, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Profile", icon: <User className="h-5 w-5" />, to: "/profile" },
  { label: "Projects", icon: <Briefcase className="h-5 w-5" />, to: "/dashboard" },
  { label: "Roadmaps", icon: <BookOpen className="h-5 w-5" />, to: "/explore" },
  { label: "Certifications", icon: <Award className="h-5 w-5" />, to: "/recommendations" },
  { label: "Community", icon: <Users className="h-5 w-5" />, to: "/community" },
  { label: "Activity", icon: <Activity className="h-5 w-5" />, to: "/profile#activity" },
  { label: "Contact", icon: <Mail className="h-5 w-5" />, to: "/contact" },
];

export function MobileNavBar() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-between px-2 py-1 md:hidden shadow-lg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to || (item.to === "/profile#activity" && location.pathname === "/profile");
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center flex-1 px-1 py-1 text-xs ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}
            style={{ minWidth: 0 }}
          >
            {item.icon}
            <span className="truncate mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
} 