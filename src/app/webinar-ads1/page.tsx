"use client";

import React from "react";
import { content } from './content';
import StickyBar from './_components/StickyBar';
import FormCard from './_components/FormCard';
import Countdown from './_components/Countdown';
import StatChip from './_components/StatChip';
import TestimonialCard from './_components/TestimonialCard';
import FAQAccordion from './_components/FAQAccordion';
import SeatMeter from './_components/SeatMeter';
import StackGroup, { StackItem } from './_components/StackGroup';

export default function WebinarAds1Page() {
  // Mobile stack animation effect
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target as HTMLElement;
          const items = container.querySelectorAll('.mobile-stack-item');
          
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in');
              // Add different animation types for variety
              if (index % 3 === 1) {
                item.classList.add('animate-slide');
              } else if (index % 3 === 2) {
                item.classList.add('animate-float');
              }
            }, index * 200); // Stagger the animations
          });
        }
      });
    }, observerOptions);

    // Observe all mobile stack containers
    const containers = document.querySelectorAll('.mobile-stack-container');
    containers.forEach(container => observer.observe(container));

    return () => {
      containers.forEach(container => observer.unobserve(container));
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            /* Modern Financial Theme */
            --primary-900: #0F172A;     /* Deep slate */
            --primary-800: #1E293B;     /* Dark slate */
            --primary-700: #334155;     /* Medium slate */
            --primary-600: #475569;     /* Light slate */
            --accent-500: #10B981;      /* Emerald green */
            --accent-400: #34D399;      /* Light emerald */
            --accent-600: #059669;      /* Dark emerald */
            --warning-500: #F59E0B;     /* Amber */
            --danger-500: #EF4444;      /* Red */
            --text-100: #F8FAFC;        /* Pure white */
            --text-80: rgba(248,250,252,0.8);  /* High contrast text */
            --text-60: rgba(248,250,252,0.6);  /* Medium text */
            --text-40: rgba(248,250,252,0.4);  /* Muted text */
            --border-10: rgba(255,255,255,0.05); /* Subtle borders */
            --border-20: rgba(255,255,255,0.1);  /* Medium borders */
            --gradient-primary: linear-gradient(135deg, #10B981 0%, #34D399 100%);
            --gradient-secondary: linear-gradient(135deg, #1E293B 0%, #334155 100%);
            --gradient-accent: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }

          /* Modern Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          /* Stack Animation Enhancements */
          [data-stack-item] {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          [data-stack-item].in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          /* Hover Effects */
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
          }

          .hover-glow:hover {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
          }

          /* Button Styles */
          .btn-primary {
            background: var(--gradient-primary);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .btn-primary:hover::before {
            left: 100%;
          }

          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
            animation: buttonGlow 2s ease-in-out infinite alternate;
          }

          /* Glow Animation */
          @keyframes buttonGlow {
            0% {
              box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3), 0 0 10px rgba(16, 185, 129, 0.2);
            }
            100% {
              box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.2);
            }
          }

          /* Enhanced Glow Animations for Navbar */
          @keyframes limitedSeatsGlow {
            0%, 100% {
              text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.2);
              color: rgba(248, 250, 252, 0.8);
            }
            50% {
              text-shadow: 0 0 15px rgba(16, 185, 129, 0.8), 0 0 25px rgba(16, 185, 129, 0.5), 0 0 35px rgba(16, 185, 129, 0.3);
              color: rgba(248, 250, 252, 1);
            }
          }

          @keyframes registerButtonGlow {
            0%, 100% {
              box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4), 0 0 15px rgba(16, 185, 129, 0.3), 0 0 25px rgba(16, 185, 129, 0.2);
              transform: translateY(-1px);
            }
            50% {
              box-shadow: 0 12px 35px rgba(16, 185, 129, 0.6), 0 0 25px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3);
              transform: translateY(-2px);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 8px rgba(16, 185, 129, 0.6), 0 0 16px rgba(16, 185, 129, 0.4);
            }
            50% {
              box-shadow: 0 0 12px rgba(16, 185, 129, 0.8), 0 0 24px rgba(16, 185, 129, 0.6);
            }
          }

          /* Card Animations */
          .card-float {
            animation: float 8s ease-in-out infinite;
          }

          .card-float:nth-child(even) {
            animation-delay: -4s;
          }

          /* Text Animations */
          .text-reveal {
            animation: fadeInUp 0.8s ease-out;
          }

          .text-slide-left {
            animation: slideInLeft 0.8s ease-out;
          }

          .text-slide-right {
            animation: slideInRight 0.8s ease-out;
          }

          /* Countdown Animation */
          .countdown-pulse {
            animation: pulse 2s ease-in-out infinite;
          }

          /* Countdown Glow Effect */
          .countdown-glow {
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2);
            animation: countdownGlow 2s ease-in-out infinite alternate;
          }

          @keyframes countdownGlow {
            0% {
              text-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2);
            }
            100% {
              text-shadow: 0 0 15px rgba(16, 185, 129, 0.8), 0 0 25px rgba(16, 185, 129, 0.6), 0 0 35px rgba(16, 185, 129, 0.4);
            }
          }

          /* Shimmer Effect */
          .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
          }

          /* Mobile Stack Animation */
          @keyframes mobileStackIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes mobileStackSlide {
            0% {
              opacity: 0;
              transform: translateX(-20px) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes mobileStackFloat {
            0% {
              opacity: 0;
              transform: translateY(20px) rotate(-1deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotate(0deg);
            }
          }

          /* Mobile Stack Classes */
          .mobile-stack-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-stack-item.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: mobileStackIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .mobile-stack-item.animate-slide {
            animation: mobileStackSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .mobile-stack-item.animate-float {
            animation: mobileStackFloat 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          /* Mobile-specific animations */
          @media (max-width: 768px) {
            .mobile-stack-container .mobile-stack-item:nth-child(1) {
              animation-delay: 0.1s;
            }
            .mobile-stack-container .mobile-stack-item:nth-child(2) {
              animation-delay: 0.2s;
            }
            .mobile-stack-container .mobile-stack-item:nth-child(3) {
              animation-delay: 0.3s;
            }
            .mobile-stack-container .mobile-stack-item:nth-child(4) {
              animation-delay: 0.4s;
            }
            .mobile-stack-container .mobile-stack-item:nth-child(5) {
              animation-delay: 0.5s;
            }
            .mobile-stack-container .mobile-stack-item:nth-child(6) {
              animation-delay: 0.6s;
            }
          }

          /* Reduced Motion Support */
          @media (prefers-reduced-motion: reduce) {
            [data-stack-item] {
              opacity: 1 !important;
              transform: translateY(0) !important;
              transition: none !important;
            }
            
            .mobile-stack-item {
              opacity: 1 !important;
              transform: translateY(0) !important;
              animation: none !important;
            }
            
            .hover-lift:hover {
              transform: none;
            }
            
            .card-float {
              animation: none;
            }
            
            .countdown-pulse {
              animation: none;
            }
            
            .shimmer {
              animation: none;
            }
          }

          /* Modern Glass Effect */
          .glass {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Gradient Text */
          .gradient-text {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Enhanced Navbar Effects */
          .limited-seats-glow {
            animation: limitedSeatsGlow 3s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .register-button-glow {
            animation: registerButtonGlow 2.5s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .register-button-glow:hover {
            animation: none;
            box-shadow: 0 15px 40px rgba(16, 185, 129, 0.7), 0 0 30px rgba(16, 185, 129, 0.5), 0 0 50px rgba(16, 185, 129, 0.3);
            transform: translateY(-3px) scale(1.02);
          }

          /* Enhanced Button Glow for Sticky Bar */
          .sticky-button-glow {
            animation: stickyButtonGlow 2s ease-in-out infinite alternate;
            transition: all 0.3s ease;
          }

          @keyframes stickyButtonGlow {
            0% {
              box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4), 0 0 15px rgba(16, 185, 129, 0.3), 0 0 25px rgba(16, 185, 129, 0.2);
              transform: translateY(-1px);
            }
            100% {
              box-shadow: 0 12px 35px rgba(16, 185, 129, 0.6), 0 0 25px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3);
              transform: translateY(-2px);
            }
          }

          .pulse-dot-glow {
            animation: pulseGlow 2s ease-in-out infinite;
          }
        `
      }} />

      <div className="min-h-screen bg-[var(--primary-900)] text-[var(--text-100)]">
        {/* Modern Top Bar */}
        <div className="glass sticky top-0 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-reveal">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-[var(--primary-900)] font-bold text-sm">TSO</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text-100)] text-lg">The School of Options</span>
                  <div className="text-xs text-[var(--text-60)]">Live Masterclass</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm limited-seats-glow">
                  <div className="w-2 h-2 bg-[var(--accent-500)] rounded-full pulse-dot-glow"></div>
                  Limited seats available
                </div>
                <a 
                  href="#register"
                  className="btn-primary register-button-glow text-[var(--primary-900)] font-semibold px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-400)] focus:ring-offset-2 focus:ring-offset-[var(--primary-900)]"
                >
                  Register Free Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section - Completely Redesigned */}
        <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 relative overflow-hidden">
          {/* Modern Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-400)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--accent-500)] rounded-full blur-3xl opacity-5"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <StackGroup>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Content - Modern Layout */}
                <StackItem index={0}>
                  <div className="space-y-6">
                    {/* Eyebrow and Stats */}
                    <div className="space-y-4 text-slide-left">
                      {/* Eyebrow - Always on its own line */}
                      <div className="flex items-center justify-center gap-2 bg-[#FAC846] text-[var(--primary-900)] px-4 py-2 rounded-full text-sm font-semibold w-full">
                        <div className="w-2 h-2 bg-[var(--primary-900)] rounded-full animate-pulse"></div>
                        {content.hero.eyebrow}
                      </div>
                      
                      {/* Tags - Responsive layout */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                        {/* Mobile: 2 smaller tags on first line, 1 larger tag on second line */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                          {/* First two tags - smaller on mobile */}
                          <div className="flex gap-2 sm:flex-1">
                            <div className="bg-[var(--primary-800)] text-[var(--text-80)] px-3 py-1.5 rounded-full text-xs sm:text-sm border border-[var(--border-20)] flex-1 text-center">
                              {content.hero.chips[0]}
                            </div>
                            <div className="bg-[var(--primary-800)] text-[var(--text-80)] px-3 py-1.5 rounded-full text-xs sm:text-sm border border-[var(--border-20)] flex-1 text-center">
                              {content.hero.chips[1]}
                            </div>
                          </div>
                          {/* Third tag - larger on mobile, full width */}
                          <div className="bg-[var(--primary-800)] text-[var(--text-80)] px-4 py-2 rounded-full text-sm border border-[var(--border-20)] text-center sm:px-3 sm:py-1 sm:flex-1">
                            {content.hero.chips[2]}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-4">
                      <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-reveal">
                        <span className="text-white">Learn the </span>
                        <span className="gradient-text">Logic</span>
                        <span className="text-white"> and </span>
                        <span className="gradient-text">Discipline</span>
                        <span className="text-white"> most option traders never get</span>
                      </h1>
                      <p className="text-lg sm:text-xl text-[var(--text-80)] leading-relaxed text-slide-left max-w-2xl">
                        {content.hero.subtitle}
                      </p>
                    </div>

                    {/* Mentor Card - Redesigned */}
                    <div className="glass rounded-2xl p-6 hover-lift hover-glow">
                      <div className="flex items-center gap-5">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl flex items-center justify-center shadow-xl card-float">
                            <img 
                              src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png" 
                              alt={content.hero.imageAlt}
                              className="w-15 h-15 rounded-lg object-contain bg-white p-0.5"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--accent-500)] rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--primary-900)]">
                            <svg className="w-2.5 h-2.5 text-[var(--primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-[var(--text-500)] mb-2">Kundan Kishore</h3>
                          <p className="text-[var(--text-80)] leading-relaxed text-base">
                            {content.hero.quickIntro}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Urgency Indicator */}
                    <div className="flex items-center gap-3 text-[var(--text-60)]">
                      <div className="w-2 h-2 bg-[var(--accent-500)] rounded-full animate-pulse"></div>
                      <span className="text-sm">{content.hero.scarcityLine}</span>
                    </div>
                  </div>
                </StackItem>

                {/* Right Form - Modern Design */}
                <StackItem index={1}>
                  <div className="text-slide-right">
                    <FormCard />
                  </div>
                </StackItem>
              </div>
            </StackGroup>
          </div>
        </section>

        {/* Meet Kundan Kishore Section - Modern Redesign */}
        <section className="py-20 sm:py-24 relative overflow-hidden">
          {/* Modern Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-800)] via-[var(--primary-700)] to-[var(--primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-3 bg-[#FAC846] text-[var(--primary-900)] px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                <div className="w-6 h-6 bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#FAC846]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                Your Trading Mentor
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-[var(--text-100)] leading-tight">
                Meet <span className="gradient-text">Kundan Kishore</span>
              </h2>
              <p className="text-xl sm:text-2xl text-[var(--text-80)] max-w-4xl mx-auto leading-relaxed">
                A 20+ year veteran who's transformed thousands of traders from guesswork to systematic success
              </p>
            </div>

            {/* Hero Profile Card - Modern Design */}
            <div className="mb-16 sm:mb-20 mobile-stack-container">
              <div className="mobile-stack-item glass rounded-3xl p-8 sm:p-12 hover-lift hover-glow relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                    {/* Profile Image & Basic Info */}
                    <div className="text-center lg:text-left flex-shrink-0">
                      <div className="relative flex justify-center mb-6">
                        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-3xl flex items-center justify-center shadow-2xl relative">
                          <img 
                            src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png" 
                            alt={content.hero.imageAlt}
                            className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-contain bg-white p-0"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-500)] rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--primary-900)]">
                            <svg className="w-4 h-4 text-[var(--primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-100)] mb-2 text-center">Kundan Kishore</h3>
                      <p className="text-[var(--text-100)] font-bold text-lg mb-6 text-center">Founder & Chief Mentor</p>
                      
                      {/* Quick Stats - Improved Grid Layout */}
                      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0 mobile-stack-container">
                        {content.kundan.stats.map((stat, index) => (
                          <div key={index} className="mobile-stack-item glass rounded-xl p-5 text-center hover-lift card-float" style={{animationDelay: `${index * 0.1}s`}}>
                            <div className="text-xl sm:text-2xl font-bold text-[var(--text-100)] mb-2">
                              {stat.split(' ')[0]}
                            </div>
                            <div className="text-sm text-[var(--text-60)] leading-tight">
                              {stat.split(' ').slice(1).join(' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bio & Experience */}
                    <div className="flex-1 space-y-8">
                      <div className="space-y-6">
                        {content.kundan.bio.map((paragraph, index) => (
                          <p key={index} className="text-[var(--text-80)] leading-relaxed text-lg">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* Career Highlights - Modern Design */}
                      <div className="glass rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-[var(--text-100)] mb-6 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-[var(--primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          Career Journey
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4 mobile-stack-container">
                          {[
                            { company: "Citibank", role: "Investment Banking", period: "2003-2008", logo: "/assets/Citi.png" },
                            { company: "RBS", role: "Royal Bank of Scotland", period: "2008-2012", logo: "R" },
                            { company: "Morgan Stanley", role: "Investment Banking", period: "2012-2016", logo: "/assets/morgan_stanley1671191982870.png" },
                            { company: "Barclays Capital", role: "Assistant VP", period: "2016-2020", logo: "/assets/barclays-investment-bank-logo-115630277832rlaxpy1ry.png" }
                          ].map((exp, index) => (
                            <div key={index} className="mobile-stack-item flex items-center gap-4 p-4 rounded-xl glass hover-lift">
                              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                                {exp.logo === "R" ? (
                                  <span className="text-[var(--primary-900)] font-bold text-sm">{exp.logo}</span>
                                ) : (
                                  <img 
                                    src={exp.logo} 
                                    alt={`${exp.company} logo`}
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[var(--text-100)] text-sm">{exp.company}</div>
                                <div className="text-[var(--text-60)] text-xs">{exp.role}</div>
                                <div className="text-[var(--accent-500)] text-xs font-medium">{exp.period}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[var(--primary-900)] rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-[var(--accent-500)] font-bold text-sm">TSO</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-[var(--primary-900)] text-sm">The School of Options</div>
                              <div className="text-[var(--primary-900)] text-xs opacity-80">Founder & Mentor • 2020-Present</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Outcomes Section - Clean Content-Focused Design */}
            <div className="mobile-stack-container">
              <div className="mobile-stack-item">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 bg-[#FAC846] text-[var(--primary-900)] px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                    <div className="w-6 h-6 bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#FAC846]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Learning Outcomes
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-100)] mb-6">
                    What You'll <span className="gradient-text">Learn</span>
                  </h3>
                  <p className="text-xl sm:text-2xl text-[var(--text-80)] max-w-3xl mx-auto leading-relaxed">
                    Master the fundamentals that most traders skip
                  </p>
                </div>

                {/* Learning Points - Clean List Design */}
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {content.kundan.checklist.map((item, index) => (
                      <div key={index} className="mobile-stack-item group">
                        <div className="flex items-start gap-6 p-6 rounded-2xl hover:bg-[var(--primary-800)] transition-all duration-300">
                          {/* Number Badge */}
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--danger-500)] to-[var(--warning-500)] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-100)] mb-2 group-hover:text-[var(--accent-400)] transition-colors duration-300">
                              {item}
                            </h4>
                            <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-400)] rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer - Subtle Design */}
                <div className="mt-16 text-center">
                  <div className="inline-flex items-center gap-3 bg-[var(--primary-800)] border border-[var(--border-20)] rounded-2xl px-6 py-4">
                    <div className="w-6 h-6 bg-[var(--warning-500)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[var(--primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-[var(--text-60)] italic">
                      {content.kundan.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Most Traders Fail Section - Modern Redesign */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          {/* Modern Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-900)] to-[var(--primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-48 h-48 bg-[var(--danger-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-[var(--warning-500)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <StackGroup>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <StackItem index={0}>
                  <div className="space-y-8 text-slide-left">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-reveal mb-6">
                        {content.whyFail.title}
                      </h2>
                      <p className="text-lg text-[var(--text-80)] leading-relaxed">
                        The harsh reality most traders face and how to avoid these common pitfalls
                      </p>
                    </div>
                    <ul className="space-y-6">
                      {content.whyFail.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--danger-500)] to-[var(--warning-500)] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-[var(--text-80)] text-lg leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StackItem>

                <StackItem index={1}>
                  <div className="glass rounded-3xl p-8 sm:p-10 hover-lift hover-glow text-slide-right mt-8 lg:mt-0">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <svg className="w-8 h-8 text-[var(--primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[var(--accent-500)] mb-4">
                        {content.whyFail.solutionTitle}
                      </h3>
                    </div>
                    <p className="text-[var(--text-80)] text-lg leading-relaxed text-center">
                      {content.whyFail.solutionCopy}
                    </p>
                  </div>
                </StackItem>
              </div>
            </StackGroup>
          </div>
        </section>

        {/* What You'll Learn Section - Modern Redesign */}

        {/* <section className="py-16 sm:py-20 relative overflow-hidden"> */}
          {/* Modern Background */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-800)] via-[var(--primary-700)] to-[var(--primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-40 h-40 bg-[var(--accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[var(--accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <StackGroup>
              <StackItem index={0}>
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-3 bg-[var(--accent-500)] text-[var(--primary-900)] px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                    <div className="w-6 h-6 bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-[var(--accent-500)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Masterclass Curriculum
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-reveal">
                    {content.learn.title}
                  </h2>
                  <p className="text-xl text-[var(--text-80)] max-w-3xl mx-auto leading-relaxed">
                    Everything you need to transform from guesswork to systematic trading
                  </p>
                </div>
              </StackItem>

              <StackItem index={1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.learn.items.map((item, index) => (
                    <div key={index} className="glass rounded-2xl p-6 hover-lift hover-glow card-float" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-[var(--primary-900)] font-bold text-lg">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[var(--text-100)] mb-3 text-base">
                            {item.split(' — ')[0]}
                          </h3>
                          <p className="text-[var(--text-80)] text-sm leading-relaxed">
                            {item.split(' — ')[1]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </StackItem>
            </StackGroup>
          </div> */}
        {/* </section> */}

        {/* Social Proof Section - Modern Redesign */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          {/* Modern Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-900)] to-[var(--primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-48 h-48 bg-[var(--accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-[var(--accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <StackGroup>
              <StackItem index={0}>
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-3 bg-[#FAC846] text-[var(--primary-900)] px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                    <div className="w-6 h-6 bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#FAC846]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Trusted by Thousands
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-reveal">
                    Join thousands of successful learners
                  </h2>
                  <p className="text-xl text-[var(--text-80)] max-w-3xl mx-auto leading-relaxed mb-12">
                    Real results from real traders who've transformed their approach
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
                    {content.socialProof.stats.map((stat, index) => (
                      <div key={index} className="text-center card-float" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="glass rounded-2xl p-4 sm:p-6 hover-lift">
                          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--accent-100)] mb-2 sm:mb-3 countdown-pulse">
                            {stat.split(' ')[0]}
                          </div>
                          <div className="text-xs sm:text-sm text-[var(--text-80)] leading-tight px-2">
                            {stat.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StackItem>

              <StackItem index={1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.socialProof.testimonials.map((testimonial, index) => (
                    <TestimonialCard 
                      key={index} 
                      testimonial={testimonial}
                      style={{animationDelay: `${index * 0.1}s`}}
                    />
                  ))}
                </div>
              </StackItem>
            </StackGroup>
          </div>
        </section>

        {/* FAQ Section - Modern Redesign */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          {/* Modern Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-800)] via-[var(--primary-700)] to-[var(--primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/3 w-40 h-40 bg-[var(--accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-[var(--accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
            <StackGroup>
              <StackItem index={0}>
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-3 bg-[#FAC846] text-[var(--primary-900)] px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                    <div className="w-6 h-6 bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#FAC846]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Common Questions
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-reveal">
                    {content.faq.title}
                  </h2>
                  <p className="text-xl text-[var(--text-80)] max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about the masterclass
                  </p>
                </div>
              </StackItem>

              <StackItem index={1}>
                <div className="glass rounded-3xl p-8 sm:p-10">
                  <FAQAccordion items={content.faq.items} />
                </div>
              </StackItem>
            </StackGroup>
          </div>
        </section>

        {/* Compliance Footer - Modern Design */}
        <footer className="py-12 border-t border-[var(--border-20)] bg-[var(--primary-900)]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-[var(--primary-900)] font-bold text-sm">TSO</span>
                </div>
                <span className="font-bold text-[var(--text-100)] text-lg">The School of Options</span>
              </div>
              <p className="text-sm text-[var(--text-60)] leading-relaxed max-w-4xl mx-auto">
                {content.compliance}
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky Bottom Bar - Modern Design */}
        <div className="fixed bottom-0 left-0 right-0 z-50 glass backdrop-blur-md border-t border-[var(--border-20)]" style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2 text-sm text-[var(--text-80)]">
                  <div className="w-2 h-2 bg-[var(--accent-500)] rounded-full animate-pulse"></div>
                  <span>{content.stickyBar.a.replace('{TIMER}', '')}</span>
                </div>
                <Countdown variant="mini" className="text-sm sm:text-base font-mono text-[var(--accent-500)] countdown-pulse countdown-glow" />
              </div>
              <a 
                href="#register"
                className="btn-primary sticky-button-glow text-[var(--primary-900)] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-[var(--accent-400)] focus:ring-offset-2 focus:ring-offset-[var(--primary-900)]"
              >
                {content.stickyBar.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
