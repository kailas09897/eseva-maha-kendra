import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Categories
  const govtCat = await prisma.category.upsert({
    where: { slug: "government-services" },
    update: {},
    create: {
      name: "Government Services",
      slug: "government-services",
      description: "Official identity documents, birth, death, caste, income, and domicile certificates.",
      icon: "Shield"
    }
  });

  const businessCat = await prisma.category.upsert({
    where: { slug: "business-registration" },
    update: {},
    create: {
      name: "Business Registration",
      slug: "business-registration",
      description: "GST, MSME Udyam, Shop Act, FSSAI, ISO, and Company incorporation.",
      icon: "Briefcase"
    }
  });

  const taxCat = await prisma.category.upsert({
    where: { slug: "income-tax-gst" },
    update: {},
    create: {
      name: "Income Tax & GST",
      slug: "income-tax-gst",
      description: "ITR Filing, GST Registration, Monthly Returns, and Tax advisory.",
      icon: "FileSpreadsheet"
    }
  });

  const travelCat = await prisma.category.upsert({
    where: { slug: "travel-passport" },
    update: {},
    create: {
      name: "Passport & Travel",
      slug: "travel-passport",
      description: "Passport application, Driving License, IRCTC Train & Bus reservations.",
      icon: "Bus"
    }
  });

  // Services
  await prisma.service.upsert({
    where: { slug: "pan-card" },
    update: {},
    create: {
      categoryId: govtCat.id,
      title: "PAN Card Application & Correction",
      slug: "pan-card",
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
      processingTime: "5 - 7 Days",
      popular: true,
      faqs: {
        create: [
          { question: "How long does physical PAN card delivery take?", answer: "e-PAN is issued in 2-3 days, physical card reaches your address within 7-10 working days." },
          { question: "Can I make changes to my existing PAN?", answer: "Yes, you can update your name, photo, signature, or address using the correction form." }
        ]
      }
    }
  });

  await prisma.service.upsert({
    where: { slug: "aadhaar-services" },
    update: {},
    create: {
      categoryId: govtCat.id,
      title: "Aadhaar Update & Download Assistance",
      slug: "aadhaar-services",
      description: "Assistance with updating mobile number, address, biometric appointment booking, and official e-Aadhaar download.",
      benefits: [
        "Ensure your Aadhaar is linked with active mobile number",
        "Seamless address updates with proof documents",
        "Avoid hassle at enrollment centers"
      ],
      eligibility: [
        "All Resident Indian Citizens"
      ],
      requiredDocs: [
        "Existing Aadhaar Number / Slip",
        "Proof of Address (Electricity bill / Rent agreement)",
        "Mobile Number for OTP"
      ],
      processingTime: "1 - 3 Days",
      popular: true
    }
  });

  await prisma.service.upsert({
    where: { slug: "gst-registration" },
    update: {},
    create: {
      categoryId: taxCat.id,
      title: "GST Registration & Return Filing",
      slug: "gst-registration",
      description: "Complete Goods and Services Tax (GST) registration for businesses and monthly/quarterly return filings.",
      benefits: [
        "Legally recognized business tax identity",
        "Claim Input Tax Credit (ITC)",
        "Expand business to e-commerce and inter-state supply"
      ],
      eligibility: [
        "Proprietorships, Partnerships, Private Limited Companies",
        "Turnover exceeding mandatory state threshold"
      ],
      requiredDocs: [
        "PAN Card of Business / Proprietor",
        "Aadhaar Card",
        "Proof of Business Place (Electricity bill / Rent deed)",
        "Cancelled Cheque / Bank Passbook"
      ],
      processingTime: "3 - 5 Days",
      popular: true
    }
  });

  await prisma.service.upsert({
    where: { slug: "income-certificate" },
    update: {},
    create: {
      categoryId: govtCat.id,
      title: "Income Certificate Application",
      slug: "income-certificate",
      description: "Official government issued income certificate required for scholarships, college admissions, and welfare schemes.",
      benefits: [
        "Avail state scholarship programs",
        "Fee concessions for educational institutions",
        "Eligibility for subsidized government schemes"
      ],
      eligibility: [
        "Resident family members with measurable annual income"
      ],
      requiredDocs: [
        "Aadhaar Card",
        "Ration Card",
        "Salary Slip / Form 16 / Income Declaration",
        "Self Declaration Affidavit"
      ],
      processingTime: "7 - 12 Days",
      popular: true
    }
  });

  // Global FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "How does the document application process work?", answer: "Select your desired service, read the required documents list, fill in your details, upload the files, and click Submit. You will receive a unique Request ID for tracking." },
      { question: "Are there any online payment charges on the website?", answer: "No. We do not accept online payments on the website. Payments are handled offline or manually directly with your assigned service agent." },
      { question: "What happens after I submit my documents?", answer: "You will receive an instant email confirmation with your Request ID. Our processing agent will review the documents and contact you via phone/WhatsApp for verification." },
      { question: "How do I check the status of my application?", answer: "You can track your application status using your Request ID or contact our support helpline directly." }
    ]
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      { name: "Rajesh Kumar", location: "Jalgaon, Maharashtra", rating: 5, review: "Applied for my Income Certificate online. Uploaded documents directly from my mobile, got verified in 2 days!" },
      { name: "Priya Sharma", location: "Pune, Maharashtra", rating: 5, review: "Great service for GST registration! The team reviewed my documents promptly and kept me updated via email." },
      { name: "Suresh Patil", location: "Nashik, Maharashtra", rating: 5, review: "Very smooth process for PAN card application. Simple upload interface and quick response." }
    ]
  });

  // Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: "Important Documents Required for GST Registration in 2026",
        slug: "documents-required-for-gst-registration-2026",
        excerpt: "A complete guide on what documents small business owners need to prepare before applying for GST.",
        content: "Registering for GST is a crucial step for growing businesses in India. Before applying, ensure you have your PAN card, Aadhaar, bank details, and proof of place of business ready..."
      },
      {
        title: "How to Apply for Income & Domicile Certificate Online",
        slug: "apply-income-domicile-certificate-online",
        excerpt: "Step-by-step guide on applying for state certificates with fast document verification.",
        content: "Income and Domicile certificates are mandatory for students applying for admissions and scholarships. Here is how you can easily upload your documents..."
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
