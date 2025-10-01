'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Sparkles, Users, Gift, Loader } from "lucide-react";
import axios from "axios";
const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export const RegistrationSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Please fill all fields",
        description: "Sab fields fill karna zaroori hai",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/webinar/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });

      // Success message
      toast({
        title: "🎉 Registration Successful!",
        description: "Aapko email pe webinar link mil jayega. See you on Saturday at 8 PM!"
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: ""
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const features = ["FREE 3-Hour Live Masterclass", "Call/Put Options Complete Guide", "Delta & Probability Explained", "10 Interactive Exercises", "Win Exciting Prizes", "Certificate of Participation"];
  return <section id="registration" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-orange px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse text-black shadow-orange">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Limited Seats Available
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            Secure Your <span className="text-gradient-orange">FREE Seat Now!</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Har Saturday ko sirf limited seats hain. Apna spot book karein aur options trading master banein!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features List */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black">
                <Gift className="w-6 h-6 text-primary" />
                What You Get:
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 text-green-500" />
                    <span className="text-foreground">{feature}</span>
                  </li>)}
              </ul>
            </div>

            <div className="bg-gradient-orange p-6 rounded-xl shadow-orange">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-black" />
                <p className="text-black font-bold">
                  Already 500+ Registrations!
                </p>
              </div>
              <p className="text-black/90 text-sm">
                Join hundreds of traders learning the right way
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div id="registration-form" className="bg-card p-8 rounded-2xl shadow-orange border border-border">
            <h3 className="text-2xl font-bold mb-6 text-center text-black">Register for FREE</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-black">
                <Label htmlFor="name">Full Name / Pura Naam</Label>
                <Input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="bg-secondary border-border" />
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="bg-secondary border-border" />
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="bg-secondary border-border" />
              </div>

              <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By registering, you agree to receive webinar updates via email and WhatsApp
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>;
};