import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { put } from "@vercel/blob";
import path from "path";
import fs from "fs/promises";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const serviceId = formData.get("serviceId") as string;
    const fullName = formData.get("fullName") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const address = formData.get("address") as string;
    const message = (formData.get("message") as string) || "";

    if (!serviceId || !fullName || !mobile || !email || !city || !state || !address) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields." }, { status: 400 });
    }

    // Retrieve target service from DB by ID or Slug
    let service = await prisma.service.findFirst({
      where: {
        OR: [
          { id: serviceId },
          { slug: serviceId }
        ]
      }
    });

    // Fallback: If database is empty or missing this service, find from static catalog or auto-create
    if (!service) {
      const staticService = (await import("@/lib/constants")).SERVICES_LIST.find(s => s.id === serviceId || s.slug === serviceId);
      
      // Ensure a default category exists
      let category = await prisma.category.findFirst();
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: "General Services",
            slug: "general-services",
            description: "General government and digital services"
          }
        });
      }

      service = await prisma.service.create({
        data: {
          title: staticService?.title || serviceId || "Requested Service",
          slug: staticService?.slug || serviceId.toLowerCase().replace(/\s+/g, "-"),
          description: staticService?.description || "Service request submission",
          requiredDocs: staticService?.requiredDocs || ["Aadhaar Card", "PAN Card", "Photo"],
          processingTime: staticService?.processingTime || "3 - 5 Days",
          categoryId: category.id
        }
      });
    }

    if (!service) {
      return NextResponse.json({ success: false, error: "Selected service not found." }, { status: 404 });
    }

    // Generate Request ID: REQ-YYYY-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestId = `REQ-${new Date().getFullYear()}-${randomSuffix}`;

    // Process file uploads
    const uploadedDocsData: { docName: string; fileUrl: string; fileName: string; fileSize: number }[] = [];

    const requiredDocs = service.requiredDocs || [];
    for (let i = 0; i < requiredDocs.length; i++) {
      const file = formData.get(`doc_${i}`) as File | null;
      if (file && file.size > 0) {
        let fileUrl = "";

        // Store in Vercel Blob if available, fallback to local uploads directory
        if (process.env.BLOB_READ_WRITE_TOKEN) {
          const blob = await put(`leads/${requestId}/${file.name}`, file, { access: "public" });
          fileUrl = blob.url;
        } else {
          // Local fallback
          const uploadsDir = path.join(process.cwd(), "public", "uploads", requestId);
          await fs.mkdir(uploadsDir, { recursive: true });
          const filePath = path.join(uploadsDir, file.name);
          const bytes = await file.arrayBuffer();
          await fs.writeFile(filePath, Buffer.from(bytes));
          fileUrl = `/uploads/${requestId}/${file.name}`;
        }

        uploadedDocsData.push({
          docName: requiredDocs[i],
          fileUrl,
          fileName: file.name,
          fileSize: file.size
        });
      }
    }

    // Save Lead & LeadDocuments in DB
    const lead = await prisma.lead.create({
      data: {
        requestId,
        serviceId: service.id,
        fullName,
        mobile,
        email,
        city,
        state,
        address,
        message,
        status: "NEW",
        documents: {
          create: uploadedDocsData
        }
      }
    });

    // Send Confirmation Email to Customer & Admin Alert via Resend (if configured)
    if (resend) {
      // Customer Email
      await resend.emails.send({
        from: "E Seva Maha Kendra <notifications@esevamahakendra.in>",
        to: [email],
        subject: `Application Confirmation - Request ID ${requestId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #2563eb;">Application Received Successfully</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for submitting your request for <strong>${service.title}</strong>.</p>
            <p>Your unique Request ID is: <strong>${requestId}</strong></p>
            <p>We have received your uploaded documents. Our team will review them and contact you if any additional information is needed.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">E Seva Maha Kendra - Citizen Services Portal</p>
          </div>
        `
      }).catch(err => console.error("Customer email error:", err));

      // Admin Email Alert
      await resend.emails.send({
        from: "E Seva Maha Kendra Portal <notifications@esevamahakendra.in>",
        to: ["admin@esevamahakendra.in"],
        subject: `New Lead Submitted: ${requestId} - ${service.title}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #2563eb;">New Service Lead Received</h2>
            <p><strong>Request ID:</strong> ${requestId}</p>
            <p><strong>Service:</strong> ${service.title}</p>
            <p><strong>Customer Name:</strong> ${fullName}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>City/State:</strong> ${city}, ${state}</p>
            <p><strong>Documents Uploaded:</strong> ${uploadedDocsData.length} files</p>
          </div>
        `
      }).catch(err => console.error("Admin email error:", err));
    }

    return NextResponse.json({
      success: true,
      requestId,
      leadId: lead.id
    });

  } catch (error: any) {
    console.error("API /api/apply Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}
