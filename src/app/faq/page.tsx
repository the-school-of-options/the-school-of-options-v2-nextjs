"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Clock, Users, BookOpen, DollarSign, Shield, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FAQPage = () => {
  const router = useRouter();
  const handleNewsletterClick = () => {
    // Navigate to homepage and scroll to newsletter section
    router.push('/#section-newsletter');
  };

  const faqs = [
    {
      question: "Is this suitable for complete beginners?",
      answer: "Yes, absolutely. We start from scratch and guide you personally. Our mentorship program is designed for people with zero options trading experience. We cover all fundamentals before moving to advanced concepts, and you'll have personalized guidance throughout the 6-month journey."
    },
    {
      question: "Do I need technical analysis knowledge?",
      answer: "No, you don't. We focus on options pricing, volatility, and Greeks rather than technical analysis. Our approach is based on market-neutral strategies and probability-based trading, not chart patterns or technical indicators. We'll teach you everything you need to know."
    },
    {
      question: "Do I need capital to start?",
      answer: "No, you don't need trading capital to begin. We start with backtesting using historical data and paper trading with virtual money. This allows you to learn and practice without any financial risk. You only trade with real money once you're confident and have a proven strategy."
    },
    {
      question: "Do you give live trading tips?",
      answer: "No, this is education and mentorship-not a tip service. We don't answer questions like 'Should I buy this now?' or 'Will NIFTY go up?' Instead, we teach you the framework and analysis skills to make these decisions yourself. Our goal is to make you independent, not dependent on tips."
    },
    {
      question: "What happens after I enroll?",
      answer: "Your onboarding call is scheduled within 24 hours of enrollment. You'll get immediate access to recorded course materials, meet a co-instructor for basics review, and we'll design your custom learning journey based on your experience level and goals. The structured program begins after your onboarding."
    },
    {
      question: "When are the mentorship calls?",
      answer: "Live mentorship calls happen every Sunday at 10:00 AM IST. These are group sessions where we discuss trading psychology, review hypothetical scenarios, analyze market conditions, and address questions about the curriculum. All calls are recorded for those who can't attend live."
    },
    {
      question: "What's your refund policy?",
      answer: "Full refund available within 7 days of enrollment OR before the onboarding call-whichever comes first. After the onboarding call is completed, refunds don't apply. For genuine scheduling conflicts, we can defer your participation to a later batch at no extra cost."
    },
    {
      question: "How long does the program take?",
      answer: "The complete program includes 6 months of live mentorship support. You'll have lifetime access to all recorded materials, notes, and resources. Most students need 2-3 months to complete the core curriculum, followed by 3-4 months of practical application and mentorship."
    },
    {
      question: "What makes this different from other courses?",
      answer: "We focus on market-neutral, probability-based strategies rather than directional betting. Our approach emphasizes risk management, discipline, and creating independent traders. You get personalized mentorship, not just recorded videos. We teach the 'why' behind every strategy, not just the 'how'."
    },
    {
      question: "Do I get access to trading tools?",
      answer: "Yes, you get 1-month access to professional algorithmic software for backtesting and paper trading. We also provide orientation on industry-standard tools like Sensibull and Opstra. Our own integrated tools are currently in development (Phase 2)."
    },
    {
      question: "Can I join if I've lost money trading options before?",
      answer: "Yes, many of our most successful students are traders who had previously lost money. In fact, having experience with losses often makes you more receptive to learning proper risk management and discipline. We'll help you identify what went wrong and build a better foundation."
    },
    {
      question: "Is the program conducted in Hindi or English?",
      answer: "Our primary instruction is in English, but we can accommodate Hindi speakers during live calls and one-on-one sessions. All written materials and recordings are in English. We ensure that language is never a barrier to learning."
    }
  ];

  const categories = [
    {
      icon: BookOpen,
      title: "Program Content",
      count: 4
    },
    {
      icon: DollarSign, 
      title: "Pricing & Refunds",
      count: 2
    },
    {
      icon: Clock,
      title: "Schedule & Duration", 
      count: 3
    },
    {
      icon: Users,
      title: "Mentorship Details",
      count: 3
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know about The School of Options mentorship program.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {categories.map((category, index) => (
                <Card key={index} className="shadow-soft text-center">
                  <CardContent className="p-6">
                    <div className="bg-accent/10 p-3 rounded-lg w-fit mx-auto mb-4">
                      <category.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      {category.count} questions
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg">
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 rounded-lg">
                        <div className="flex items-start space-x-3 text-left">
                          <HelpCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="pl-8">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 lg:py-24 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find the answer you're looking for? Get in touch with our team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-soft">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Schedule a Discovery Call</h3>
                  <p className="text-gray-600 mb-6">
                    Book a 15-minute call to discuss your specific situation and see if the program is right for you.
                  </p>
                  <Button variant="cta">
                    Schedule Call (Coming Soon)
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Email Support</h3>
                  <p className="text-gray-600 mb-6">
                    Send us your questions and we'll get back to you within 24 hours.
                  </p>
                  <Button variant="cta-outline"  onClick={() => window.location.href = "mailto:contact@theschoolofoptions.com"}>
                    Email: contact@theschoolofoptions.com
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Important Risk Disclosure</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Trading involves risk. Past results do not guarantee future returns. This program focuses on education 
                      and process-not tips or assured profits. Options trading can result in significant losses, and you should 
                      never trade with money you cannot afford to lose. All trading decisions are your own responsibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 hero-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Ready to Start Your Options Journey?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join our mentorship program and learn to trade options with discipline, logic, and proper risk management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                                  <a 
                    href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {}}
                  >
                    Join Mentorship
                  </a>
              </Button>
              <Button 
                variant="cta-outline" 
                size="xl" 
                className="border-white text-white hover:bg-white hover:text-navy" 
                onClick={handleNewsletterClick}
              >
                Get Free Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;