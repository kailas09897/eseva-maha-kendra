"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderTree, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES_LIST } from "@/lib/constants";

export default function AdminServicesPage() {
  const [services, setServices] = useState(SERVICES_LIST);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDocs, setNewDocs] = useState("Aadhaar Card, PAN Card, Photo");
  const [newTime, setNewTime] = useState("3 - 5 Days");

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newService = {
      id: `service-${Date.now()}`,
      title: newTitle,
      category: "govt",
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      description: newDesc,
      icon: "FileText",
      requiredDocs: newDocs.split(",").map(d => d.trim()),
      processingTime: newTime
    };

    setServices(prev => [newService, ...prev]);
    setShowAddForm(false);
    setNewTitle("");
    setNewDesc("");
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderTree className="w-8 h-8 text-blue-600" /> Manage Services Catalog
          </h1>
        </div>

        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Add New Service
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddService} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 max-w-2xl">
          <h3 className="font-bold text-slate-900 text-lg">Add New Service</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Service Title *</label>
            <Input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Passport Application" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Short service summary..." className="text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Required Documents (Comma Separated) *</label>
              <Input required value={newDocs} onChange={e => setNewDocs(e.target.value)} placeholder="Aadhaar, PAN, Photo..." className="h-10 text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Processing Time</label>
              <Input value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="3 - 5 Days" className="h-10 text-sm" />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-blue-600 text-white font-semibold">Save Service</Button>
            <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <Card key={service.id} className="border-slate-200 shadow-xs flex flex-col justify-between">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {service.processingTime}
                </span>
                <button onClick={() => handleDelete(service.id)} className="text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{service.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <strong>Managed Required Docs:</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">{service.requiredDocs.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
