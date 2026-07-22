"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<"otp" | "password">("otp");

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Login to Portal</h1>
          <p className="text-xs text-slate-500">E Seva Maha Kendra Partner & Citizen Portal</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setAuthMethod("otp")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              authMethod === "otp" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            OTP Login
          </button>
          <button
            onClick={() => setAuthMethod("password")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              authMethod === "password" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Password
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {authMethod === "otp" ? (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Registered Mobile Number</label>
              <Input type="tel" placeholder="Enter 10-digit mobile number" className="h-10 text-sm" />
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email or User ID</label>
                <Input type="text" placeholder="Enter User ID or Email" className="h-10 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Input type="password" placeholder="••••••••" className="h-10 text-sm" />
              </div>
            </>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 rounded-lg">
            {authMethod === "otp" ? "Send OTP" : "Sign In"} <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
