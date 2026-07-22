import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  const posts = [
    {
      title: "Important Documents Required for GST Registration in 2026",
      slug: "documents-required-for-gst-registration-2026",
      excerpt: "A complete guide on what documents small business owners need to prepare before applying for GST.",
      date: "July 2026"
    },
    {
      title: "How to Apply for Income & Domicile Certificate Online",
      slug: "apply-income-domicile-certificate-online",
      excerpt: "Step-by-step guide on applying for state certificates with fast document verification.",
      date: "June 2026"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Blog & Citizen Information
        </h1>
        <p className="text-sm text-slate-600">
          Articles and guides on government documentation, tax registration, and digital updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, idx) => (
          <Card key={idx} className="border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{post.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
