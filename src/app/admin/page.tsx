import Link from "next/link";
import { LayoutDashboard, FileSpreadsheet, FolderTree, FileText, HelpCircle, Star, Mail, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  // Fetch real counts from DB if available, fallback gracefully
  let leadsCount = 0;
  let newLeadsCount = 0;

  try {
    leadsCount = await prisma.lead.count();
    newLeadsCount = await prisma.lead.count({ where: { status: "NEW" } });
  } catch (e) {
    // Fallback if DB disconnected during local dev
  }

  const modules = [
    { title: "Manage Leads", desc: "View submitted requests, inspect uploaded files, update status.", count: `${newLeadsCount} New`, href: "/admin/leads", icon: FileSpreadsheet, highlight: true },
    { title: "Manage Services", desc: "Add, edit, or remove services & edit required document lists.", count: "Catalog", href: "/admin/services", icon: FolderTree },
    { title: "Manage Categories", desc: "Organize service categories and descriptions.", count: "Categories", href: "/admin/categories", icon: FolderTree },
    { title: "Manage Blogs", desc: "Publish citizen updates & compliance articles.", count: "Articles", href: "/admin/blogs", icon: FileText },
    { title: "Manage FAQs", desc: "Add or edit common customer questions.", count: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { title: "Manage Testimonials", desc: "Manage customer reviews displayed on home page.", count: "Reviews", href: "/admin/testimonials", icon: Star },
    { title: "Contact Requests", desc: "View support inquiries submitted on contact form.", count: "Messages", href: "/admin/contact-requests", icon: Mail }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" /> Portal CMS & Lead Management
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Control Center
          </h1>
        </div>

        <div className="flex gap-3">
          <Link href="/">
            <Card className="p-3 bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5">
              <span>View Live Website</span>
              <ArrowUpRight className="w-4 h-4" />
            </Card>
          </Link>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link key={idx} href={m.href}>
              <Card className={`h-full border-slate-200 hover:shadow-md transition-all duration-200 group ${m.highlight ? "ring-2 ring-blue-500/30 bg-blue-50/20" : ""}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
                      {m.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
