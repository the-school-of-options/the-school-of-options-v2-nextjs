"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  const isActive = (href: string) => pathname === href;

  const handleNewsletterClick = () => {
    router.push('/#section-newsletter');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A2540]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0A2540]/80 border-b border-[#0A2540]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-white">
              The School of Options
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/about"
              className={`text-sm font-medium smooth-transition ${
                isActive("/about")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
              }`}
            >
              About
            </Link>
            <Link
              href="/methodology"
              className={`text-sm font-medium smooth-transition ${
                isActive("/methodology")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
              }`}
            >
              Methodology
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium smooth-transition ${
                isActive("/faq")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="cta-outline" size="sm" onClick={handleNewsletterClick}>
              Sign In
            </Button>
            <Button variant="cta" size="sm" asChild>
              <a 
                href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Mentorship
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#0A2540]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className={`text-sm font-medium smooth-transition ${
                  isActive("/about")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/methodology"
                className={`text-sm font-medium smooth-transition ${
                  isActive("/methodology")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium smooth-transition ${
                  isActive("/faq")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 space-y-2">
                <Button 
                  variant="cta-outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNewsletterClick();
                  }}
                >
                  Free Newsletter
                </Button>
                <Button variant="cta" size="sm" className="w-full" asChild>
                  <a 
                    href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Mentorship
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;