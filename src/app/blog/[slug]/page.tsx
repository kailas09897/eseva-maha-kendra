import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface SinglePostProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleBlogPostPage({ params }: SinglePostProps) {
  const { slug } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div>
        <Link href="/blog" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog List
        </Link>
      </div>

      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Guide & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Important Documents Required for GST Registration in 2026
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Admin Team</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> July 2026</span>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-4 leading-relaxed bg-white p-8 rounded-2xl border border-slate-200">
        <p>
          Registering for Goods and Services Tax (GST) is essential for any business operating in India once turnover exceeds statutory thresholds or when selling inter-state and on e-commerce platforms.
        </p>

        <h3 className="text-base font-bold text-slate-900">1. Individual / Proprietor Documents</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>PAN Card of the applicant</li>
          <li>Aadhaar Card</li>
          <li>Passport size photograph</li>
          <li>Active Mobile number and Email address linked with Aadhaar</li>
        </ul>

        <h3 className="text-base font-bold text-slate-900">2. Business Place Proof</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Electricity Bill / Landline Bill / Water Bill of the premises</li>
          <li>Rent Agreement or Lease Deed (if rented)</li>
          <li>NOC from the property owner</li>
        </ul>

        <h3 className="text-base font-bold text-slate-900">3. Bank Account Proof</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cancelled Cheque leaf with business/proprietor name</li>
          <li>First page of Bank Passbook or recent statement</li>
        </ul>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            You can directly apply for GST Registration by selecting "GST Registration" from our Services page and uploading these document files.
          </p>
        </div>
      </div>
    </div>
  );
}
