
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">
              WatchTogether
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 WatchTogether. All rights reserved. Built with ❤️ for movie lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
