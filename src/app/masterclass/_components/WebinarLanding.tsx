"use client";

import { CountdownTimer } from './CountdownTimer';
import { RegistrationForm } from './RegistrationForm';
import { StickyBar } from './StickyBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export const WebinarLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 masterclass-dark">
      <StickyBar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 space-y-10">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-gradient-orange px-4 py-2 rounded-full text-sm font-semibold text-white shadow-orange hover-scale">
                  <span className="text-base">⚠️</span>
                  <span>95% of Options Traders <span className="font-bold">Lose Money</span></span>
                </div>
                
                <div className="space-y-8">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Learn the <span className="text-gradient-orange">logic</span> and<br />
                    <span className="text-gradient-orange">discipline</span><br />
                    <span className="text-muted-foreground text-4xl sm:text-5xl lg:text-6xl">most traders never get</span>
                  </h1>
                  
                  {/* Enhanced Masterclass and Presenter Section */}
                  <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 border border-primary/20 backdrop-blur-sm">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-glow/20 to-transparent rounded-full transform -translate-x-12 translate-y-12 blur-xl"></div>
                    
                    <div className="relative space-y-6">
                      {/* FREE MasterClass Title */}
                      <div className="text-left space-y-4">
                        <div className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-sm font-semibold">
                          <span>🔴</span>
                          <span>Live</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
                          <span className="text-gradient-orange">FREE</span> 2-hour<br />
                          MasterClass
                        </h2>
                      </div>
                      
                      {/* Presenter Section */}
                      <div className="flex flex-col space-y-4">
                        <span className="text-xl text-muted-foreground font-medium tracking-wide">by</span>
                        
                        <div className="flex items-center gap-6">
                          {/* Enhanced Profile Photo */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-md opacity-60"></div>
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl">
                              <img 
                                src="/kundan-portrait.jpg" 
                                alt="Kundan Kishore - Options Trading Expert" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Name and Credentials */}
                          <div className="space-y-1">
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                              Kundan Kishore
                            </h3>
                            <p className="text-sm text-primary font-medium">
                              Options Trading Expert • 20+ Years Experience
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  <Card className="p-4 bg-card/80 border-border backdrop-blur-sm hover-scale transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Every Saturday</div>
                        <div className="text-sm text-muted-foreground">English Session</div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-card/80 border-border backdrop-blur-sm hover-scale transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl">🕗</span>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">8:00 – 10:00 PM</div>
                        <div className="text-sm text-muted-foreground">IST</div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-card/80 border-border backdrop-blur-sm hover-scale transition-all duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl">🌍</span>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Hindi (Sun)</div>
                        <div className="text-sm text-muted-foreground">Also Available</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="text-center space-y-4 animate-scale-in">
                <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Limited Seats Available</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Secure Your Spot</h2>
                <p className="text-muted-foreground">Join 1.5 lakh+ learners already trained</p>
              </div>
              
              <div data-registration-form className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl blur-xl"></div>
                <div className="relative">
                  <RegistrationForm />
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>No Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">1.5L+</div>
              <div className="text-sm lg:text-base text-muted-foreground">Trained Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary flex items-center justify-center gap-1">
                4.9<span className="text-2xl lg:text-3xl">★</span>
              </div>
              <div className="text-sm lg:text-base text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">95%</div>
              <div className="text-sm lg:text-base text-muted-foreground">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">20+</div>
              <div className="text-sm lg:text-base text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Most Traders Fail */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Title with warning icon */}
          <div className="text-center mb-12">
            <div className="inline-flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-center">
                <span className="text-destructive">Why Most Traders</span><br />
                <span className="text-foreground">Fail</span>
              </h2>
            </div>
          </div>

          {/* Content in two columns */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left side - Problem points */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">The Exciting Trap</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tips, charts, and guesswork feel exciting-but they don't build consistency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">The Hard Truth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Most traders skip the hard parts: risk control, neutrality, and process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">The Result</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Loss after loss, with no clear path to improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Solution card */}
            <div className="bg-card/80 border border-border rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">The Real Problem</h3>
                  <p className="text-lg text-foreground font-medium leading-relaxed">
                    It's not that Options are impossible-most people are taught the wrong way.
                  </p>
                  <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action subtle hint */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              There's a systematic approach that actually works. Let us show you the difference.
            </p>
          </div>
        </div>
      </section>

      {/* There's a Better Way */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            There's a Better Way
          </h2>
          <div className="text-lg text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p className="mb-6">
              You don't need jackpot trades. You need a system built on probabilities, market neutrality, and discipline.
            </p>
            <p className="font-semibold text-foreground">
              In this MasterClass, I'll show you the path I wish I had 20 years ago-so you can stop losing and start thinking like a professional.
            </p>
          </div>
        </div>
      </section>

      {/* Inside the MasterClass */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Inside the 2-Hour MasterClass
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-6 shadow-card bg-card border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/60 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">📚</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">The basics of Options Trading</h3>
                <p className="text-muted-foreground">(no jargon)</p>
              </div>
            </Card>
            
            <Card className="p-8 space-y-6 shadow-card bg-card border-border">
              <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-warning/60 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">⚠️</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">The real reasons</h3>
                <p className="text-muted-foreground">95% of traders lose money</p>
              </div>
            </Card>
            
            <Card className="p-8 space-y-6 shadow-card bg-card border-border">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-accent/60 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🎯</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">The 3-step system</h3>
                <p className="text-muted-foreground">to trade with logic and confidence</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentor Bio */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Meet Your Mentor - Kundan Kishore
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  I've spent <span className="font-semibold text-foreground">20+ years in markets and finance</span>-working with Citibank, RBS, Morgan Stanley, and Barclays Capital (AVP).
                </p>
                <p>
                  I also lived the retail trader's struggle, blowing up lakhs before discovering what truly works: <span className="font-semibold text-foreground">logic + neutrality + discipline</span>.
                </p>
                <p>
                  Today, <span className="font-semibold text-foreground">1.5 lakh+ learners</span> trust my training to trade smarter. Join me and learn the way I wish I had when I started.
                </p>
              </div>
              <div className="space-y-4">
                <p className="font-semibold text-foreground">Previously worked with:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">Citibank</div>
                  <div className="text-sm font-medium text-muted-foreground">RBS</div>
                  <div className="text-sm font-medium text-muted-foreground">Morgan Stanley</div>
                  <div className="text-sm font-medium text-muted-foreground">Barclays Capital</div>
                </div>
              </div>
            </div>
            <div className="lg:pl-12 space-y-8">
              {/* Kundan's Photo */}
              <div className="relative mx-auto w-fit">
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                  <img 
                    src="/kundan-portrait.jpg" 
                    alt="Kundan Kishore - Options Trading Expert" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">1.5L+</div>
                  <div className="text-sm text-muted-foreground">learners</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">20+</div>
                  <div className="text-sm text-muted-foreground">years in markets</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-xl font-bold text-primary mb-1">Proven Mentorship</div>
                  <div className="text-sm text-muted-foreground">Method That Works</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <span>⭐</span>
              <span>Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              What Our <span className="text-gradient-orange">Learners</span> Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real traders who transformed their approach with our systematic method
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Testimonial */}
            <div className="lg:col-span-1">
              <Card className="p-8 h-full bg-card border-border relative overflow-hidden">
                <div className="space-y-6">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="text-6xl text-primary/30 font-serif leading-none">"</div>
                  
                  {/* Testimonial Text */}
                  <p className="text-lg text-foreground font-medium leading-relaxed -mt-8">
                    Finally understood why I was losing money consistently. The neutrality approach and systematic process changed everything for me. Now I trade with confidence, not emotion.
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">RK</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">IT Professional • 3+ years trading</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Regular Testimonials */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">★</span>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <p className="text-muted-foreground leading-relaxed">
                    "No more emotional trading. The 3-step system gave me the discipline I needed to be consistently profitable. Best investment in my trading journey."
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">PS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Business Owner</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">★</span>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <p className="text-muted-foreground leading-relaxed">
                    "Best trading education I've received. Practical, logical, and results-oriented approach. No fluff, just pure value and actionable strategies."
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">AP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Amit Patel</p>
                      <p className="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">★</span>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <p className="text-muted-foreground leading-relaxed">
                    "Kundan sir's teaching methodology is exceptional. Complex concepts explained in simple terms. My trading P&L improved within weeks of applying his strategies."
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">SK</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Suresh Khanna</p>
                      <p className="text-xs text-muted-foreground">Chartered Accountant</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">★</span>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <p className="text-muted-foreground leading-relaxed">
                    "From losing money to making consistent profits. The risk management techniques alone are worth more than what I paid for entire courses elsewhere."
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">MG</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Meera Gupta</p>
                      <p className="text-xs text-muted-foreground">Doctor</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Trust Statistics */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">1.5L+</div>
                <div className="text-sm text-muted-foreground">Trained Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Upcoming Sessions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4 shadow-card bg-card border-border">
              <h3 className="text-xl font-bold text-foreground">English Sessions</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Every Saturday, 8:00 – 10:00 PM IST</p>
                <p>Live on Zoom/Google Meet</p>
                <p>Weekly Schedule Available</p>
              </div>
            </Card>
            <Card className="p-6 space-y-4 shadow-card bg-card border-border">
              <h3 className="text-xl font-bold text-foreground">Hindi Sessions</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Every Sunday, 8:00 – 10:00 PM IST</p>
                <p>Live on Zoom/Google Meet</p>
                <p>Weekly Schedule Available</p>
              </div>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            📹 Live on Zoom/Google Meet • Recording not shared
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                Is this for beginners?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, this MasterClass is designed for complete beginners. We start with the fundamentals and build up to advanced concepts without any jargon.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                Will you give tips?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, we don't give tips. Instead, we teach you the system and logic to make your own informed decisions. This is about education, not shortcuts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                Do I need capital to start?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The MasterClass is purely educational. You don't need any capital to attend. We'll discuss capital requirements as part of the training.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                What language options are available?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer sessions in both English (Saturdays) and Hindi (Sundays) at 8:00-10:00 PM IST.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                Is it really free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, the 2-hour MasterClass is completely free. No hidden charges or upsells during the session.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                Will I get the recording?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, recordings are not shared to maintain the exclusivity and value of live attendance. Make sure to attend the live session.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-orange text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Limited Seats - Claim Yours Now
            </h2>
            <p className="text-xl text-white/90">
              Stop guessing. Start trading with logic. See you Saturday, 8 PM.
            </p>
          </div>
          
          <div className="space-y-6">
            <Button 
              size="lg"
              onClick={() => {
                const element = document.querySelector('[data-registration-form]');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Register Now - Free
            </Button>
            
            <div className="space-y-2">
              <p className="text-white font-semibold">Get the 3-Step Checklist PDF</p>
              <p className="text-sm text-white/80">
                🔥 Next session starts in just a few days • Free registration closes when seats fill up
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            <strong className="text-foreground">Risk Disclosure:</strong> Trading involves risk. Past performance does not guarantee future results. This session focuses on education-not tips or assured returns. Always consult with a qualified financial advisor before making trading decisions.
          </p>
        </div>
      </section>
    </div>
  );
};
