"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, BookOpen, Target, Linkedin, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DedicationAndVideosSection from "@/components/DedicationAndVideosSection";
import Image from "next/image";
// import founderImage from "/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png";
import { subscribeToNewsletter } from "@/api/newsletter";
import { registerForWebinar } from "@/api/webinar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const HomePage = () => {
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isRegisteringWebinar, setIsRegisteringWebinar] = useState(false);

  const handleNewsletterSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value.trim();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      const response = await subscribeToNewsletter(email);
      
      if (response.ok) {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive weekly updates from Kundan Kishore.",
          variant: "success",
        });
        form.reset();
      } else {
        if (response.error === "already_subscribed") {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Subscription Failed",
            description: response.error || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch {
      toast({
        title: "Subscription Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleWebinarRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const preferedLanguage = formData.get('preferedLanguage') as string;

    if (!name || !email || !mobile || !preferedLanguage) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsRegisteringWebinar(true);
    
    try {
      const response = await registerForWebinar({
        email: email.trim(),
        name: name.trim(),
        webinarLink: "https://theschoolofoptions.com/webinar", // Default webinar link
        source: "website", // Default source
        preferedLanguage: preferedLanguage.toLowerCase()
      });
      
      if (response.ok) {
        toast({
          title: "Successfully Registered!",
          description: "Thank you for registering for the webinar. You'll receive the meeting link via email.",
          variant: "success",
        });
        form.reset();
      } else {
        if (response.error === "already_registered") {
          toast({
            title: "Already Registered",
            description: "This email is already registered for the webinar.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration Failed",
            description: response.error || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch {
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegisteringWebinar(false);
    }
  };


  const problems = [
    {
      icon: "🛡️",
      text: "Over-reliance on charts, tips, and guesswork"
    },
    {
      icon: "🗺️", 
      text: "Lack of understanding of market-neutral strategies"
    },
    {
      icon: "🧩",
      text: "Missing fundamentals of risk management"
    },
    {
      icon: "⚖️",
      text: "No discipline or consistency in trading"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden" aria-labelledby="hero-heading">
          {/* Background Grid */}
          <div className="hero-grid" aria-hidden="true"></div>
          
          {/* Bell Curve */}
          <svg className="hero-bell-curve" aria-hidden="true" viewBox="0 0 720 160">
            <path 
              d="M 0 80 C 120 20, 240 20, 360 80 S 600 140, 720 80" 
              stroke="rgba(255,255,255,0.07)" 
              strokeWidth="2" 
              fill="transparent"
            />
          </svg>

          {/* Greeks Layer */}
          <div className="hero-greeks" aria-hidden="true">
            <span className="hero-greek" style={{"--delay": "0s", "--tx": "92px", "--ty": "60px"} as React.CSSProperties}>Δ</span>
            <span className="hero-greek" style={{"--delay": "2s", "--tx": "220px", "--ty": "42px"} as React.CSSProperties}>Θ</span>
            <span className="hero-greek" style={{"--delay": "4s", "--tx": "340px", "--ty": "112px"} as React.CSSProperties}>Γ</span>
            <span className="hero-greek" style={{"--delay": "1s", "--tx": "560px", "--ty": "72px"} as React.CSSProperties}>Vega</span>
            <span className="hero-greek" style={{"--delay": "3s", "--tx": "660px", "--ty": "142px"} as React.CSSProperties}>∂C/∂σ</span>
            <span className="hero-greek" style={{"--delay": "5s", "--tx": "500px", "--ty": "212px"} as React.CSSProperties}>dV/dS</span>
          </div>

          {/* Payoff Curves */}
          <svg className="hero-payoff-curves" aria-hidden="true" viewBox="0 0 720 300">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path 
              className="payoff-curve straddle"
              d="M 0 120 Q 180 40, 360 120 Q 540 200, 720 120" 
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.5" 
              fill="transparent"
              filter="url(#glow)"
            />
            <path 
              className="payoff-curve iron-condor"
              d="M 0 160 L 160 160 Q 240 100, 480 100 L 560 160 L 720 160" 
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.5" 
              fill="transparent"
              filter="url(#glow)"
            />
            <path 
              className="payoff-curve calendar"
              d="M 0 150 C 180 60, 540 60, 720 150" 
              stroke="rgba(255,255,255,0.28)" 
              strokeWidth="1.5" 
              fill="transparent"
              filter="url(#glow)"
            />
          </svg>

          <div className="container relative z-10">
            <div className="hero-content max-w-[680px] text-left md:text-left">
              <h1 id="hero-heading" className="hero-headline text-responsive-h1">
                Building Smarter Traders Every Day
              </h1>
              <p className="hero-subheading text-responsive-body">
                The School of Options teaches Options Trading the right way: structured, clear, and logic-driven.
              </p>
              <a 
                href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                target="_blank"
                rel="noopener"
                className="hero-cta tap-target w-full md:w-auto block md:inline-block text-center"
                role="button"
                aria-label="Join the Mentorship Program"
              >
                Join the Mentorship Program
              </a>
              <p className="hero-micro-trust text-responsive-small">
                Trusted by 2 lakh+ learners • 20+ years of market lessons
              </p>
            </div>
          </div>
        </section>

        {/* Why The School of Options Exists Section */}
        <section className="py-12 md:py-20 bg-[#F7F9FB]" aria-labelledby="problems-heading">
          <div className="container">
            <div className="text-container text-center">
              <h2 id="problems-heading" className="text-responsive-h2 mb-6 text-[#0A2540]">
                Why The School of Options Exists
              </h2>
              <p className="text-responsive-body text-[#4A5568] mb-12">
                In India, most traders lose money in Options not because markets are unfair, but because education is broken. There's no single, structured school that teaches market-neutral strategies, disciplined risk management, and logic-driven trading.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-8">
                {problems.map((problem, index) => (
                  <Card key={index} className="bg-white border border-[rgba(255,122,0,0.15)] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <CardContent className="p-4 md:p-5 text-left">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{problem.icon}</span>
                        <p className="text-responsive-body font-medium text-[#1A202C]">{problem.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-[rgba(255,122,0,0.2)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                <p className="text-responsive-body font-semibold text-[#FF7A00] text-center">
                  At The School of Options, we don't chase jackpots. We teach Options the right way — with structure, logic, and consistency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="section-methodology" className="py-12 md:py-20 relative overflow-hidden dark-gradient" aria-labelledby="methodology-heading">
          {/* Background Grid */}
          <div className="grid-overlay" aria-hidden="true"></div>

          <div className="container relative z-10">
            <div className="max-w-[1120px] mx-auto">
              <div className="text-container text-center mb-8 md:mb-16">
                <h2 id="methodology-heading" className="text-responsive-h2 text-white mb-6">
                  Our Methodology — Teaching, Training, and Mentorship
                </h2>
                <p className="text-responsive-body text-[#E6ECF5]">
                  We don't just deliver theory. Our methodology builds traders through structured teaching, hands-on training, and ongoing mentorship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                <Card className="bg-white/6 backdrop-blur-sm border border-white/14 rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">📘</span>
                    <h3 className="text-responsive-h3 text-white mb-3">Teaching</h3>
                    <p className="text-responsive-body text-white/90">
                      We impart structured, clear concepts that simplify Options and build a strong foundation of knowledge.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/6 backdrop-blur-sm border border-white/14 rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">⚙️</span>
                    <h3 className="text-responsive-h3 text-white mb-3">Training</h3>
                    <p className="text-responsive-body text-white/90">
                      We equip learners with practical skills through backtesting, paper trading, and guided practice that stays for life.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/6 backdrop-blur-sm border border-white/14 rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">🧭</span>
                    <h3 className="text-responsive-h3 text-white mb-3">Mentorship</h3>
                    <p className="text-responsive-body text-white/90">
                      We provide guidance, realistic goals, and trading psychology support to help learners stay disciplined and confident.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-container text-center mb-8">
                <p className="text-responsive-body font-semibold text-[#FFCF9E] mb-6">
                  When teaching, training, and mentorship come together — knowledge turns into skill, and skill turns into confidence. Every step is logic-driven, data-backed, and transparent.
                </p>
                <Button 
                  className="bg-[#FF7A00] text-white font-bold py-[14px] px-[22px] rounded-xl shadow-[0_10px_24px_rgba(255,122,0,0.25)] hover:bg-[#FF8A1E] hover:scale-[1.02] transition-all duration-200 tap-target w-full md:w-auto" 
                  asChild
                >
                  <Link href="/methodology" aria-label="Open the Methodology page">
                    Understand Our Methodology
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6-Month Mentorship Section */}
        <section id="section-mentorship" className="py-16 md:py-[84px] bg-[#F7F9FB]" aria-labelledby="mentorship-heading">
          <div className="container">
            <div className="max-w-[1120px] mx-auto">
              <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
                <p className="text-xs font-bold tracking-wider uppercase text-[#FF7A00] mb-3">
                  Flagship Program
                </p>
                <h2 id="mentorship-heading" className="text-responsive-h2 font-extrabold mb-3 text-[#0A2540] leading-[1.2]">
                  The 6-Month Mentorship Program
                </h2>
                <p className="text-responsive-body text-[#4A5568] leading-relaxed max-w-3xl mx-auto mb-5">
                  Put our methodology into action with a structured plan: Teaching for clarity, Training for skills, and Mentorship for discipline and confidence.
                </p>

                {/* Highlights Bar */}
                <div className="bg-white rounded-[10px] border border-black/6 p-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] mb-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-muted/30 text-center py-2 px-4 rounded-lg">
                      <span className="text-sm font-bold text-[#0A2540]">2 lakh+ learners</span>
                    </div>
                    <div className="bg-muted/30 text-center py-2 px-4 rounded-lg">
                      <span className="text-sm font-bold text-[#0A2540]">18+ months running</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Pillars Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                <Card className="bg-white border border-black/6 rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">📘</span>
                    <h3 className="text-base md:text-lg font-bold mb-3 text-[#0A2540]">Teaching</h3>
                    <p className="text-sm md:text-base text-[#1A202C] leading-[1.55]">
                      Clear, structured lessons that simplify Options and connect to real market use.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-black/6 rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">⚙️</span>
                    <h3 className="text-base md:text-lg font-bold mb-3 text-[#0A2540]">Training</h3>
                    <p className="text-sm md:text-base text-[#1A202C] leading-[1.55]">
                      Backtesting, paper trading, and templates to build repeatable, reliable skills.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-black/6 rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <span className="text-3xl md:text-4xl mb-4 block" aria-hidden="true">🧭</span>
                    <h3 className="text-base md:text-lg font-bold mb-3 text-[#0A2540]">Mentorship</h3>
                    <p className="text-sm md:text-base text-[#1A202C] leading-[1.55]">
                      Weekly guidance, realistic goals, psychology, and trade journaling for consistency.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Features Bullets */}
              <div className="max-w-3xl mx-auto mb-7">
                <ul className="space-y-3 pl-0 md:pl-4">
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1 min-w-[8px]" aria-hidden="true">•</span>
                    <span className="text-sm md:text-base font-medium text-[#1A202C]">
                      Market-neutral, risk-defined approaches (no tips, no hype).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1 min-w-[8px]" aria-hidden="true">•</span>
                    <span className="text-sm md:text-base font-medium text-[#1A202C]">
                      Personalized plan based on capital, risk tolerance, and goals.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1 min-w-[8px]" aria-hidden="true">•</span>
                    <span className="text-sm md:text-base font-medium text-[#1A202C]">
                      Lifetime access to recorded lessons and study materials.
                    </span>
          </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button 
                  className="bg-[#FF7A00] text-white font-bold py-[14px] px-[22px] rounded-xl shadow-[0_10px_24px_rgba(255,122,0,0.22)] hover:bg-[#FF8A1E] hover:scale-[1.02] transition-all duration-200 tap-target w-full md:w-auto" 
                  asChild
                >
                  <a 
                    href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                    target="_blank"
                    rel="noopener"
                    aria-label="Open the mentorship program in a new tab"
                  >
                    Explore Mentorship Program
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Founder Section */}
      <section id="section-founder" className="py-[88px] relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #0A2540 0%, #071A30 100%)'
      }}>
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}
          aria-hidden="true"
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                <p className="text-xs font-bold tracking-wider uppercase text-[#FF7A00] mb-3">
                  The Founder
                </p>
                <h2 className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-4 text-white leading-[1.2]">
                  Kundan Kishore
                </h2>
                <p className="text-[clamp(16px,2.2vw,20px)] font-medium text-[#E6ECF5] leading-[1.6] mb-6">
                  Ex–Citibank • RBS • Morgan Stanley • Barclays (AVP). 20+ years of market lessons; 2 lakh+ learners trained.
                </p>
                
                <p className="text-[22px] font-[800] text-[#FFCF9E] mb-6 text-left leading-[1.35]">
                  "Education is the solution for most of the problems."
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1">•</span>
                    <span className="text-base text-white/90 leading-[1.6]">
                      Built The School of Options to teach logic-driven, transparent Options trading.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1">•</span>
                    <span className="text-base text-white/90 leading-[1.6]">
                      Mentors traders on market-neutral, risk-defined strategies and discipline.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF7A00] mr-3 mt-1">•</span>
                    <span className="text-base text-white/90 leading-[1.6]">
                      Weekly group mentorship calls, trade journaling, and realistic goal-setting.
                    </span>
                  </li>
                </ul>

                {/* Social Links */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-white/80 mb-4">Connect with Kundan</h3>
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-2">
                    {/* <a 
                      href="https://www.linkedin.com/in/kishorekundan/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center justify-center px-3 py-2 bg-[#FF7A00] hover:bg-[#FF8A1E] border border-white/22 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-[0_6px_16px_rgba(255,122,0,0.25)]"
                      aria-label="Connect on LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href="https://www.facebook.com/kundan1kishore/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center justify-center px-3 py-2 bg-[#FF7A00] hover:bg-[#FF8A1E] border border-white/22 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-[0_6px_16px_rgba(255,122,0,0.25)]"
                      aria-label="Connect on Facebook"
                    >
                      <Facebook size={16} />
                    </a>
                    <a 
                      href="https://www.instagram.com/kundankishore/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center justify-center px-3 py-2 bg-[#FF7A00] hover:bg-[#FF8A1E] border border-white/22 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-[0_6px_16px_rgba(255,122,0,0.25)]"
                      aria-label="Connect on Instagram"
                    >
                      <Instagram size={16} />
                    </a>
                    <a 
                      href="https://x.com/kundankishore" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center justify-center px-3 py-2 bg-[#FF7A00] hover:bg-[#FF8A1E] border border-white/22 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-[0_6px_16px_rgba(255,122,0,0.25)]"
                      aria-label="Connect on X (Twitter)"
                    >
                      <Twitter size={16} />
                    </a>
                    <a 
                      href="https://www.quora.com/profile/Kundan-Kishore-47" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center justify-center px-3 py-2 bg-[#FF7A00] hover:bg-[#FF8A1E] border border-white/22 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-[0_6px_16px_rgba(255,122,0,0.25)]"
                      aria-label="Connect on Quora"
                    >
                      <span className="text-base font-bold" style={{ fontSize: '16px' }}>Q</span>
                    </a> */}
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

              {/* Portrait */}
              <div className="order-1 lg:order-2">
                <div className="relative max-w-[520px] mx-auto">
                  <div className="bg-white border border-black/5 rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-3">
                    <Image
                      src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png"
                      alt="Kundan Kishore — Founder, The School of Options"
                      className="rounded-[12px] w-full shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      width={520}
                      height={520}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="section-newsletter" className="py-[88px] bg-[#F7F9FB]">
        <div className="container mx-auto px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="bg-white rounded-[16px] border border-black/6 shadow-[0_12px_28px_rgba(0,0,0,0.06)] p-[40px] text-center">
              {/* Eyebrow */}
              <p className="text-xs font-bold tracking-wider uppercase text-[#FF7A00] mb-2">
                Join 7,000+ subscribers
              </p>
              
              {/* Headline */}
              <h2 className="text-[clamp(30px,4.6vw,48px)] font-black mb-[14px] text-[#0A2540] leading-[1.15]">
                Weekly Newsletter from Kundan Kishore
              </h2>
              
              {/* Portrait */}
              <div className="flex justify-center mt-[14px] mb-[18px]">
          <Image
                  src="/lovable-uploads/0771f174-6238-46f1-9333-8e156fea40a7.png"
                  alt="Kundan Kishore — Weekly Trading Letter"
                  className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#FF7A00] shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  width={120}
                  height={120}
                />
              </div>
              
              {/* Subheading */}
              <p className="text-[clamp(17px,2.3vw,22px)] font-extrabold text-[#1F2A37] leading-[1.4] mb-[14px]">
                Every Monday at 8:00 AM
              </p>
              
              {/* Body */}
              <p className="text-base text-[#334155] leading-[1.75] mb-[22px] max-w-[720px] mx-auto">
                I send a practical weekly note to prepare you for trading — market outlooks, volatility cues, risk checkpoints, and one mindset reminder. It's the same briefing my mentees rely on to start the week with clarity, discipline, and confidence. Now, you can subscribe too.
              </p>
              
              {/* Email Form */}
              <form 
                className="flex flex-col md:flex-row gap-[10px] justify-center items-center max-w-[520px] mx-auto mb-3"
                onSubmit={handleNewsletterSubscription}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Type your email…"
                  required
                  disabled={isSubscribing}
                  className="h-[52px] px-4 rounded-[12px] bg-white border border-black/14 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] text-[#0A2540] focus:border-[#FF7A00] focus:outline-none w-full md:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="h-[52px] px-[22px] rounded-[12px] bg-[#FF7A00] hover:bg-[#FF8A1E] text-white font-bold shadow-[0_8px_22px_rgba(255,122,0,0.22)] transition-all duration-200 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              
              {/* Privacy Note */}
              <p className="text-sm text-[#64748B]">
                We respect your privacy. No spam—ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Webinar Section */}
      <section id="section-weekly-webinars" className="py-[88px] px-6 relative overflow-hidden dark-gradient">
        {/* Grid Overlay */}
        <div className="grid-overlay"></div>
        
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center">
            {/* Eyebrow */}
            <p className="text-base font-extrabold tracking-wider uppercase text-[#FF7A00] mb-4">
              Free Learning for Aspiring Options Traders
            </p>
            
            {/* Headline */}
            <h2 className="text-[clamp(32px,5vw,44px)] font-extrabold text-white leading-[1.2] mb-6">
              Weekly Live Webinars with Kundan Kishore
            </h2>
            
            {/* Subheading */}
            <p className="text-[clamp(18px,2.5vw,22px)] font-medium text-[#E6ECF5] leading-[1.6] mb-8">
              Every week I host two live webinars to simplify Options Trading for everyone.
            </p>
            
            {/* Timings Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/12 border border-white/30 rounded-full px-4 py-2">
                <span className="text-base font-bold text-white">Saturday 8:00 PM to 10:00 PM</span>
                <span className="text-sm text-[#FFCF9E] ml-3">English</span>
              </div>
              <div className="bg-white/12 border border-white/30 rounded-full px-4 py-2">
                <span className="text-base font-bold text-white">Sunday 8:00 PM to 10:00 PM</span>
                <span className="text-sm text-[#FFCF9E] ml-3">Hindi</span>
              </div>
            </div>
            
            {/* Agenda Card */}
            <div className="bg-white/8 backdrop-blur border border-white/20 rounded-[16px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.3)] mb-8 text-left">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                In each webinar we cover three important areas every trader must understand:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FFCF9E] flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#0A2540]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-white leading-[1.6]">
                    The importance of the derivatives market
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FFCF9E] flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#0A2540]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-white leading-[1.6]">
                    Why ninety one percent of people lose money trading Options in India
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FFCF9E] flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#0A2540]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-white leading-[1.6]">
                    The roadmap to becoming a successful Options trader
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Tagline */}
            <p className="text-lg font-semibold text-[#FFCF9E] mb-8 leading-[1.6]">
              These webinars are designed to spread knowledge. We do not give tips. We do not create hype. We provide clarity, structure, and logic.
            </p>
            
            {/* Registration Form */}
            <div className="bg-white rounded-[16px] p-8 shadow-[0_16px_32px_rgba(0,0,0,0.4)] max-w-md mx-auto">
              <h3 className="text-xl font-bold text-[#0A2540] mb-6">Register for the next session</h3>
                <form className="space-y-4" onSubmit={handleWebinarRegistration}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    disabled={isRegisteringWebinar}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    disabled={isRegisteringWebinar}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number (10 digits)"
                    pattern="^\d{10}$"
                    maxLength={10}
                    minLength={10}
                    required
                    disabled={isRegisteringWebinar}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      // Remove any non-digit characters
                      target.value = target.value.replace(/\D/g, '');
                      // Limit to 10 digits
                      if (target.value.length > 10) {
                        target.value = target.value.slice(0, 10);
                      }
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <select
                    name="preferedLanguage"
                    required
                    disabled={isRegisteringWebinar}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Preferred Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isRegisteringWebinar}
                  className="w-full px-6 py-4 bg-[#FF7A00] hover:bg-[#FF8A1E] text-white font-bold rounded-[12px] shadow-[0_10px_24px_rgba(255,122,0,0.25)] transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Reserve your free webinar seat"
                >
                  {isRegisteringWebinar ? "Registering..." : "Reserve Your Free Seat"}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">
                We respect your privacy. No spam ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-[88px] px-6 bg-[#F7F9FB]">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-12">
            {/* Eyebrow */}
            <p className="text-xs font-bold tracking-wider uppercase text-[#FF7A00] mb-3">
              Affordable Recorded Courses
            </p>
            
            {/* Headline */}
            <h2 className="text-[clamp(28px,4.5vw,40px)] font-extrabold text-[#0A2540] leading-[1.2] mb-3">
              Learn Options Trading at Just ₹990
            </h2>
            
            {/* Subheading */}
            <p className="text-[clamp(16px,2.2vw,20px)] text-[#4A5568] leading-[1.6] max-w-4xl mx-auto mb-8">
              We believe education should be accessible. Along with live mentorship and webinars, we also provide high-quality recorded courses — priced affordably at ₹990 — to help every aspiring trader learn at their own pace.
            </p>
          </div>
          
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Course 1 - Hindi */}
            <div className="bg-white border border-black/6 rounded-[14px] shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6 relative flex flex-col h-full">
              <div className="absolute top-4 left-4 bg-[#0A2540] text-white text-sm font-bold px-3 py-1 rounded-lg">
                ₹990
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-orange-100 to-orange-200 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] mb-4 flex items-center justify-center">
                <div className="text-center text-[#FF7A00]">
                  <div className="text-3xl mb-2">📚</div>
                  <p className="text-sm font-medium">Hindi Course</p>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[#0A2540] mb-2 leading-tight">
                  An Advanced Course on<br />Options Trading in Hindi
                </h3>
                <p className="text-[15px] text-[#1A202C] leading-[1.55]">
                  A complete Hindi-language program covering<br />the essentials of Options Trading with<br />structured lessons and strategies.
                </p>
              </div>
              <a
                href="https://www.kundankishore.in/courses/An-Advance-Course-on-Options-Trading-in-Hindi"
                target="_blank"
                rel="noopener"
                className="inline-block w-full text-center px-5 py-3 bg-primary hover:bg-navy-light text-white font-bold rounded-[12px] shadow-[0_8px_22px_rgba(10,37,64,0.22)] transition-all duration-200 hover:scale-[1.02] mt-4"
                aria-label="Open Hindi Options Trading course in a new tab"
              >
                Enroll Now
              </a>
            </div>

            {/* Course 2 - English */}
            <div className="bg-white border border-black/6 rounded-[14px] shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6 relative flex flex-col h-full">
              <div className="absolute top-4 left-4 bg-[#0A2540] text-white text-sm font-bold px-3 py-1 rounded-lg">
                ₹990
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-blue-200 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] mb-4 flex items-center justify-center">
                <div className="text-center text-blue-600">
                  <div className="text-3xl mb-2">📖</div>
                  <p className="text-sm font-medium">English Course</p>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[#0A2540] mb-2 leading-tight">
                  An Advanced Course on<br />Options Trading in English
                </h3>
                <p className="text-[15px] text-[#1A202C] leading-[1.55]">
                  Learn Options Trading in English with a<br />structured course designed for aspiring<br />traders across India.
                </p>
              </div>
              <a
                href="https://www.kundankishore.in/courses/Advance-Course-on-Options-Trading-in-India"
                target="_blank"
                rel="noopener"
                className="inline-block w-full text-center px-5 py-3 bg-primary hover:bg-navy-light text-white font-bold rounded-[12px] shadow-[0_8px_22px_rgba(10,37,64,0.22)] transition-all duration-200 hover:scale-[1.02] mt-4"
                aria-label="Open English Options Trading course in a new tab"
              >
                Enroll Now
              </a>
            </div>

            {/* Course 3 - Intraday */}
            <div className="bg-white border border-black/6 rounded-[14px] shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6 relative flex flex-col h-full">
              <div className="absolute top-4 left-4 bg-[#0A2540] text-white text-sm font-bold px-3 py-1 rounded-lg">
                ₹990
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-green-100 to-green-200 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] mb-4 flex items-center justify-center">
                <div className="text-center text-green-600">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-medium">Intraday Mastery</p>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[#0A2540] mb-2 leading-tight">
                  Intraday Options Buying<br />Mastery by Kundan Kishore
                </h3>
                <p className="text-[15px] text-[#1A202C] leading-[1.55]">
                  Master intraday Options buying with<br />practical strategies and step-by-step<br />lessons to sharpen your skills.
                </p>
              </div>
              <a
                href="https://www.kundankishore.in/courses/intraday-options-buying-mastery"
                target="_blank"
                rel="noopener"
                className="inline-block w-full text-center px-5 py-3 bg-primary hover:bg-navy-light text-white font-bold rounded-[12px] shadow-[0_8px_22px_rgba(10,37,64,0.22)] transition-all duration-200 hover:scale-[1.02] mt-4"
                aria-label="Open Intraday Options Buying Mastery course in a new tab"
              >
                Enroll Now
              </a>
            </div>
          </div>
          
          {/* Main CTA */}
          <div className="text-center">
            <a
              href="https://www.kundankishore.in/s/store"
              target="_blank"
              rel="noopener"
              className="inline-block px-6 py-3 bg-[#FF7A00] hover:bg-[#FF8A1E] text-white font-bold rounded-[12px] shadow-[0_8px_22px_rgba(255,122,0,0.22)] transition-all duration-200 hover:scale-[1.02]"
              aria-label="Explore all courses in the store"
            >
              Explore More Courses
            </a>
          </div>
        </div>
      </section>

      {/* Alumni Connect Section */}
      <section id="section-alumni" className="py-[88px] px-6 relative overflow-hidden dark-gradient">
        {/* Grid Overlay */}
        <div className="grid-overlay"></div>
        
        <div className="max-w-[860px] mx-auto relative z-10 text-center">
          {/* Eyebrow */}
          <p className="text-sm font-bold tracking-wider uppercase text-[#FF7A00] mb-4">
            Real People. Real Journeys.
          </p>
          
          {/* Headline */}
          <h2 className="text-[clamp(28px,4.5vw,40px)] font-extrabold text-white leading-[1.2] mb-6">
            Talk to Our Alumni
          </h2>
          
          {/* Subheading */}
          <p className="text-[clamp(16px,2.2vw,20px)] font-medium text-[#E6ECF5] leading-[1.6] mb-4 max-w-[700px] mx-auto">
            Want to know if The School of Options really works? Don't just take our word for it. Talk directly to our alumni — traders who were once beginners like you and now trade with logic, discipline, and confidence.
          </p>
          
          {/* Tagline */}
          <p className="text-base font-semibold text-[#FFCF9E] mb-4 mt-4">
            We believe in full transparency. If you want to connect, just click below and our team will arrange a call with one of our alumni mentors.
          </p>
          
          {/* Micro Note */}
          <p className="text-sm text-[#E6ECF5]/80 mb-8">
            Our team will arrange a one-on-one call with an alumni for you.
          </p>
          
          {/* WhatsApp CTA */}
          <div className="flex justify-center">
            <a
              href="https://wa.aisensy.com/aaal1i"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 px-6 py-[14px] bg-[#FF7A00] hover:bg-[#FF8A1E] text-white font-bold rounded-[12px] shadow-[0_8px_20px_rgba(255,122,0,0.25)] transition-all duration-200 hover:scale-[1.03] md:px-6 md:py-[14px] md:rounded-[12px] max-md:w-full max-md:justify-center"
              aria-label="Talk to an Alumni on WhatsApp"
            >
              <MessageCircle size={20} className="text-[#25D366]" />
              <span>Talk to an Alumni on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <DedicationAndVideosSection />

      <Footer />
      </main>
    </div>
  );
};

export default HomePage;