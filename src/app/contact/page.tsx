"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") || "";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">
          {requestedService ? `Inquire about ${requestedService}` : "Send Us a Message"}
        </h2>
        <p className="text-xs text-slate-500">Fill in your information and we will assist you immediately.</p>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thank you for contacting E Seva Maha Kendra. Our support executive will reach out to you shortly.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="text-xs font-semibold mt-2">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Full Name *</label>
              <Input required placeholder="Enter full name" className="h-10 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
              <Input required type="tel" placeholder="10-digit mobile number" className="h-10 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <Input type="email" placeholder="email@example.com" className="h-10 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Service Required</label>
              <Input defaultValue={requestedService} placeholder="e.g. PAN Card, AEPS, Income Cert..." className="h-10 text-sm" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Message / Query *</label>
            <Textarea required placeholder="Describe your query or requirement in detail..." className="min-h-[120px] text-sm" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg">
            Submit Message <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact & Helpdesk Center
        </h1>
        <p className="text-sm text-slate-600">
          Have a question about a service or need assistance? Reach out to our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Call Us</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <a href="tel:8779883578" className="text-sm font-semibold text-blue-600 hover:underline block mt-1">
                +91 8779 883 578
              </a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">Quick response within 24 hours</p>
              <a href="mailto:support@esevamahakendra.in" className="text-sm font-semibold text-blue-600 hover:underline block mt-1">
                support@esevamahakendra.in
              </a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Head Office</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sec 1, Vashi, Navi Mumbai, Maharashtra, India 400703
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form with Suspense */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="text-center text-sm text-slate-500 p-8">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
