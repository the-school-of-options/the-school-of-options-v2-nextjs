import { Award, Users, Building2, GraduationCap, Quote, MapPin, Trophy, Briefcase } from "lucide-react";
import kundanImage from "/public/lovable-uploads/8bebf579-7b93-4a53-9944-1bcefa3cbdfe.png";

export const LightInstructor = () => {
  const stats = [
    { icon: Briefcase, value: "18+", label: "Years Experience" },
    { icon: Users, value: "2L+", label: "Students Trained" },
    { icon: Building2, value: "3", label: "Global Banks" },
    { icon: GraduationCap, value: "BITS", label: "Pilani Alumnus" }
  ];

  const achievements = [
    "Investment Banking Expert",
    "2+ Lakh Students Mentored",
    "BITS Pilani Graduate"
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-2 mb-6">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Your Expert Instructor</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Meet <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Kundan Kishore</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ex-Investment Banking professional with 18+ years at top global institutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile & Stats */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-64 h-64 mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-card/50 backdrop-blur-sm">
                  <img 
                    src={kundanImage.src} 
                    alt="Kundan Kishore - Financial Educator" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  18+ Years
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ${

                    index === 0 ? "bg-gradient-to-r from-blue-500 to-purple-500" :
                    index === 0 ? "bg-gradient-to-r from-orange-500 to-red-500" :
                    index === 2 ? "bg-gradient-to-r from-green-500 to-teal-500" :
                    "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio & Details */}
          <div className="space-y-8">
            {/* Name and Title */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-3 text-black">Kundan Kishore</h3>
              <p className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 font-semibold">
                Financial Educator & Entrepreneur
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Ex-Barclays, Morgan Stanley, RBS | BITS Pilani</span>
              </div>
              
              {/* Achievement Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                {achievements.map((achievement, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border relative">
              <Quote className="w-8 h-8 text-primary/30 absolute top-4 left-4" />
              <div className="pl-8">
                <p className="text-foreground leading-relaxed text-lg font-medium mb-4">
                  "With 18+ years in Investment Banking at top global institutions, I've helped over 
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"> 2 lakh people</span> understand 
                  finance and trading."
                </p>
                <p className="text-muted-foreground">
                  "My mission is to empower every Indian with practical financial knowledge that creates real wealth."
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};