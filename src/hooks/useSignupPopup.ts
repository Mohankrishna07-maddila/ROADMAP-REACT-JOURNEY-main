import { useState, useEffect } from 'react';

export function useSignupPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('signupPopupShown');
    
    if (!popupShown) {
      // Show popup after 30 seconds
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        setHasShownPopup(true);
        sessionStorage.setItem('signupPopupShown', 'true');
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const resetPopup = () => {
    sessionStorage.removeItem('signupPopupShown');
    setHasShownPopup(false);
  };

  return {
    isPopupOpen,
    hasShownPopup,
    openPopup,
    closePopup,
    resetPopup
  };
} 