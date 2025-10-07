"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();


  const isActive = (href: string) => pathname === href;

  const handleSignInClick = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A2540]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0A2540]/80 border-b border-[#0A2540]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-12 md:h-24 w-12 md:w-auto">
              <Image
                src="/TSOO_Logo_Monogram_Light.png"
                alt="The School of Options"
                width={160}
                height={60}
                className="h-full w-full "
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/about"
              className={`text-sm font-medium smooth-transition ${isActive("/about")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
                }`}
            >
              About
            </Link>
            <Link
              href="/methodology"
              className={`text-sm font-medium smooth-transition ${isActive("/methodology")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
                }`}
            >
              Methodology
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium smooth-transition ${isActive("/faq")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
                }`}
            >
              FAQ
            </Link>
            <Link
              href="/workshop"
              className={`text-sm font-medium smooth-transition ${isActive("/workshop")
                  ? "text-[#FF7A00]"
                  : "text-white hover:text-[#FF7A00]"
                }`}
            >
              Webinars
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">
                  Welcome, {user.fullName || user.email}
                </span>
                <Button variant="cta-outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="cta-outline" size="sm" onClick={handleSignInClick}>
                Sign Up
              </Button>
            )}
            {/* <Button variant="cta" size="sm" asChild>
              <a 
                href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Mentorship
              </a>
            </Button> */}
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
                className={`text-sm font-medium smooth-transition ${isActive("/about")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/methodology"
                className={`text-sm font-medium smooth-transition ${isActive("/methodology")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium smooth-transition ${isActive("/faq")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/workshop"
                className={`text-sm font-medium smooth-transition ${isActive("/workshop")
                    ? "text-[#FF7A00]"
                    : "text-white hover:text-[#FF7A00]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Webinars
              </Link>
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    <div className="text-white text-sm mb-2">
                      Welcome, {user.fullName || user.email}
                    </div>
                    <Button
                      variant="cta-outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="cta-outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignInClick();
                    }}
                  >
                    Sign Up
                  </Button>
                )}
                {/* <Button variant="cta" size="sm" className="w-full" asChild>
                  <a 
                    href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Mentorship
                  </a>
                </Button> */}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;