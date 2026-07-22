import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, FileCheck, CheckCircle2, ShieldCheck, HelpCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceApplicationForm } from "@/components/forms/service-application-form";
import { SERVICES_LIST, SERVICE_CATEGORIES } from "@/lib/constants";

interface ServiceDetailsProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsProps) {
  const { slug } = await params;

  // Find service details from constants
  const service = SERVICES_LIST.find(s => s.slug === slug) || {
    id: "pan-card",
    title: "PAN Card Application & Correction",
    slug: "pan-card",
    category: "govt",
    description: "Apply for a new Permanent Account Number (PAN) or make corrections in name, date of birth, or address.",
    benefits: [
      "Mandatory identity proof for bank accounts & tax filing",
      "Official NSDL / UTIITSL processed card",
      "Digital e-PAN delivered to email within 48 hours",
      "Physical PAN delivered to your address by post"
    ],
    eligibility: [
      "Indian Citizens of any age",
      "Minors (applied through guardian)",
      "Registered Companies, Firms, and Trusts"
    ],
    requiredDocs: [
      "Aadhaar Card",
      "Passport Size Photograph",
      "Signature on white paper",
      "Proof of Address (if different from Aadhaar)"
    ],
    processingTime: "5 - 7 Days"
  };

  const categoryObj = SERVICE_CATEGORIES.find(c => c.id === service.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Button */}
      <div>
        <Link href="/services" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Services
        </Link>
      </div>

      {/* Service Header Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
              {categoryObj?.name || "Government Service"}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {service.title}
            </h1>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Processing Time: <strong>{service.processingTime}</strong></span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {service.description}
        </p>

        {/* Benefits & Eligibility Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card className="border-slate-200 shadow-xs p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Service Benefits
            </h3>
            <ul className="space-y-2">
              {(service.benefits || [
                "Fast online document submission",
                "Official processing",
                "Email notifications & status updates"
              ]).map((b, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-slate-200 shadow-xs p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Eligibility Criteria
            </h3>
            <ul className="space-y-2">
              {(service.eligibility || [
                "Indian Citizens with valid identity documents",
                "Resident individuals and small businesses"
              ]).map((e, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Main Grid: Application Form + Service Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Direct Document Submission Form */}
        <div className="lg:col-span-2">
          <ServiceApplicationForm
            serviceId={service.id}
            serviceTitle={service.title}
            requiredDocs={service.requiredDocs}
          />
        </div>

        {/* Right Column: Required Documents Overview & FAQs */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-400" /> Documents Checklist
            </h3>
            <p className="text-xs text-slate-300">
              Prepare clear scanned copies or photos of the following files before filling out the form:
            </p>
            <ul className="space-y-2.5 text-xs">
              {service.requiredDocs.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" /> Frequently Asked Questions
            </h4>
            <Accordion className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-xs font-semibold text-slate-800">
                  What format should uploaded files be in?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500">
                  We accept JPG, PNG, and PDF files up to 5MB in size. Ensure documents are clearly readable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-xs font-semibold text-slate-800">
                  Do I need to make any payment now?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500">
                  No online payment is collected on this website. Our agent will contact you and handle any fee transactions directly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

      </div>

    </div>
  );
}
