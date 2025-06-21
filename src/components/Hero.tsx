
import { Button } from "@/components/ui/button";
import { Play, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Watch Movies
            <span className="gradient-text block">Together</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create virtual rooms, sync your favorite movies and shows, 
            and chat with friends in real-time. The perfect way to stay connected.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/register">
              <Button size="lg" className="btn-gradient text-white font-semibold px-8 py-6 text-lg group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Watching Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Join Existing Room
              </Button>
            </Link>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="glass-card p-8 floating-animation">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white/70 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
