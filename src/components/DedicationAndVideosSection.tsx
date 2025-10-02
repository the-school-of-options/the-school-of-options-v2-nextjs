import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

const DedicationAndVideosSection = () => {
  const nobelLaureates = [
    {
      name: "Fischer Black",
      imageUrl: "/assets/fischer-black.jpg",
      bio: "Co-developer of the Black–Scholes model for pricing options.",
      wikiUrl: "https://en.wikipedia.org/wiki/Fischer_Black"
    },
    {
      name: "Myron Scholes",
      imageUrl: "/assets/myron-scholes-alt.jpg",
      bio: "Awarded the Nobel Prize in Economic Sciences in 1997 for the Black–Scholes model.",
      wikiUrl: "https://en.wikipedia.org/wiki/Myron_Scholes"
    },
    {
      name: "Robert Merton",
      imageUrl: "/assets/robert-merton.jpg",
      bio: "Nobel laureate and co-architect of modern financial engineering.",
      wikiUrl: "https://en.wikipedia.org/wiki/Robert_C._Merton"
    }
  ];

  const youtubeVideos = [
    {
      title: "Options Trading Explained Simply",
      videoUrl: "https://www.youtube.com/watch?v=or9WCwvKgK4",
      thumbnailUrl: "https://img.youtube.com/vi/or9WCwvKgK4/hqdefault.jpg"
    },
    {
      title: "Why 91% Traders Lose in Options",
      videoUrl: "https://www.youtube.com/watch?v=Fxh1C7NnH9Y",
      thumbnailUrl: "https://img.youtube.com/vi/Fxh1C7NnH9Y/hqdefault.jpg"
    },
    {
      title: "The Roadmap to Successful Options Trading",
      videoUrl: "https://www.youtube.com/watch?v=hsSvunQLlps",
      thumbnailUrl: "https://img.youtube.com/vi/hsSvunQLlps/hqdefault.jpg"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Dedication Section */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-wide text-primary uppercase mb-4">
              Dedicated to the Thinkers
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Honoring the Minds Behind Options Pricing
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Options Pricing is one of the greatest financial innovations of the 20th century. Fischer Black, Myron Scholes, and Robert Merton were awarded the Nobel Prize for their work on the Black–Scholes–Merton model. Ironically, while their work earned global recognition, most people today gamble in Options and lose money. At The School of Options, we carry forward their vision: treating Options as science, not speculation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nobelLaureates.map((person, index) => (
              <Card key={index} className="bg-background border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-sm">
                      <Image
                        src={person.imageUrl}
                        alt={`${person.name} portrait`}
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {person.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {person.bio}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs"
                  >
                  <a
                    href={person.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0B5CFF] underline hover:no-underline"
                  >
                    Learn More
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-wide text-primary uppercase mb-4">
              Free Knowledge for Everyone
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Learn with Kundan Kishore on YouTube
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              The School of Options is built on the philosophy of making financial education accessible to all. Explore free resources on my YouTube channel, where I explain Options concepts, risk management, and market logic for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((video, index) => (
              <Card key={index} className="bg-background border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnailUrl}
                    alt={`${video.title} thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={400}
                    height={225}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-foreground leading-tight mb-3">
                    {video.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full text-xs"
                  >
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2"
                    >
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="bg-background border border-border/60 shadow-sm max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                Ready to Take the Next Step?
              </h3>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                The 6-Month Mentorship Program puts all of this into action - teaching, training, and mentoring to make you a disciplined, confident trader.
              </p>
              {/* <Button
                size="lg"
                asChild
                className="bg-[#FF7A00] hover:bg-[#FF8A1E] text-white shadow-[0_10px_24px_rgba(255,122,0,0.22)] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a
                  href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the mentorship program in a new tab"
                  className="inline-flex items-center gap-2"
                >
                  Explore Mentorship Program
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DedicationAndVideosSection;