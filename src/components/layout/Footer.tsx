import Link from "next/link";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">The School of Options</h3>
            <p className="text-sm text-white/80">
              Learn Options Trading the Transparent Way - Logic, Neutrality, and Discipline First.
            </p>
            <div className="text-xs text-white/70">
              Founded by Kundan Kishore
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Learn</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/methodology" className="text-sm text-white/80 hover:text-white smooth-transition">
                Our Methodology
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-white/80 hover:text-white smooth-transition">
                About Us
              </Link>
              <Link href="/faq" className="text-sm text-white/80 hover:text-white smooth-transition">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Kundan</h4>
            <div className="flex flex-wrap gap-3 mt-4">
              <a 
                href="https://www.linkedin.com/in/kishorekundan/" 
                target="_blank" 
                rel="noopener"
                className="w-11 h-11 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-orange text-white hover:bg-orange/90 hover:shadow-[0_6px_14px_rgba(255,122,0,0.18)] focus:outline-none focus:outline-2 focus:outline-orange focus:outline-offset-2 smooth-transition"
                aria-label="Kundan Kishore on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/kundan1kishore/" 
                target="_blank" 
                rel="noopener"
                className="w-11 h-11 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-orange text-white hover:bg-orange/90 hover:shadow-[0_6px_14px_rgba(255,122,0,0.18)] focus:outline-none focus:outline-2 focus:outline-orange focus:outline-offset-2 smooth-transition"
                aria-label="Kundan Kishore on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/kundankishore/" 
                target="_blank" 
                rel="noopener"
                className="w-11 h-11 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-orange text-white hover:bg-orange/90 hover:shadow-[0_6px_14px_rgba(255,122,0,0.18)] focus:outline-none focus:outline-2 focus:outline-orange focus:outline-offset-2 smooth-transition"
                aria-label="Kundan Kishore on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com/kundankishore" 
                target="_blank" 
                rel="noopener"
                className="w-11 h-11 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-orange text-white hover:bg-orange/90 hover:shadow-[0_6px_14px_rgba(255,122,0,0.18)] focus:outline-none focus:outline-2 focus:outline-orange focus:outline-offset-2 smooth-transition"
                aria-label="Kundan Kishore on X"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.quora.com/profile/Kundan-Kishore-47" 
                target="_blank" 
                rel="noopener"
                className="w-11 h-11 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-orange text-white hover:bg-orange/90 hover:shadow-[0_6px_14px_rgba(255,122,0,0.18)] focus:outline-none focus:outline-2 focus:outline-orange focus:outline-offset-2 smooth-transition"
                aria-label="Kundan Kishore on Quora"
              >
                <span className="text-base font-bold" style={{ fontSize: '20px' }}>Q</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/70">
              © 2025 Wealthian Pvt Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/70 hover:text-white smooth-transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white smooth-transition">
                Terms of Service
              </Link>
              <Link href="/return" className="text-white/70 hover:text-white smooth-transition">
                Return & Refund Policy
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white smooth-transition">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/60">
            <strong>Risk Disclosure:</strong> Trading involves risk. Past results do not guarantee future returns. 
            This program focuses on education and process-not tips or assured profits.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;