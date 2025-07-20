import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FloatingSignupButtonProps {
  onOpenPopup: () => void;
}

export function FloatingSignupButton({ onOpenPopup }: FloatingSignupButtonProps) {
  const { isAuthenticated } = useAuth();

  // Don't show if user is already authenticated
  if (isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={onOpenPopup}
        className="shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <User className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </div>
  );
} 