"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [role, setRole] = useState<"retailer" | "customer">("retailer");

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-500">Join E Seva Maha Kendra Portal</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setRole("retailer")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              role === "retailer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Kendra Retailer
          </button>
          <button
            onClick={() => setRole("customer")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              role === "customer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Citizen / Customer
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <Input type="text" placeholder="Enter full name" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Mobile Number</label>
            <Input type="tel" placeholder="10-digit mobile number" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <Input type="email" placeholder="email@example.com" className="h-10 text-sm" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 rounded-lg">
            Proceed to Registration <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
