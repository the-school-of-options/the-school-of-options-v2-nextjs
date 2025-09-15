'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the URL has a hash fragment
    const hasHash = window.location.hash;
    
    // If there's a hash, let the browser handle the navigation naturally
    // Don't scroll to top if there's a hash fragment
    if (hasHash) {
      return;
    }

    // Scroll to top when pathname changes (but not for hash navigation)
    // Use setTimeout to ensure the page has fully rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;


