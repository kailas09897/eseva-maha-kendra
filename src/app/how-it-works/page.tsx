import Link from "next/link";
import { CheckCircle2, Upload, FileText, Mail, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Select Your Service",
      desc: "Browse our comprehensive catalog of government certificates, business registrations, PAN, GST, and tax services."
    },
    {
      num: "02",
      title: "Review Required Documents",
      desc: "Each service page lists the exact document checklist (e.g. Aadhaar Card, Photo, Address Proof, Income Proof)."
    },
    {
      num: "03",
      title: "Fill Application & Upload Files",
      desc: "Enter your contact details and upload clear document files directly on the service page form. No phone call or office visit required."
    },
    {
      num: "04",
      title: "Receive Instant Request ID",
      desc: "Upon submission, your request is stored in our database and a unique Request ID (e.g. REQ-2026-8934) is generated."
    },
    {
      num: "05",
      title: "Email Notifications & Verification",
      desc: "You will receive an immediate email confirmation. An assigned agent reviews your files and connects with you for any next steps."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Simple Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How E Seva Maha Kendra Works
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          We have eliminated paper friction. Submit your service applications and upload required documents online from any mobile device or computer.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-md shadow-blue-500/20">
              {s.num}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/services">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-12 px-8">
            Browse Services & Apply Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
