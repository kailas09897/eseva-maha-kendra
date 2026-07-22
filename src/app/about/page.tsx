import { ShieldCheck, Target, Award, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          About Our Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bridging the Digital Divide with E Seva Maha Kendra
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          E Seva Maha Kendra is a comprehensive digital service network dedicated to offering fast, authorized, and transparent G2C (Government to Citizen) and B2C services directly to citizens through local franchise centers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To empower local micro-entrepreneurs by equipping them with digital tools to deliver crucial government documents, banking, and commercial services to every citizen within a 5km radius.
          </p>
        </Card>

        <Card className="border-slate-200 shadow-sm p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To build India's most trusted, accessible, and technologically advanced assisted service delivery network, ensuring zero hassle for citizens requesting official services.
          </p>
        </Card>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Why Citizens Trust E Seva Maha Kendra</h2>
          <p className="text-sm text-slate-500 mt-1">Built on transparency, speed, and dedicated customer support.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Authorized Operations", desc: "Certified and compliant service delivery aligning with national digital guidelines." },
            { title: "Transparent Pricing", desc: "No hidden charges. Clear receipt generation for every transaction processed." },
            { title: "Assisted Application Support", desc: "Expert Kendra operators assist citizens with document verification and form filling." },
            { title: "High Security & Privacy", desc: "Strict data privacy mechanisms protecting user identity and personal documents." },
            { title: "Wide Service Portfolio", desc: "Over 100+ services including PAN, Aadhaar, AEPS, Banking, Taxes & Travel." },
            { title: "Pan-India Reach", desc: "Thousands of active Kendras across urban and rural locations." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
