
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Users, MessageCircle, Shield, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-950 via-cinema-900 to-cinema-950">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
