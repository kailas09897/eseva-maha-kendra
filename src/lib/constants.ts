export interface ServiceItem {
  id: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  benefits?: string[];
  eligibility?: string[];
  icon: string;
  processingTime: string;
  requiredDocs: string[];
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "govt",
    name: "Government Services",
    description: "Aadhaar, PAN, Voter ID, Passport, and Official Certificates",
    icon: "Shield"
  },
  {
    id: "financial",
    name: "Banking & Financial",
    description: "AEPS Cash Withdrawal, DMT, Micro ATM, Bank Account Opening",
    icon: "Landmark"
  },
  {
    id: "recharge",
    name: "Recharge & Bill Payment",
    description: "Mobile Recharge, Electricity, Water, Gas, FASTag",
    icon: "Zap"
  },
  {
    id: "business",
    name: "Business & Tax",
    description: "GST Registration, MSME Udyam, ITR Filing, Shop Act",
    icon: "Briefcase"
  },
  {
    id: "travel",
    name: "Travel Booking",
    description: "IRCTC Train Tickets, Bus Reservations, Flight Bookings",
    icon: "Bus"
  },
  {
    id: "insurance",
    name: "Insurance & Loans",
    description: "Crop Insurance, Vehicle Insurance, Health & Personal Loans",
    icon: "HeartHandshake"
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "aadhaar-update",
    title: "Aadhaar Services",
    category: "govt",
    description: "Aadhaar enrollment assistance, address/mobile update, and e-Aadhaar download.",
    icon: "Fingerprint",
    processingTime: "1 - 3 Days",
    requiredDocs: ["Existing Aadhaar", "Proof of Identity/Address", "Mobile Number"],
    popular: true
  },
  {
    id: "pan-card",
    title: "PAN Card Application",
    category: "govt",
    description: "New PAN Card issuance and corrections for individuals and businesses.",
    icon: "CreditCard",
    processingTime: "7 - 10 Days",
    requiredDocs: ["Aadhaar Card", "Passport Photo", "Signature"],
    popular: true
  },
  {
    id: "income-cert",
    title: "Income Certificate",
    category: "govt",
    description: "Official income status certificate for government schemes and scholarships.",
    icon: "FileText",
    processingTime: "7 - 15 Days",
    requiredDocs: ["Aadhaar Card", "Ration Card", "Self Declaration / Salary Slip"],
    popular: true
  },
  {
    id: "caste-cert",
    title: "Caste Certificate",
    category: "govt",
    description: "Official certificate for reservation and state beneficiary benefits.",
    icon: "Award",
    processingTime: "15 - 21 Days",
    requiredDocs: ["Aadhaar Card", "School Leaving Cert", "Father's Caste Proof"]
  },
  {
    id: "domicile-cert",
    title: "Domicile Certificate",
    category: "govt",
    description: "State residence certificate required for admissions and jobs.",
    icon: "Home",
    processingTime: "10 - 15 Days",
    requiredDocs: ["Aadhaar Card", "Ration Card", "Residence Proof (Electricity bill)"]
  },
  {
    id: "aeps-cash",
    title: "AEPS Cash Withdrawal",
    category: "financial",
    description: "Biometric Aadhaar Enabled Payment System for instant cash withdrawals.",
    icon: "DollarSign",
    processingTime: "Instant",
    requiredDocs: ["Aadhaar Number", "Biometric Authentication"],
    popular: true
  },
  {
    id: "dmt-money-transfer",
    title: "Domestic Money Transfer (DMT)",
    category: "financial",
    description: "Send money to any bank account across India 24/7.",
    icon: "Send",
    processingTime: "Instant",
    requiredDocs: ["Sender Mobile Number", "Receiver Bank Details"]
  },
  {
    id: "bbps-electricity",
    title: "Electricity Bill Payment",
    category: "recharge",
    description: "Pay state power distribution bills instantly with receipt generation.",
    icon: "Zap",
    processingTime: "Instant",
    requiredDocs: ["Consumer Number / Bill Account ID"],
    popular: true
  },
  {
    id: "gst-registration",
    title: "GST Registration & Filing",
    category: "business",
    description: "New GSTIN registration and monthly/quarterly return filings.",
    icon: "FileSpreadsheet",
    processingTime: "3 - 7 Days",
    requiredDocs: ["PAN Card", "Aadhaar Card", "Business Address Proof", "Bank Account"]
  },
  {
    id: "msme-udyam",
    title: "MSME Udyam Registration",
    category: "business",
    description: "Government MSME certification for small business loans & subsidies.",
    icon: "Building2",
    processingTime: "1 - 2 Days",
    requiredDocs: ["Aadhaar Card", "PAN Card", "Bank Account Details"]
  },
  {
    id: "irctc-booking",
    title: "IRCTC Train Booking",
    category: "travel",
    description: "Authorized train ticket reservations across all Indian Railways routes.",
    icon: "Train",
    processingTime: "Instant",
    requiredDocs: ["Passenger Name", "Age", "ID Proof", "Travel Details"]
  },
  {
    id: "crop-insurance",
    title: "PM Fasal Bima (Crop Insurance)",
    category: "insurance",
    description: "Government crop insurance enrollment for seasonal agriculture protection.",
    icon: "ShieldAlert",
    processingTime: "2 - 4 Days",
    requiredDocs: ["Aadhaar Card", "7/12 Land Extract", "Bank Passbook"]
  }
];

export const STATS_DATA = [
  { label: "Daily Services Delivered", value: "25,000+" },
  { label: "Active Retailers & Kendras", value: "5,000+" },
  { label: "Districts Covered", value: "36+" },
  { label: "Customer Satisfaction", value: "99.4%" }
];
