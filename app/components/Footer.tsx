import { motion } from 'motion/react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <h3 className="text-xl md:text-2xl text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                FlavorOrbit
              </span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Exploring the molecular dimensions of taste. Powered by flavor science,
              designed for culinary discovery.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-all"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-all"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-all"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/science" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-violet-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-slate-500 text-sm">
            © 2026 FlavorOrbit. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-violet-400 fill-violet-400" />
            <span>for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}