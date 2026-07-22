"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  FileText, 
  Zap, 
  Building2, 
  Bus, 
  Award, 
  Clock, 
  Star, 
  HelpCircle, 
  Upload, 
  FileCheck, 
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const POPULAR_SERVICES = [
  {
    id: "pan-card",
    title: "PAN Card Application",
    category: "Government Services",
    slug: "pan-card",
    description: "New PAN Card issuance and correction service with fast e-PAN processing.",
    docs: ["Aadhaar Card", "Passport Photo", "Signature"],
    time: "5 - 7 Days"
  },
  {
    id: "gst-registration",
    title: "GST Registration & Filing",
    category: "Business & Tax",
    slug: "gst-registration",
    description: "Complete Goods and Services Tax (GST) registration for small & medium businesses.",
    docs: ["PAN Card", "Aadhaar", "Business Address Proof", "Bank Cheque"],
    time: "3 - 5 Days"
  },
  {
    id: "income-certificate",
    title: "Income Certificate",
    category: "Certificates",
    slug: "income-certificate",
    description: "Official government income status certificate for scholarships and state schemes.",
    docs: ["Aadhaar Card", "Ration Card", "Income Proof / Salary Slip"],
    time: "7 - 12 Days"
  },
  {
    id: "aadhaar-services",
    title: "Aadhaar Services Assistance",
    category: "Government Services",
    slug: "aadhaar-services",
    description: "Mobile linking assistance, address updates, and official e-Aadhaar download.",
    docs: ["Existing Aadhaar", "Address Proof", "Mobile Number"],
    time: "1 - 3 Days"
  }
];

const CATEGORIES = [
  { name: "Government Services", count: "12 Services", icon: ShieldCheck, slug: "government-services" },
  { name: "Business Registration", count: "8 Services", icon: Building2, slug: "business-registration" },
  { name: "Income Tax & GST", count: "6 Services", icon: FileText, slug: "income-tax-gst" },
  { name: "Passport & Travel", count: "5 Services", icon: Bus, slug: "travel-passport" }
];

const REVIEWS = [
  { name: "Rajesh Kumar", city: "Jalgaon", review: "Uploaded my Aadhaar and Income proof from mobile. Processed smoothly within 3 days without visiting any office!", rating: 5 },
  { name: "Priya Sharma", city: "Pune", review: "Submitting GST documents was so easy. Got my Request ID immediately and email update. Very professional!", rating: 5 },
  { name: "Suresh Patil", city: "Nashik", review: "Clear list of required documents for PAN correction. Uploaded required files directly on the page.", rating: 5 }
];

const FAQS = [
  { q: "How do I apply for a service?", a: "Select your desired service, check the required documents list, fill out the application form on the service page, upload your document files, and submit. You will receive an instant Request ID." },
  { q: "Is there any online payment on the portal?", a: "No online payment is collected on the website. Payments are handled manually directly with your assigned agent." },
  { q: "What happens after submitting my documents?", a: "Our team reviews your uploaded files. If everything is valid, we process your application. You will receive email notifications at every stage." },
  { q: "How do I track my request status?", a: "You can track your request using your unique Request ID via our contact support or directly through email notifications." }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Direct Document Upload & Fast Processing
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Submit Your Service Applications <span className="text-blue-600">Online Direct</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              No need to call or visit offices. Choose your service, upload required document files, and get an instant Request ID with full email updates.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-xl mx-auto pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search service e.g. PAN Card, GST, Income Certificate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 h-14 bg-white shadow-lg shadow-slate-200/50 rounded-2xl border-slate-200 text-base"
                />
                <Link href={`/services?q=${encodeURIComponent(searchQuery)}`}>
                  <Button className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-xl">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-12 px-6 shadow-md shadow-blue-500/10">
                  Explore All Services <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="font-semibold rounded-xl h-12 px-6 border-slate-300">
                  How It Works
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ALL SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Service Categories
          </h2>
          <p className="text-sm text-slate-600">
            Select a category to view required documents and apply online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link key={idx} href={`/services?category=${cat.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-blue-300 group">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 block">{cat.count}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Popular Services
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a service, view required documents, and submit your application online.
            </p>
          </div>
          <Link href="/services">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto">
              View All Services <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_SERVICES.map((service) => (
            <Card key={service.id} className="border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {service.time}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{service.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{service.description}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 block">Required Docs:</span>
                  <ul className="space-y-1">
                    {service.docs.map((d, i) => (
                      <li key={i} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <FileCheck className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <div className="p-6 pt-0">
                <Link href={`/services/${service.slug}`} className="w-full block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-10 rounded-lg">
                    Apply & Upload Docs <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
            <p className="text-sm text-slate-400">Complete application submission from your phone or laptop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select Service", desc: "Browse catalog and select your desired government or business service." },
              { step: "02", title: "Fill Details & Upload Docs", desc: "Enter your contact details and upload required document files (Aadhaar, PAN, etc.)." },
              { step: "03", title: "Get Request ID", desc: "Instantly receive a unique Request ID and confirmation email." },
              { step: "04", title: "Agent Review & Completion", desc: "Our team verifies your documents and processes your service application." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3 relative">
                <div className="text-3xl font-black text-blue-500/40">{item.step}</div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Choose E Seva Maha Kendra
          </h2>
          <p className="text-sm text-slate-600">Built for speed, simplicity, and complete transparency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Direct File Uploads", desc: "No phone calls required. Upload required files directly on the service form." },
            { title: "Instant Request ID", desc: "Receive a tracked Request ID and instant email confirmation upon submission." },
            { title: "No Online Payment Friction", desc: "No payment collected on website. Pay manually directly to assigned agent." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">What Citizens Say</h2>
          <p className="text-sm text-slate-500">Real feedback from users who applied online.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <Card key={idx} className="border-slate-200 shadow-xs p-6 space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{review.review}"</p>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 text-sm block">{review.name}</span>
                <span className="text-[11px] text-slate-400">{review.city}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500">Got questions? Find clear answers below.</p>
        </div>

        <Accordion className="w-full bg-white rounded-2xl border border-slate-200 px-6 py-2 shadow-xs">
          {FAQS.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:text-blue-600">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 8. CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl font-extrabold">Need Help with Your Application?</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              If you have custom requirements or questions about document specifications, send us a query and our team will get in touch.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl h-12 px-8">
              Contact Support <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
