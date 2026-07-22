"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Upload, FileCheck, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ServiceFormProps {
  serviceId: string;
  serviceTitle: string;
  requiredDocs: string[];
}

export function ServiceApplicationForm({ serviceId, serviceTitle, requiredDocs }: ServiceFormProps) {
  const [submittedResult, setSubmittedResult] = useState<{
    success: boolean;
    requestId?: string;
    message?: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("serviceId", serviceId);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSubmittedResult({
          success: true,
          requestId: resData.requestId
        });
      } else {
        setSubmittedResult({
          success: false,
          message: resData.error || "Failed to submit application. Please try again."
        });
      }
    } catch (err) {
      setSubmittedResult({
        success: false,
        message: "An unexpected error occurred. Please check your connection."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedResult?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Application Submitted
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Request ID: <span className="text-blue-600">{submittedResult.requestId}</span>
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for your request. We have received your documents. Our team will review them and contact you if any additional information is needed.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-emerald-100 text-xs text-slate-500 max-w-md mx-auto space-y-1">
          <p className="font-semibold text-slate-700">What happens next?</p>
          <p>• A confirmation email has been dispatched to your email address.</p>
          <p>• An assigned agent will connect with you if further details are required.</p>
          <p>• No online payment is requested here.</p>
        </div>

        <Button
          onClick={() => setSubmittedResult(null)}
          variant="outline"
          className="text-xs font-semibold mt-2"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Apply for {serviceTitle}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Fill in your details and upload the required document files directly.
        </p>
      </div>

      {submittedResult?.success === false && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submittedResult.message}</span>
        </div>
      )}

      {/* Applicant Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          1. Applicant Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name *</label>
            <Input name="fullName" required placeholder="Enter full name" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
            <Input name="mobile" type="tel" required placeholder="10-digit mobile number" className="h-10 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address *</label>
            <Input name="email" type="email" required placeholder="email@example.com" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">City / District *</label>
            <Input name="city" required placeholder="City or District" className="h-10 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">State *</label>
            <Input name="state" required placeholder="State" className="h-10 text-sm" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Address *</label>
            <Input name="address" required placeholder="Street address & pincode" className="h-10 text-sm" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Message / Additional Instructions (Optional)</label>
          <Textarea name="message" placeholder="Any specific requirements or comments..." className="min-h-[80px] text-sm" />
        </div>
      </div>

      {/* Dynamic Document Upload Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Required Document Uploads *
          </h3>
          <span className="text-[11px] text-slate-400">JPG, PNG, PDF (Max 5MB per file)</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {requiredDocs.map((docName, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">{docName} *</span>
                  <span className="text-[11px] text-slate-400">Attach scanned copy or clear photo</span>
                </div>
              </div>

              <input
                type="file"
                name={`doc_${idx}`}
                required
                accept=".jpg,.jpeg,.png,.pdf"
                className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl text-sm shadow-md shadow-blue-500/10"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting Application & Files...
          </>
        ) : (
          <>
            Submit Service Request & Upload Docs <Upload className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

    </form>
  );
}
