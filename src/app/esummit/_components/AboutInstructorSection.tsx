import { Award, Users, TrendingUp, Heart, Briefcase, GraduationCap, Star, Building2 } from "lucide-react";
import kundanImage from "/public/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png";
import morganStanleyBadge from "@/assets/morgan_stanley1671191982870.png";
import barclaysBadge from "@/assets/barclays-investment-bank-logo-115630277832rlaxpy1ry.png";
import rbsBadge from "@/assets/rbs.png";
import bitsPilaniBadge from "@/assets/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png";

export const AboutInstructorSection = () => {
  const floatingStats = [
    {
      icon: Briefcase,
      value: "18+",
      label: "Years Experience",
      position: "top-4 left-0 md:top-8 md:left-0",
      delay: "0s"
    },
    {
      icon: Users,
      value: "2L+",
      label: "Students Trained",
      position: "top-0 right-4 md:top-0 md:right-8",
      delay: "0.2s"
    },
    {
      icon: Star,
      value: "3.5M+",
      label: "Followers",
      position: "bottom-8 left-0 md:bottom-12 md:left-4",
      delay: "0.4s"
    },
    {
      icon: GraduationCap,
      value: "Global",
      label: "Institutions",
      position: "bottom-0 right-4 md:bottom-4 md:right-0",
      delay: "0.6s"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-white">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      
      {/* Stock Market Chart Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
      </div>
      
      {/* Additional chart line decorations */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chart-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 L 100 50" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              <path d="M 50 0 L 50 100" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chart-grid)" />
        </svg>
      </div>
      
      {/* Trading theme decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
        <TrendingUp className="w-full h-full text-success animate-pulse" />
      </div>
      <div className="absolute bottom-40 left-20 w-28 h-28 opacity-10">
        <TrendingUp className="w-full h-full text-primary animate-float" />
      </div>
      
      {/* Subtle gradient blobs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block gradient-primary px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-glow">
            <Heart className="w-4 h-4 inline mr-2" />
            Learn from the Expert
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet Your <span className="text-gradient-primary">Instructor</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            18+ years of Investment Banking expertise, now empowering 2 lakh+ Indians
          </p>
        </div>

        {/* Main Content - Centered Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Image Section with Floating Badges */}
          <div className="relative mb-20 px-4 md:px-0">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Main circular image container */}
              <div className="relative aspect-square max-w-xs sm:max-w-md md:max-w-lg mx-auto">
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-20" style={{ animationDuration: "8s" }} />
                
                {/* Outer glow ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
                
                {/* Image container with circular mask */}
                <div className="absolute inset-8 rounded-full overflow-hidden shadow-elevated border-4 border-card">
                  <img 
                    src={kundanImage.src} 
                    alt="Kundan Kishore - Investment Banking Expert" 
                    className="w-full h-full object-cover object-top scale-110"
                    style={{ filter: "brightness(1.05) contrast(1.05)" }}
                  />
                  {/* Gradient overlay to blend bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Floating Achievement Badges */}
                {floatingStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`absolute ${stat.position} animate-bounce-gentle`}
                    style={{ 
                      animationDelay: stat.delay,
                      animationDuration: "3s",
                      animationIterationCount: "infinite"
                    }}
                  >
                    <div className="gradient-card px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-elevated border border-border/50 backdrop-blur-sm hover:scale-110 transition-bounce">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                          <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl md:text-2xl font-bold text-gradient-primary leading-none mb-0.5 md:mb-1">
                            {stat.value}
                          </p>
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name and Title - Below Image */}
            <div className="text-center mt-8 md:mt-12 px-4">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 md:mb-3">
                Kundan Kishore
              </h3>
              <p className="text-xl sm:text-2xl text-gradient-primary mb-1 md:mb-2 font-semibold">
                Entrepreneur & Financial Educator
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Ex-Investment Banking Professional | BITS Pilani Alumnus
              </p>
            </div>
          </div>

          {/* Bio Content */}
          <div className="max-w-4xl mx-auto">
            <div className="gradient-card p-8 md:p-12 rounded-3xl shadow-elevated relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              
              <div className="relative space-y-6 text-center text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  Hi, I'm <span className="text-foreground font-bold text-xl">Kundan Kishore</span>, an ex-Investment Banking professional with over <span className="text-primary font-semibold">18 years of experience</span> working for prestigious global institutions including Barclays, Morgan Stanley, and RBS.
                </p>
                
                <p className="text-muted-foreground">
                  Through my comprehensive courses and masterclasses, more than <span className="text-primary font-semibold text-xl">2 lakh people</span> have gained valuable insights into investing and trading, transforming their financial futures.
                </p>
                
                <div className="py-6">
                  <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
                </div>
                
                <p className="text-foreground font-semibold text-xl italic">
                  "I'm on a mission to empower every Indian with the financial knowledge that directly impacts their daily lives."
                </p>
                
                <p className="text-muted-foreground">
                  Whether you're an investor, trader, or someone looking to improve your financial well-being, I'm here to help you navigate the complexities of finance with <span className="text-foreground font-semibold">confidence and clarity</span>.
                </p>
                
                <div className="pt-6">
                  <p className="text-2xl font-bold text-gradient-accent">
                    Together, we can build a financially empowered India. 🇮🇳
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Credentials - Minimalistic */}
          <div className="mt-20 max-w-6xl mx-auto overflow-hidden">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground/70 font-medium tracking-wide">
                Experience With Global Leaders
              </p>
            </div>
            
            {/* Background container for logos */}
            <div className="gradient-card rounded-2xl p-8 shadow-card relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              
              {/* Auto-scrolling Container */}
              <div className="relative">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
              
              <div className="flex animate-scroll-horizontal hover:pause">
                {/* First set of logos */}
                <div className="flex gap-12 md:gap-16 min-w-max px-8 items-center">
                  {/* Barclays */}
                  <div className="flex-shrink-0">
                    <img 
                      src={barclaysBadge.src} 
                      alt="Barclays Ex-AVP"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* Morgan Stanley */}
                  <div className="flex-shrink-0">
                    <img 
                      src={morganStanleyBadge.src} 
                      alt="Morgan Stanley Ex-Associate"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* RBS */}
                  <div className="flex-shrink-0">
                    <img 
                      src={rbsBadge.src} 
                      alt="RBS Ex-Analyst"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* BITS Pilani */}
                  <div className="flex-shrink-0">
                    <img 
                      src={bitsPilaniBadge.src} 
                      alt="BITS Pilani Proud Alumnus"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-12 md:gap-16 min-w-max px-8 items-center">
                  {/* Barclays */}
                  <div className="flex-shrink-0">
                    <img 
                      src={barclaysBadge.src} 
                      alt="Barclays Ex-AVP"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* Morgan Stanley */}
                  <div className="flex-shrink-0">
                    <img 
                      src={morganStanleyBadge.src} 
                      alt="Morgan Stanley Ex-Associate"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* RBS */}
                  <div className="flex-shrink-0">
                    <img 
                      src={rbsBadge.src} 
                      alt="RBS Ex-Analyst"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* BITS Pilani */}
                  <div className="flex-shrink-0">
                    <img 
                      src={bitsPilaniBadge.src} 
                      alt="BITS Pilani Proud Alumnus"
                      className="h-16 md:h-20 w-auto object-contain"
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};