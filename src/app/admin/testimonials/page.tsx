"use client";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/admin" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Star className="w-8 h-8 text-blue-600" /> Manage Testimonials
        </h1>
      </div>
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
        Testimonials CMS ready.
      </div>
    </div>
  );
}
