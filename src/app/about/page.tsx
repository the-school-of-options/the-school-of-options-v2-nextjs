import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Heart } from "lucide-react";
import Image from "next/image";
// import founderImage from "/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "No hype. No jackpots. Clear process."
    },
    {
      icon: Target,
      title: "Discipline", 
      description: "Systems over emotions. Probabilities over predictions."
    },
    {
      icon: Heart,
      title: "Responsibility",
      description: "Risk-defined, hedged, backtested."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
              Why The School of Options Exists
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Story */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                In 1997, in Gaya, Bihar, I fell in love with markets. For years, I lost money trying to time them—intraday, 
                F&O, everything. Loans, EMIs, stress. Eventually, I discovered what actually works: market-neutral thinking, 
                options pricing, and risk control.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                In 2019, I launched my first comprehensive course. In 2021, advanced Options and statistical arbitrage 
                programs. In 2023, I began a 6-month mentorship that helps traders stop losing and start thinking like 
                professionals.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The School of Options is the platform version of that mission: transparent, structured, Indian-context 
                learning for Options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Block */}
      <section className="py-16 lg:py-24 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png"
                  alt="Kundan Kishore - Founder"
                  className="rounded-lg shadow-strong w-full max-w-md mx-auto lg:mx-0"
                  width={400}
                  height={400}
                />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
                  Kundan Kishore — From Losses to Legacy
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  I'm not here to give tips. I'm here to teach logic, neutrality, and discipline—so you become independent.
                </p>
                <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                  <blockquote className="text-lg font-medium text-gray-900">
                    "Success in options trading isn't about predicting market direction. It's about understanding 
                    probabilities, managing risk, and staying disciplined when emotions run high."
                  </blockquote>
                  <cite className="text-sm text-gray-600 mt-2 block">— Kundan Kishore</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at The School of Options.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium smooth-transition text-center">
                <CardContent className="p-8">
                  <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-24 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
              Our Mission
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-medium border border-gray-200">
              <p className="text-lg leading-relaxed text-gray-900">
                To create independent, disciplined options traders who understand markets through logic and probabilities, 
                not emotions and guesswork. We believe that with the right education, mindset, and tools, anyone can learn 
                to trade options successfully while managing risk responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900">
              Our Journey
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold flex-shrink-0">
                  1997
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">The Beginning</h3>
                  <p className="text-gray-600">Started journey with markets in Gaya, Bihar. Years of losses and learning.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold flex-shrink-0">
                  2019
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">First Course Launch</h3>
                  <p className="text-gray-600">Launched first comprehensive options trading course.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold flex-shrink-0">
                  2021
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Advanced Programs</h3>
                  <p className="text-gray-600">Introduced advanced Options and statistical arbitrage programs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold flex-shrink-0">
                  2023
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Mentorship Program</h3>
                  <p className="text-gray-600">Started intensive 6-month mentorship program.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold flex-shrink-0">
                  2024
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">The School of Options</h3>
                  <p className="text-gray-600">Platform launch with comprehensive ecosystem for options education.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;