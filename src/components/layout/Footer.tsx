import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Github } from 'lucide-react';
import { CodeMorphicxLogo } from '@/src/components/ui/CodeMorphicxLogo';

export function Footer() {
  return (
    <footer className="bg-emerald-900 pt-16 pb-8 text-emerald-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-1 shadow-lg shadow-emerald-950/20 overflow-hidden shrink-0">
                <CodeMorphicxLogo className="h-full w-full" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block">
                  Code <span className="text-emerald-400">Morphicx</span>
                </span>
                <span className="text-[10px] font-medium text-emerald-200/80 block tracking-wider uppercase">
                  Transforming Ideas Into Innovation
                </span>
              </div>
            </div>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-xs">
              EcoSort by Code Morphicx empowers households to make every piece of waste count through AI-driven sorting and community recycling.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">AI Waste Scanner</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Recycling Map</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Educational Hub</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Sustainability Score</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Impact Report</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Partnerships</a></li>
              <li><a href="#" className="text-emerald-100/70 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-emerald-100/70">
                <Mail className="h-5 w-5 text-emerald-400" />
                hello@ecosort.ai
              </li>
              <li className="flex items-center gap-3 text-emerald-100/70">
                <Phone className="h-5 w-5 text-emerald-400" />
                +1 (555) ECO-SORT
              </li>
              <li className="flex items-start gap-3 text-emerald-100/70">
                <MapPin className="h-5 w-5 text-emerald-400 mt-1" />
                123 Green Way, San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-100/40 text-sm">
          <p>© 2026 EcoSort Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>Open Source Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
