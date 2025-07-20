import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, User, BookOpen, Target, Users, LogOut, Briefcase, Award, Activity, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const sidebarLinks = [
  { label: "Profile", icon: <User className="h-5 w-5" />, to: "/profile" },
  { label: "Projects", icon: <Briefcase className="h-5 w-5" />, to: "/dashboard" },
  { label: "Roadmaps", icon: <BookOpen className="h-5 w-5" />, to: "/explore" },
  { label: "Certifications", icon: <Award className="h-5 w-5" />, to: "/recommendations" },
  { label: "Community", icon: <Users className="h-5 w-5" />, to: "/community" },
  { label: "Activity", icon: <Activity className="h-5 w-5" />, to: "/profile#activity" },
  { label: "Contact Us", icon: <Mail className="h-5 w-5" />, to: "/contact" },
];

export function NavigationHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setSidebarOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">CareerPath</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="h-4 w-4" />
              Roadmaps
            </Link>
            <Link to="/assessment" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Target className="h-4 w-4" />
              Skills
            </Link>
            <Link to="/community" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Users className="h-4 w-4" />
              Community
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_picture} alt={user?.first_name} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
            {/* Hamburger menu for mobile */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                {/* Button for opening sidebar on mobile */}
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-4 py-4 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profile_picture} alt={user?.first_name} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-base">{user?.first_name} {user?.last_name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                  <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
                    {sidebarLinks.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="justify-start w-full text-left text-base gap-3"
                        onClick={() => {
                          setSidebarOpen(false);
                          navigate(item.to);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                  <div className="border-t px-2 py-3">
                    {isAuthenticated && (
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}