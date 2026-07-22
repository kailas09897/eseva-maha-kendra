import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    { q: "How do I apply for a service?", a: "Go to Services, select the service you need, read the required document checklist, fill out the form, attach the document files, and click Submit." },
    { q: "Do I need to visit the physical office?", a: "No. You can upload all required document files directly on the service application page." },
    { q: "Is any online payment collected on this website?", a: "No. Payments are handled manually directly with your assigned service agent after document verification." },
    { q: "What happens after I submit my application?", a: "You get an instant Request ID and email confirmation. Our team reviews your uploaded documents and notifies you of the status." },
    { q: "What file formats are accepted for upload?", a: "We accept JPG, PNG, and PDF document files up to 5MB in size." },
    { q: "What are the lead status stages?", a: "Request statuses progress through: New -> Under Review -> Need More Information -> Approved -> Rejected -> Completed." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600">
          Everything you need to know about document uploads, request tracking, and service processing.
        </p>
      </div>

      <Accordion className="w-full bg-white rounded-2xl border border-slate-200 px-6 py-2 shadow-xs">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:text-blue-600">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-600 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
