"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Clock, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_CATEGORIES, SERVICES_LIST } from "@/lib/constants";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredServices = SERVICES_LIST.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesQuery = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* Search & Filter Controls */}
      <div className="space-y-6">
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by service name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-white border-slate-200 shadow-sm text-base"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Services ({SERVICES_LIST.length})
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {SERVICE_CATEGORIES.find(c => c.id === service.category)?.name}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {service.processingTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Required Documents List */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block">Required Documents:</span>
                  <ul className="space-y-1">
                    {service.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <div className="p-6 pt-0">
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="w-full block">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-10 rounded-lg">
                    Apply / Inquire Service <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Services Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or filter selection.
          </p>
          <Button
            onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
            variant="outline"
            className="text-xs font-semibold"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Services Catalog
        </h1>
        <p className="text-sm text-slate-600">
          Browse and search all official citizen & business services provided at E Seva Maha Kendras.
        </p>
      </div>

      <Suspense fallback={<div className="text-center text-sm text-slate-500">Loading catalog...</div>}>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
