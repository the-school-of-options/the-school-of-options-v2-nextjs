import { Metadata } from "next";
import Image from "next/image";
import { newsletterContent } from "./content";
import SubscribeForm from "./_components/SubscribeForm";
import StackGroup from "./_components/StackGroup";
import TestimonialCard from "./_components/TestimonialCard";
import StatChip from "./_components/StatChip";
import StickyBar from "./_components/StickyBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Weekly Newsletter from Kundan Kishore | The School of Options",
  description: "Get practical weekly trading insights, market outlooks, volatility cues, and risk checkpoints from Kundan Kishore. Join 7,000+ subscribers for clarity, discipline, and confidence.",
  keywords: "newsletter, trading insights, market outlook, options trading, weekly briefing, Kundan Kishore",
  authors: [{ name: "Kundan Kishore" }],
  creator: "Kundan Kishore",
  publisher: "The School of Options",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theschoolofoptions.com/newsletter",
    title: "Weekly Newsletter from Kundan Kishore | The School of Options",
    description: "Get practical weekly trading insights, market outlooks, volatility cues, and risk checkpoints from Kundan Kishore. Join 7,000+ subscribers for clarity, discipline, and confidence.",
    siteName: "The School of Options",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekly Newsletter from Kundan Kishore | The School of Options",
    description: "Get practical weekly trading insights, market outlooks, volatility cues, and risk checkpoints from Kundan Kishore. Join 7,000+ subscribers for clarity, discipline, and confidence.",
    creator: "@kundankishore",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            /* Newsletter Theme Colors */
            --newsletter-primary-900: #0F172A;     /* Deep slate */
            --newsletter-primary-800: #1E293B;     /* Dark slate */
            --newsletter-primary-700: #334155;     /* Medium slate */
            --newsletter-accent-500: #10B981;      /* Emerald green */
            --newsletter-accent-400: #34D399;      /* Light emerald */
            --newsletter-text-100: #F8FAFC;        /* Pure white */
            --newsletter-text-80: rgba(248,250,252,0.8);  /* High contrast text */
            --newsletter-text-60: rgba(248,250,252,0.6);  /* Medium text */
            --newsletter-text-40: rgba(248,250,252,0.4);  /* Muted text */
            --newsletter-border-10: rgba(255,255,255,0.05); /* Subtle borders */
            --newsletter-border-20: rgba(255,255,255,0.1);  /* Medium borders */
            --newsletter-gradient-primary: linear-gradient(135deg, #10B981 0%, #34D399 100%);
            --newsletter-gradient-secondary: linear-gradient(135deg, #1E293B 0%, #334155 100%);
            --newsletter-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --newsletter-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --newsletter-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --newsletter-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }

          /* Glass Effect */
          .newsletter-glass {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Gradient Text */
          .newsletter-gradient-text {
            background: var(--newsletter-gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Hover Effects */
          .newsletter-hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .newsletter-hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: var(--newsletter-shadow-xl);
          }

          .newsletter-hover-glow:hover {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
          }

          /* Glow Animation for CTAs */
          @keyframes newsletterGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3);
            }
          }

          .newsletter-glow-animation {
            animation: newsletterGlow 2s ease-in-out infinite;
          }

          .newsletter-glow-animation:hover {
            animation: newsletterGlow 1s ease-in-out infinite;
          }

          /* Button Styles */
          .newsletter-btn-primary {
            background: var(--newsletter-gradient-primary);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .newsletter-btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .newsletter-btn-primary:hover::before {
            left: 100%;
          }

          .newsletter-btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          }

          /* Animations */
          @keyframes newsletterFadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .newsletter-text-reveal {
            animation: newsletterFadeInUp 0.8s ease-out;
          }

          /* Reduced Motion Support */
          @media (prefers-reduced-motion: reduce) {
            .newsletter-hover-lift:hover {
              transform: none;
            }
            
            .newsletter-text-reveal {
              animation: none;
            }
          }
        `
      }} />

      <div className="min-h-screen bg-[var(--newsletter-primary-900)] text-[var(--newsletter-text-100)]">
        {/* Sticky Bar */}
        <StickyBar />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-24 md:pb-24 relative overflow-hidden">
          {/* Modern Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--newsletter-accent-400)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-5"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              {/* <div className="inline-flex items-center px-6 py-3 bg-[#FAC846] text-[var(--newsletter-primary-900)] rounded-full text-sm font-semibold mb-8 shadow-lg newsletter-text-reveal">
                <span className="w-2 h-2 bg-[var(--newsletter-primary-900)] rounded-full mr-2 animate-pulse"></span>
                {newsletterContent.hero.badge}
              </div> */}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--newsletter-text-100)] mb-6 newsletter-text-reveal">
                Weekly Newsletter from <span className="text-[#2dcf95]">Kundan Kishore</span>
              </h1>

              {/* Cadence - Hidden on mobile, shown below form */}
              <div className="hidden md:inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-lg text-[var(--newsletter-text-80)] mb-8 shadow-sm border border-[var(--newsletter-border-20)] newsletter-text-reveal">
                <svg className="w-5 h-5 mr-2 text-[var(--newsletter-accent-500)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {newsletterContent.hero.cadence}
              </div>

              {/* Description */}
              <p className="text-l text-[var(--newsletter-text-80)] mb-8 max-w-3xl mx-auto leading-relaxed newsletter-text-reveal">
                {newsletterContent.hero.body}
              </p>

              {/* Author Portrait */}
              <div className="mb-12 newsletter-text-reveal">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] flex items-center justify-center shadow-2xl ring-4 ring-white/20 p-1">
                  <img 
                    src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png" 
                    alt="Kundan Kishore"
                    className="w-full h-full rounded-full object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Subscribe Form */}
              <div id="subscribe" className="max-w-lg mx-auto newsletter-glass p-8 rounded-3xl border border-[var(--newsletter-border-20)] shadow-2xl newsletter-text-reveal">
                <SubscribeForm
                  placeholder={newsletterContent.hero.inputPlaceholder}
                  cta={newsletterContent.hero.cta}
                  micro={newsletterContent.hero.micro}
                />
                
                {/* Cadence - Show below form on mobile */}
                <div className="md:hidden mt-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-[var(--newsletter-text-80)] shadow-sm border border-[var(--newsletter-border-20)]">
                    <svg className="w-4 h-4 mr-2 text-[var(--newsletter-accent-500)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {newsletterContent.hero.cadence}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll get Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--newsletter-primary-800)] via-[var(--newsletter-primary-700)] to-[var(--newsletter-primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--newsletter-accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2dcf95] mb-12 newsletter-text-reveal">
                {newsletterContent.value.title}
              </h2>
              
              <StackGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsletterContent.value.items.map((item, index) => (
                  <Card key={index} className="newsletter-glass rounded-2xl p-6 newsletter-hover-lift newsletter-hover-glow">
                    <CardHeader>
                      <CardTitle className="text-xl text-[var(--newsletter-text-100)]">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed text-[var(--newsletter-text-80)]">
                        {item.body}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </StackGroup>
            </div>
          </div>
        </section>

        {/* About Kundan Section - Redesigned */}
        <section className="py-16 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--newsletter-primary-900)] to-[var(--newsletter-primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-48 h-48 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[var(--newsletter-accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2dcf95] mb-12 newsletter-text-reveal">
                {newsletterContent.author.heading}
              </h2>
              
              {/* Main Content Grid - Better Space Utilization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile & Stats */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Profile Card */}
                  <div className="newsletter-glass rounded-3xl p-8 newsletter-hover-lift newsletter-hover-glow text-center">
                    <div className="relative mb-7">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] rounded-full flex items-center justify-center shadow-2xl">
                        <img 
                          src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png" 
                          alt="Kundan Kishore"
                          className="w-full h-full rounded-full object-contain bg-white p-1"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--newsletter-accent-500)] rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--newsletter-primary-900)]">
                        <svg className="w-4 h-4 text-[var(--newsletter-primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--newsletter-text-100)] mb-2">Kundan Kishore</h3>
                    <p className="text-[var(--newsletter-text-100)] font-semibold text-lg mb-6">Founder & Chief Mentor</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 ">
                    {newsletterContent.author.stats.map((stat, index) => (
                      <div key={index} className="newsletter-glass rounded-2xl p-8 newsletter-hover-lift newsletter-hover-glow text-center group">
                        <div className="text-3xl font-bold text-[var(--newsletter-accent-500)] mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.split(' ')[0]}
                        </div>
                        <div className="text-xs text-[var(--newsletter-text-80)] leading-tight font-medium">
                          {stat.split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Bio & Career Journey */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Bio Section */}
                  <div className="newsletter-glass rounded-3xl p-8 newsletter-hover-lift newsletter-hover-glow">
                    <h4 className="text-xl font-bold text-[var(--newsletter-text-100)] mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--newsletter-primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Experience & Philosophy
                    </h4>
                    <div className="space-y-4">
                      {newsletterContent.author.bio.map((paragraph, index) => (
                        <p key={index} className="text-[var(--newsletter-text-80)] leading-relaxed text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Career Journey - Responsive Layout */}
                  <div className="newsletter-glass rounded-3xl p-6 sm:p-8 newsletter-hover-lift newsletter-hover-glow">
                    <h4 className="text-xl font-bold text-[var(--newsletter-text-100)] mb-6 sm:mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--newsletter-primary-900)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Career Journey
                    </h4>
                    
                    {/* Mobile: Vertical Timeline, Desktop: Horizontal Timeline */}
                    <div className="relative">
                      {/* Desktop: Horizontal Timeline Line */}
                      <div className="hidden md:block absolute top-16 left-12 right-12 h-1 bg-gradient-to-r from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] rounded-full"></div>
                      
                      {/* Desktop: Horizontal Layout */}
                      <div className="hidden md:flex justify-between items-start px-4">
                        {newsletterContent.author.career.map((exp, index) => (
                          <div key={index} className="flex flex-col items-center group relative flex-1 max-w-32">
                            {/* Timeline Dot */}
                            <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl mb-6 transition-all duration-300 group-hover:scale-110 ${
                              exp.current 
                                ? 'bg-gradient-to-r from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] ring-4 ring-[var(--newsletter-accent-500)] ring-opacity-30' 
                                : 'bg-[var(--newsletter-primary-800)] border-4 border-[var(--newsletter-accent-500)]'
                            }`}>
                              {exp.logo === "R" ? (
                                <span className="text-[var(--newsletter-primary-900)] font-bold text-xl">{exp.logo}</span>
                              ) : exp.logo === "TSO" ? (
                                <span className="text-[var(--newsletter-primary-900)] font-bold text-xl">{exp.logo}</span>
                              ) : exp.logo === "/assets/rbs.png" ? (
                                <img 
                                  src={exp.logo} 
                                  alt={`${exp.company} logo`}
                                  className="w-10 h-10 object-contain"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <img 
                                  src={exp.logo} 
                                  alt={`${exp.company} logo`}
                                  className="w-10 h-10 object-contain"
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                            </div>
                            
                            {/* Company Info - Fixed alignment */}
                            <div className="text-center flex flex-col justify-end min-h-[120px]">
                              <div className={`font-bold text-lg mb-2 leading-tight ${
                                exp.current ? 'text-[var(--newsletter-accent-500)]' : 'text-[var(--newsletter-text-100)]'
                              }`}>
                                {exp.company}
                              </div>
                              <div className={`text-sm mb-2 leading-tight ${
                                exp.current ? 'text-[var(--newsletter-accent-500)]' : 'text-[var(--newsletter-text-80)]'
                              }`}>
                                {exp.role}
                              </div>
                              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                exp.current 
                                  ? 'bg-[var(--newsletter-primary-900)] text-[var(--newsletter-accent-500)]' 
                                  : 'bg-[var(--newsletter-accent-500)] text-[var(--newsletter-primary-900)]'
                              }`}>
                                {exp.period}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Mobile: Vertical Timeline Layout */}
                      <div className="md:hidden space-y-6">
                        {newsletterContent.author.career.map((exp, index) => (
                          <div key={index} className="flex items-start gap-4 group">
                            {/* Timeline Dot and Line */}
                            <div className="flex flex-col items-center">
                              <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 ${
                                exp.current 
                                  ? 'bg-gradient-to-r from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] ring-4 ring-[var(--newsletter-accent-500)] ring-opacity-30' 
                                  : 'bg-[var(--newsletter-primary-800)] border-4 border-[var(--newsletter-accent-500)]'
                              }`}>
                                {exp.logo === "R" ? (
                                  <span className="text-[var(--newsletter-primary-900)] font-bold text-lg">{exp.logo}</span>
                                ) : exp.logo === "TSO" ? (
                                  <span className="text-[var(--newsletter-primary-900)] font-bold text-lg">{exp.logo}</span>
                                ) : exp.logo === "/assets/rbs.png" ? (
                                  <img 
                                    src={exp.logo} 
                                    alt={`${exp.company} logo`}
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                    decoding="async"
                                  />
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
                              {/* Vertical Line Connector */}
                              {index < newsletterContent.author.career.length - 1 && (
                                <div className="w-1 h-8 bg-gradient-to-b from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] mt-2"></div>
                              )}
                            </div>
                            
                            {/* Company Info */}
                            <div className="flex-1 pt-2">
                              <div className={`font-bold text-lg mb-2 ${
                                exp.current ? 'text-[var(--newsletter-accent-500)]' : 'text-[var(--newsletter-text-100)]'
                              }`}>
                                {exp.company}
                              </div>
                              <div className={`text-sm mb-3 ${
                                exp.current ? 'text-[var(--newsletter-accent-500)]' : 'text-[var(--newsletter-text-80)]'
                              }`}>
                                {exp.role}
                              </div>
                              <div className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                                exp.current 
                                  ? 'bg-[var(--newsletter-primary-900)] text-[var(--newsletter-accent-500)]' 
                                  : 'bg-[var(--newsletter-accent-500)] text-[var(--newsletter-primary-900)]'
                              }`}>
                                {exp.period}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--newsletter-primary-800)] via-[var(--newsletter-primary-700)] to-[var(--newsletter-primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-48 h-48 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-[var(--newsletter-accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2dcf95] mb-12 newsletter-text-reveal">
                What Subscribers say
              </h2>
              
              <StackGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsletterContent.testimonials.map((testimonial, index) => (
                  <div key={index} className="newsletter-glass rounded-2xl p-6 newsletter-hover-lift newsletter-hover-glow">
                    <blockquote className="text-[var(--newsletter-text-100)] mb-4">
                      <p className="text-base leading-relaxed">"{testimonial.quote}"</p>
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] flex items-center justify-center">
                        <span className="text-[var(--newsletter-primary-900)] font-semibold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--newsletter-text-100)] text-sm">{testimonial.name}</div>
                        <div className="text-[var(--newsletter-text-60)] text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </StackGroup>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--newsletter-primary-900)] to-[var(--newsletter-primary-800)]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/3 w-40 h-40 bg-[var(--newsletter-accent-500)] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-[var(--newsletter-accent-400)] rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2dcf95] mb-12 newsletter-text-reveal">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {newsletterContent.faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="newsletter-glass rounded-2xl px-6 newsletter-hover-lift">
                    <AccordionTrigger className="text-left font-semibold text-[var(--newsletter-text-100)]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--newsletter-text-80)] leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-8 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--newsletter-primary-800)] to-[var(--newsletter-primary-900)]"></div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-[var(--newsletter-text-60)]">
                {newsletterContent.compliance}
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
