"use client";

import Link from "next/link";
import { FolderTree, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/admin" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <FolderTree className="w-8 h-8 text-blue-600" /> Manage Categories
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_CATEGORIES.map(cat => (
          <Card key={cat.id} className="border-slate-200 p-6 space-y-2">
            <h3 className="font-bold text-slate-900 text-lg">{cat.name}</h3>
            <p className="text-xs text-slate-500">{cat.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
