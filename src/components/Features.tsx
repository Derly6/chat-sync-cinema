
import { Card, CardContent } from "@/components/ui/card";
import { Play, Users, MessageCircle, Shield, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Play,
      title: "Perfect Sync",
      description: "Watch videos in perfect synchronization with your friends. Play, pause, and seek together in real-time."
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with your friends while watching. Share reactions, jokes, and discuss plot twists in real-time."
    },
    {
      icon: Users,
      title: "Private Rooms",
      description: "Create private rooms for you and your friends. Invite-only access keeps your watch parties intimate."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with JWT authentication and secure room management. Watch with confidence."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern web technologies for instant synchronization and seamless user experience."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Access from any device with a web browser. No downloads required - just open and watch."
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Why Choose <span className="gradient-text">WatchTogether</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of social watching with our powerful features designed for seamless group entertainment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-white/10 hover:border-purple-500/30 transition-all duration-300 group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
