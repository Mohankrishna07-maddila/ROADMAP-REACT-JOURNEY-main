import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import RoadmapDetail from "./pages/RoadmapDetail";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import FrontendRoadmap from "./pages/FrontendRoadmap";
import CareerRoadmap from "./pages/FrontendRoadmap";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Events from "./pages/Events";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GoogleWorkspace from "./pages/GoogleWorkspace";
import EnvTest from "./components/EnvTest";
import { SignupPopup } from "./components/SignupPopup";
import { useSignupPopup } from "./hooks/useSignupPopup";

const queryClient = new QueryClient();

const App = () => {
  const { isPopupOpen, closePopup } = useSignupPopup();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/roadmap/:path" element={<CareerRoadmap />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/support" element={<Support />} />
              <Route path="/roadmap/frontend" element={<FrontendRoadmap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/google-workspace" element={<GoogleWorkspace />} />
              <Route path="/env-test" element={<EnvTest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          
          {/* Signup Popup */}
          <SignupPopup isOpen={isPopupOpen} onClose={closePopup} />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
