import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState(0); // Initialize width to 0

  useEffect(() => {
    // Function to update width state
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    // Update width state on mount
    handleWindowSizeChange();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowSizeChange);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []); // Run only on mount

  // Determine screen size based on width
  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
