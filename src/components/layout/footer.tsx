import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                E SEVA MAHA KENDRA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official digital citizen service portal. Submit document applications online for Aadhaar, PAN, GST, Certificates, Licenses, and Taxation without calling or visiting offices.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Updates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Service Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/services" className="hover:text-white transition-colors">PAN Card Application</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">GST Registration & Filing</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Income & Domicile Certificate</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">MSME Udyam Registration</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">FSSAI & Shop Act License</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Contact Center
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>+91 9595 78 2345</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>support@esevamahakendra.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Chalisgaon, District Jalgaon, Maharashtra - 424101</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} E SEVA MAHA KENDRA. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
