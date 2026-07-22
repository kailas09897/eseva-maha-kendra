"use client";

import { useState } from "react";
import { Building2, CheckCircle2, ShieldCheck, DollarSign, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Franchise Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Franchise Opportunity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Become an E Seva Maha Kendra Franchise Owner
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Start your own digital service center with low investment and high recurring returns. Provide 100+ government and financial services to your local community.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">High Commission Rates</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Earn instant commissions on every AEPS withdrawal, money transfer, bill payment, and government certificate application.
          </p>
        </Card>

        <Card className="border-slate-200 shadow-sm p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Full Operational Training</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Complete technical guidance, software training, marketing materials, and branding support to get your Kendra running smoothly.
          </p>
        </Card>

        <Card className="border-slate-200 shadow-sm p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Dedicated Support Team</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Priority helpdesk assistance for transaction queries, document verification, and technical assistance.
          </p>
        </Card>
      </div>

      {/* Franchise Application Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Kendra Application Form</h2>
          <p className="text-xs text-slate-500">Fill in your details below and our team will contact you within 24 hours.</p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thank you for expressing interest in opening an E Seva Maha Kendra. Our onboarding team will call you shortly.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="text-xs font-semibold mt-2">
              Submit Another Inquiry
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
                <label className="text-xs font-semibold text-slate-700">Role Interested</label>
                <select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="retailer">Retailer / Shop Owner</option>
                  <option value="distributor">Distributor (Block/District)</option>
                  <option value="super_distributor">Super Distributor (State)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">City / District *</label>
                <Input required placeholder="District" className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">State *</label>
                <Input required placeholder="State" className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Pincode *</label>
                <Input required placeholder="Pincode" className="h-10 text-sm" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Message / Current Business Details</label>
              <Textarea placeholder="Tell us about your current shop or experience..." className="min-h-[100px] text-sm" />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg">
              Submit Kendra Application <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </div>

    </div>
  );
}
