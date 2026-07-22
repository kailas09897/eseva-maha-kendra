"use client";

import { useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, Eye, Download, CheckCircle2, Clock, AlertTriangle, XCircle, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LeadStatus = "NEW" | "UNDER_REVIEW" | "NEED_MORE_INFORMATION" | "APPROVED" | "REJECTED" | "COMPLETED";

const MOCK_LEADS = [
  {
    id: "lead-1",
    requestId: "REQ-2026-8934",
    serviceTitle: "PAN Card Application",
    fullName: "Rajesh Kumar",
    mobile: "+91 9876543210",
    email: "rajesh.kumar@example.com",
    city: "Jalgaon",
    state: "Maharashtra",
    address: "Plot 12, MG Road, Jalgaon - 424001",
    status: "NEW" as LeadStatus,
    createdAt: "2026-07-22",
    documents: [
      { docName: "Aadhaar Card", fileName: "aadhaar_front.pdf", fileUrl: "#" },
      { docName: "Passport Photo", fileName: "photo.jpg", fileUrl: "#" },
      { docName: "Signature", fileName: "signature.png", fileUrl: "#" }
    ]
  },
  {
    id: "lead-2",
    requestId: "REQ-2026-4412",
    serviceTitle: "GST Registration & Return Filing",
    fullName: "Priya Sharma",
    mobile: "+91 9123456789",
    email: "priya.sharma@example.com",
    city: "Pune",
    state: "Maharashtra",
    address: "Kothrud, Pune - 411038",
    status: "UNDER_REVIEW" as LeadStatus,
    createdAt: "2026-07-21",
    documents: [
      { docName: "PAN Card", fileName: "pan_card.pdf", fileUrl: "#" },
      { docName: "Aadhaar", fileName: "aadhaar.pdf", fileUrl: "#" },
      { docName: "Business Address Proof", fileName: "electricity_bill.pdf", fileUrl: "#" },
      { docName: "Bank Cheque", fileName: "cheque.pdf", fileUrl: "#" }
    ]
  }
];

const STATUS_OPTIONS: { label: string; value: LeadStatus; color: string }[] = [
  { label: "New", value: "NEW", color: "bg-blue-100 text-blue-800" },
  { label: "Under Review", value: "UNDER_REVIEW", color: "bg-amber-100 text-amber-800" },
  { label: "Need Info", value: "NEED_MORE_INFORMATION", color: "bg-purple-100 text-purple-800" },
  { label: "Approved", value: "APPROVED", color: "bg-emerald-100 text-emerald-800" },
  { label: "Rejected", value: "REJECTED", color: "bg-rose-100 text-rose-800" },
  { label: "Completed", value: "COMPLETED", color: "bg-green-100 text-green-800" }
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<typeof MOCK_LEADS[0] | null>(null);

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredLeads = leads.filter(l => filterStatus === "ALL" || l.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-8 h-8 text-blue-600" /> Lead Management & File Submissions
          </h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterStatus("ALL")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
            filterStatus === "ALL" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          All Requests ({leads.length})
        </button>
        {STATUS_OPTIONS.map(st => (
          <button
            key={st.value}
            onClick={() => setFilterStatus(st.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === st.value ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Leads Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Leads List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredLeads.map(lead => {
            const statusConfig = STATUS_OPTIONS.find(s => s.value === lead.status);
            return (
              <Card
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`border-slate-200 cursor-pointer transition-all ${
                  selectedLead?.id === lead.id ? "ring-2 ring-blue-600 bg-blue-50/10" : "hover:shadow-xs"
                }`}
              >
                <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-600 text-sm">{lead.requestId}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusConfig?.color}`}>
                        {statusConfig?.label}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{lead.serviceTitle}</h3>
                    <p className="text-xs text-slate-500">
                      Customer: <strong>{lead.fullName}</strong> ({lead.mobile}) • {lead.city}, {lead.state}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {lead.documents.length} Files Attached
                    </span>
                    <Button size="sm" variant="outline" className="text-xs font-semibold">
                      Inspect <Eye className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Lead Document Inspector & Status Updater */}
        <div className="space-y-6">
          {selectedLead ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedLead.requestId}</span>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedLead.serviceTitle}</h2>
              </div>

              {/* Status Updater */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Update Lead Status:</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold focus:ring-2 focus:ring-blue-600"
                >
                  {STATUS_OPTIONS.map(st => (
                    <option key={st.value} value={st.value}>{st.label}</option>
                  ))}
                </select>
              </div>

              {/* Customer Details */}
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p><strong>Name:</strong> {selectedLead.fullName}</p>
                <p><strong>Mobile:</strong> {selectedLead.mobile}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Address:</strong> {selectedLead.address}</p>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Uploaded Document Files ({selectedLead.documents.length})
                </h4>
                <div className="space-y-2">
                  {selectedLead.documents.map((doc, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{doc.docName}</span>
                        <span className="text-[11px] text-slate-400">{doc.fileName}</span>
                      </div>
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:text-blue-700">
                          View <Download className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-400">
              Select a lead request from the list to inspect uploaded documents and update status.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
